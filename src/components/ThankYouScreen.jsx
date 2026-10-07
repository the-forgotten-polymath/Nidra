import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, RefreshCw, AlertCircle, Moon, Sparkles } from 'lucide-react';
import { submitSleepAssessment } from '../supabaseClient';

const SLEEP_HYGIENE_RULES = [
  "Keep a consistent sleep schedule. Get up at the same time every day, even on weekends or during vacations.",
  "Set a bedtime that is early enough for you to get at least 7-8 hours of sleep.",
  "Don't go to bed unless you feel sleepy.",
  "If you don't fall asleep after 20 minutes, get out of bed.",
  "Establish a relaxing bedtime routine.",
  "Make your bedroom quiet and relaxing. Keep the room at a comfortable, cool temperature.",
  "Limit exposure to bright light in the evening.",
  "Turn off electronic devices at least 60 minutes before bedtime.",
  "Don't take heavy meal before bedtime. If you feel hungry at night, eat light healthy snack.",
  "Exercise regularly and maintain a healthy diet.",
  "Avoid consuming caffeine in the late afternoon or evening.",
  "Avoid consuming alcohol before bedtime.",
  "Reduce fluid intake before bedtime."
];

export default function ThankYouScreen({ store, onNewAssessment }) {
  const [syncStatus, setSyncStatus] = useState('syncing'); // 'syncing' | 'success' | 'error'
  const [recordId, setRecordId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fire confetti celebration
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
    <div className="screen-scroll-container" style={{ paddingTop: 24, paddingBottom: 40 }}>
      {/* Celebration Icon Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div
          style={{
            width: 68,
            height: 68,
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
          <CheckCircle2 size={38} strokeWidth={2.5} />
        </div>
      </div>

      {/* Thank You Message */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'var(--color-text-dark)', marginBottom: 6 }}>
          Thank You!
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          Your assessment has been submitted successfully to your physician for review.
        </p>
      </div>

      {/* Supabase Cloud Sync Card */}
      <div
        style={{
          padding: 14,
          borderRadius: 16,
          background: syncStatus === 'success' ? '#ECFDF5' : syncStatus === 'error' ? '#FEF2F2' : '#EFF6FF',
          border: `1.5px solid ${syncStatus === 'success' ? '#059669' : syncStatus === 'error' ? '#DC2626' : '#2563EB'}`,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10
        }}
      >
        <div style={{ marginTop: 2 }}>
          {syncStatus === 'syncing' && <RefreshCw size={18} className="spin-animation" color="#2563EB" />}
          {syncStatus === 'success' && <ShieldCheck size={20} color="#059669" />}
          {syncStatus === 'error' && <AlertCircle size={20} color="#DC2626" />}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-dark)' }}>
            {syncStatus === 'syncing' && 'Transmitting intake data to Doctor Dashboard...'}
            {syncStatus === 'success' && 'Assessment Recorded for Doctor Review'}
            {syncStatus === 'error' && 'Cloud Sync Notice'}
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-muted)', marginTop: 2 }}>
            {syncStatus === 'syncing' && 'Connecting to clinical database endpoint...'}
            {syncStatus === 'success' && recordId && `Reference ID: ${recordId}`}
            {syncStatus === 'success' && !recordId && 'Your responses were recorded safely.'}
            {syncStatus === 'error' && (errorMessage || 'Saved locally for review.')}
          </div>
        </div>
      </div>

      {/* Sleep Hygiene Instructions Section */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid var(--color-outline)',
          borderRadius: 20,
          padding: 20,
          boxShadow: 'var(--shadow-md)',
          marginBottom: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F1F0F7', paddingBottom: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: '#F3E8FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7E3AF2'
            }}
          >
            <Moon size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-text-dark)', margin: 0 }}>
              Sleep Hygiene Instructions
            </h2>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Follow these evidence-based guidelines for better sleep
            </div>
          </div>
        </div>

        {/* List of 13 Sleep Hygiene Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SLEEP_HYGIENE_RULES.map((rule, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 12,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <span
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#043CA0',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {idx + 1}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#021744', lineHeight: 1.45 }}>
                {rule}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Assessment */}
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
