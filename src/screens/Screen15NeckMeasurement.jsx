import React, { useState } from 'react';
import { HelpCircle, X, Check } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen15NeckMeasurement({ store, updateField, isDeveloperMode }) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 15 — Neck measurement"
        title="Measure your neck"
        caption="You'll need a soft measuring tape."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Anatomical Illustration SVG Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 18,
            border: '1.5px solid var(--color-outline)',
            padding: 20,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12
          }}
        >
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
            {/* Head & Neck Silhouette */}
            <circle cx="60" cy="30" r="22" fill="#E2DFEF" stroke="#1E1B4B" strokeWidth="2" />
            <path d="M50 50 L50 80 Q50 90 20 98 L100 98 Q70 90 70 80 L70 50 Z" fill="#E2DFEF" stroke="#1E1B4B" strokeWidth="2" />
            {/* Measuring Tape Around Neck */}
            <ellipse cx="60" cy="65" rx="16" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="74" cy="65" r="3" fill="#DC2626" />
          </svg>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-dark)' }}>
            Wrap the tape around the middle of your neck.
          </p>
        </div>

        {/* Stepper Field */}
        <NumericStepperField
          title="Neck circumference"
          value={store.neckCircumferenceCm}
          onChange={(val) => updateField('neckCircumferenceCm', val)}
          unit="cm"
          min={0}
          max={70}
          step={1}
          defaultValueIfZero={36}
          quickPicks={[35, 38, 40, 42]}
        />

        {/* See How to Measure Button */}
        <button
          type="button"
          className="choice-btn"
          style={{ background: '#FFFFFF', width: 'fit-content', padding: '0 18px', height: 44 }}
          onClick={() => setShowGuide(true)}
        >
          <HelpCircle size={16} color="var(--color-card1-base)" />
          <span style={{ fontSize: 13 }}>See how to measure</span>
        </button>

        {/* Guide Modal Sheet */}
        {showGuide && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
            onClick={() => setShowGuide(false)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 440,
                background: '#FFFFFF',
                borderRadius: '24px 24px 0 0',
                padding: '24px 20px 40px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800 }}>
                  How to measure your neck
                </h3>
                <button
                  type="button"
                  onClick={() => setShowGuide(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{ fontSize: 14, color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Stand relaxed and look straight ahead.</li>
                  <li>Wrap the flexible tape around the neck at the level just below the thyroid cartilage (Adam's apple).</li>
                  <li>Keep the tape flat against the skin without compressing soft tissue.</li>
                  <li>Take the reading to the nearest half-centimeter.</li>
                </ol>
              </div>

              <button
                type="button"
                className="primary-continue-btn"
                style={{ marginTop: 8 }}
                onClick={() => setShowGuide(false)}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
