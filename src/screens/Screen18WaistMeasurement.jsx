import React, { useState } from 'react';
import { HelpCircle, Wind, X } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen18WaistMeasurement({ store, updateField, isDeveloperMode }) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 18 — Waist"
        title="Measure your waist"
        caption="Place the tape around your waist at belly-button level."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Anatomical Video Player Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1.5px solid var(--color-outline)',
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            overflow: 'hidden'
          }}
        >
          <video
            src="/waist.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              borderRadius: 16,
              objectFit: 'cover',
              aspectRatio: '16/9'
            }}
          />
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-muted)', textAlign: 'center', paddingBottom: 2 }}>
            Belly-button level during normal expiration (SONA protocol)
          </p>
        </div>

        {/* Clinical protocol note */}
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 12,
            background: '#F3F1F9',
            border: '1.2px solid var(--color-outline)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%'
          }}
        >
          <Wind size={18} color="var(--color-card1-base)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-dark)', textAlign: 'left' }}>
            Breathe out normally before taking the measurement.
          </span>
        </div>

        {/* Stepper Field */}
        <NumericStepperField
          title="Waist circumference"
          value={store.waistCircumferenceCm}
          onChange={(val) => updateField('waistCircumferenceCm', val)}
          unit="cm"
          min={0}
          max={160}
          step={1}
          defaultValueIfZero={80}
          quickPicks={[75, 80, 85, 90, 95]}
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
                  How to measure your waist
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
                  <li>Stand upright with feet shoulder-width apart.</li>
                  <li>Find the midpoint between the bottom of your lowest rib and the top of your hips (usually at the navel).</li>
                  <li>Wrap the tape snugly around your waist without pressing into the skin.</li>
                  <li>Breathe out normally and take the measurement.</li>
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
