import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, CloudCheck, RefreshCw, AlertCircle, ShieldCheck, Heart, Moon, User } from 'lucide-react';
import { submitSleepAssessment } from '../supabaseClient';

export default function ThankYouScreen({ store, calculatedBMI, bmiCategoryInfo, onNewAssessment }) {
  const [syncStatus, setSyncStatus] = useState('syncing'); // 'syncing' | 'success' | 'error'
  const [recordId, setRecordId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fire confetti effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Submit payload to Supabase
    async function syncToCloud() {
      setSyncStatus('syncing');
      const { data, error } = await submitSleepAssessment(store);
      if (error) {
        setSyncStatus('error');
        setErrorMessage(error.message || 'Failed to submit data');
      } else {
        setSyncStatus('success');
        if (data && data[0]) {
          setRecordId(data[0].id);
        }
      }
    }

    syncToCloud();
  }, [store]);

  return (
    <div className="screen-scroll-container" style={{ paddingTop: 32, paddingBottom: 40 }}>
      {/* Celebration Icon */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#ECFDF5',
            border: '2px solid #059669',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#059669',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.18)'
          }}
        >
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 900, color: 'var(--color-text-dark)', marginBottom: 8 }}>
          Assessment Complete!
        </h1>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          Thank you, <strong style={{ color: 'var(--color-text-dark)' }}>{store.name || 'Patient'}</strong>. Your sleep intake data has been gathered for your clinical evaluation.
        </p>
      </div>

      {/* Supabase Cloud Sync Card */}
      <div
        style={{
          padding: 16,
          borderRadius: 18,
          background: syncStatus === 'success' ? '#ECFDF5' : syncStatus === 'error' ? '#FEF2F2' : '#EFF6FF',
          border: `1.5px solid ${syncStatus === 'success' ? '#059669' : syncStatus === 'error' ? '#DC2626' : '#2563EB'}`,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12
        }}
      >
        <div style={{ marginTop: 2 }}>
          {syncStatus === 'syncing' && <RefreshCw size={20} className="spin-animation" color="#2563EB" />}
          {syncStatus === 'success' && <ShieldCheck size={22} color="#059669" />}
          {syncStatus === 'error' && <AlertCircle size={22} color="#DC2626" />}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text-dark)' }}>
            {syncStatus === 'syncing' && 'Saving Assessment to Supabase Cloud...'}
            {syncStatus === 'success' && 'Securely Synced with Supabase Database'}
            {syncStatus === 'error' && 'Cloud Sync Notice'}
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-muted)', marginTop: 2 }}>
            {syncStatus === 'syncing' && 'Connecting to clinical database endpoint...'}
            {syncStatus === 'success' && recordId && `Assessment ID: ${recordId}`}
            {syncStatus === 'success' && !recordId && 'Your responses were recorded.'}
            {syncStatus === 'error' && (errorMessage || 'Local record retained.')}
          </div>
        </div>
      </div>

      {/* Summary Highlights Card */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--color-outline)',
          borderRadius: 20,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: 'var(--shadow-md)',
          marginBottom: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F0F7', paddingBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--color-text-dark)' }}>
            Intake Summary
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#7E3AF2', background: '#F3E8FF', padding: '4px 10px', borderRadius: 20 }}>
            {store.sex || 'Patient'} • {store.age ? `${store.age} yrs` : 'Age --'}
          </span>
        </div>

        {/* Contact info row */}
        {(store.mobileNumber || store.email) && (
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-dark)' }}>
            {store.mobileNumber && <div>📱 Phone: +91 {store.mobileNumber}</div>}
            {store.email && <div style={{ marginTop: 2 }}>✉️ Email: {store.email}</div>}
            {store.centreCode && <div style={{ marginTop: 2 }}>🏥 Clinic Code: {store.centreCode}</div>}
          </div>
        )}

        {/* BMI info */}
        {calculatedBMI > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: bmiCategoryInfo.bgColor, padding: '10px 14px', borderRadius: 14, border: `1.2px solid ${bmiCategoryInfo.accentColor}` }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: bmiCategoryInfo.textColor }}>
              BMI: {calculatedBMI} kg/m²
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: bmiCategoryInfo.textColor }}>
              {bmiCategoryInfo.name}
            </span>
          </div>
        )}

        {/* Sleep Highlights */}
        <div style={{ fontSize: 13, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
          {store.selectedSleepProblems.length > 0 && (
            <div>
              <strong style={{ color: 'var(--color-text-dark)' }}>Reported Sleep Complaints:</strong>
              <ul style={{ paddingLeft: 18, marginTop: 4 }}>
                {store.selectedSleepProblems.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Primary Action: New Assessment */}
      <button
        type="button"
        className="primary-continue-btn"
        onClick={onNewAssessment}
      >
        <RefreshCw size={18} />
        <span>Start New Assessment</span>
      </button>
    </div>
  );
}
