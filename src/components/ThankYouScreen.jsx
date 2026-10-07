import React, { useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, RefreshCw, AlertCircle, Moon, Stethoscope, AlertTriangle, Activity, Heart, Car } from 'lucide-react';
import { submitSleepAssessment } from '../supabaseClient';
import { evaluateTestPathAndSafety } from '../utils/clinicalRules';

const SLEEP_HYGIENE_RULES = [
  "Keep a consistent sleep schedule. Get up at the same time every day, even on weekends or during vacations.",
  "Set a bedtime that is early enough for you to get at least 7-8 hours of sleep.",
  "Establish a relaxing bedtime routine and limit electronic devices 60 minutes before bed.",
  "Make your bedroom quiet, dark, and comfortably cool.",
  "Avoid consuming caffeine or heavy meals in the late afternoon or evening."
];

export default function ThankYouScreen({ store, onNewAssessment }) {
  const [syncStatus, setSyncStatus] = useState('syncing'); // 'syncing' | 'success' | 'error'
  const [recordId, setRecordId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Evaluate clinical findings & rules using store data
  const evaluation = useMemo(() => {
    return evaluateTestPathAndSafety(store || {});
  }, [store]);

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
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
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

      {/* Thank You Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900, color: 'var(--color-text-dark)', marginBottom: 4 }}>
          Assessment Submitted!
        </h1>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
          Your intake answers have been evaluated and transmitted to your physician.
        </p>
      </div>

      {/* Supabase Cloud Sync Card */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 14,
          background: syncStatus === 'success' ? '#ECFDF5' : syncStatus === 'error' ? '#FEF2F2' : '#EFF6FF',
          border: `1.5px solid ${syncStatus === 'success' ? '#059669' : syncStatus === 'error' ? '#DC2626' : '#2563EB'}`,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <div style={{ marginTop: 2 }}>
          {syncStatus === 'syncing' && <RefreshCw size={18} className="spin-animation" color="#2563EB" />}
          {syncStatus === 'success' && <ShieldCheck size={20} color="#059669" />}
          {syncStatus === 'error' && <AlertCircle size={20} color="#DC2626" />}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--color-text-dark)' }}>
            {syncStatus === 'syncing' && 'Transmitting intake data to Doctor Dashboard...'}
            {syncStatus === 'success' && 'Recorded in Doctor Dashboard'}
            {syncStatus === 'error' && 'Cloud Sync Notice'}
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', marginTop: 2 }}>
            {syncStatus === 'syncing' && 'Connecting to clinical database endpoint...'}
            {syncStatus === 'success' && recordId && `Ref ID: ${recordId}`}
            {syncStatus === 'success' && !recordId && 'Your clinical responses were saved safely.'}
            {syncStatus === 'error' && (errorMessage || 'Saved locally for review.')}
          </div>
        </div>
      </div>

      {/* PERSONALIZED CLINICAL FINDINGS CARD */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #1E1B4B',
          borderRadius: 20,
          padding: 20,
          boxShadow: 'var(--shadow-md)',
          marginBottom: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F0F7', paddingBottom: 12, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#043CA0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <Stethoscope size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 900, color: '#1E1B4B', margin: 0 }}>
                Your Diagnostic Summary
              </h2>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>
                Evaluated from your intake answers
              </div>
            </div>
          </div>
        </div>

        {/* Safety / Driving Alert Banner if present */}
        {evaluation.safetyAlert && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FCA5A5', borderRadius: 12, padding: 12, marginBottom: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <AlertTriangle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#991B1B' }}>CLINICAL ALERT</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#991B1B', marginTop: 2, lineHeight: 1.4 }}>
                {evaluation.safetyMessage}
              </div>
            </div>
          </div>
        )}

        {/* Recommended Clinical Path Pill */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Recommended Clinical Path
          </div>
          <div style={{ display: 'inline-block', background: '#CCFBF1', color: '#0F766E', padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 900, marginTop: 6 }}>
            {evaluation.testPath}
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#1E1B4B', marginTop: 8, lineHeight: 1.45 }}>
            {evaluation.clinicalSummary}
          </div>
        </div>

        {/* Key Indicators 3-Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {/* OSA */}
          <div style={{ background: evaluation.osaEval.isPositive ? '#FFFBEB' : '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>OSA Risk</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: evaluation.osaEval.isPositive ? '#B45309' : '#059669', marginTop: 4 }}>
              {evaluation.osaEval.scoreRatio !== '—' ? evaluation.osaEval.category : 'Unlikely'}
            </div>
            {evaluation.osaEval.scoreRatio !== '—' && (
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', marginTop: 2 }}>({evaluation.osaEval.scoreRatio})</div>
            )}
          </div>

          {/* RLS */}
          <div style={{ background: evaluation.rlsEval.isPositive ? '#FFFBEB' : '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>Restless Legs</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: evaluation.rlsEval.isPositive ? '#B45309' : '#059669', marginTop: 4 }}>
              {evaluation.rlsEval.isPositive ? 'Possible' : 'None'}
            </div>
          </div>

          {/* Insomnia */}
          <div style={{ background: evaluation.insomniaEval.isPositive ? '#FFFBEB' : '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 10, textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B' }}>Insomnia</div>
            <div style={{ fontSize: 12, fontWeight: 900, color: evaluation.insomniaEval.isPositive ? '#B45309' : '#059669', marginTop: 4 }}>
              {evaluation.insomniaEval.isPositive ? 'Possible' : 'Low'}
            </div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid #F1F0F7', paddingBottom: 12, marginBottom: 14 }}>
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
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-text-dark)', margin: 0 }}>
              General Sleep Hygiene Tips
            </h2>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Evidence-based guidelines while awaiting physician review
            </div>
          </div>
        </div>

        {/* List of Key Sleep Hygiene Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SLEEP_HYGIENE_RULES.map((rule, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 10,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <span
                style={{
                  minWidth: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#043CA0',
                  color: '#FFFFFF',
                  fontSize: 10,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {idx + 1}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#021744', lineHeight: 1.4 }}>
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
