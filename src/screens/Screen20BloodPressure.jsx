import React from 'react';
import { Heart, Activity, AlertTriangle } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen20BloodPressure({
  store,
  updateField,
  validations,
  isDeveloperMode,
  onContinue
}) {
  const isInvalidTopBelowBottom =
    store.bpSystolic &&
    store.bpDiastolic &&
    Number(store.bpSystolic) <= Number(store.bpDiastolic);

  const handleSkip = () => {
    updateField('skippedBloodPressure', true);
    updateField('bpSystolic', '');
    updateField('bpDiastolic', '');
    onContinue();
  };

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 20 — Blood pressure"
        title="Blood pressure (optional)"
        caption="Enter your recent reading, or have your doctor / nurse record it during your visit."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* BP Machine Illustration */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFFFFF',
            borderRadius: 18,
            border: '1.5px solid var(--color-outline)',
            padding: 16
          }}
        >
          <img
            src="/BP-machine.png"
            alt="Blood Pressure Machine"
            style={{
              maxHeight: 180,
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* 2-Block Card Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Block 1: Systolic / Top Number */}
          <div
            style={{
              padding: 14,
              borderRadius: 18,
              border: '1.5px solid var(--color-outline)',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DC2626'
                }}
              >
                <Heart size={16} fill="#DC2626" />
              </div>
              <span style={{ fontSize: 10, fontWeight: 900, color: '#DC2626', background: '#FEE2E2', padding: '2px 8px', borderRadius: 10 }}>
                TOP
              </span>
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Systolic</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Top number</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <input
                type="number"
                pattern="[0-9]*"
                className="text-input-field"
                style={{
                  height: 48,
                  fontSize: 22,
                  fontWeight: 800,
                  padding: '0 8px',
                  borderColor: !validations.isSystolicValid && store.bpSystolic ? '#DC2626' : undefined
                }}
                placeholder="120"
                value={store.bpSystolic}
                onChange={(e) => {
                  updateField('skippedBloodPressure', false);
                  updateField('bpSystolic', e.target.value);
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)' }}>mmHg</span>
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Range: 90–200
            </div>
          </div>

          {/* Block 2: Diastolic / Bottom Number */}
          <div
            style={{
              padding: 14,
              borderRadius: 18,
              border: '1.5px solid var(--color-outline)',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB'
                }}
              >
                <Activity size={16} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 900, color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: 10 }}>
                BOTTOM
              </span>
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Diastolic</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Bottom number</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <input
                type="number"
                pattern="[0-9]*"
                className="text-input-field"
                style={{
                  height: 48,
                  fontSize: 22,
                  fontWeight: 800,
                  padding: '0 8px',
                  borderColor: !validations.isDiastolicValid && store.bpDiastolic ? '#DC2626' : undefined
                }}
                placeholder="80"
                value={store.bpDiastolic}
                onChange={(e) => {
                  updateField('skippedBloodPressure', false);
                  updateField('bpDiastolic', e.target.value);
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-muted)' }}>mmHg</span>
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Range: 60–150
            </div>
          </div>
        </div>

        {/* Cross validation warning */}
        {isInvalidTopBelowBottom && (
          <div
            style={{
              padding: 12,
              borderRadius: 12,
              background: '#FEF3C7',
              border: '1px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: '#92400E'
            }}
          >
            <AlertTriangle size={18} color="#D97706" />
            <span>Top number must be greater than bottom number</span>
          </div>
        )}

        {/* Skip button */}
        <button
          type="button"
          className="choice-btn"
          style={{ width: '100%', height: 52 }}
          onClick={handleSkip}
        >
          <span>I don't have a recent reading</span>
        </button>
      </div>
    </div>
  );
}
