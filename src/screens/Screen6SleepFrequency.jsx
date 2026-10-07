import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen6SleepFrequency({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 6 — Sleep frequency"
        title="Sleep frequency"
        caption="Tell us how often you experience sleep difficulties."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="input-label" style={{ fontSize: 16 }}>
          How many nights a week do you have sleep problems?
        </div>

        {/* 1 to 7 Nights Horizontal Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => {
            const isSelected = store.sleepComplaintNightsPerWeek === num;
            return (
              <button
                key={num}
                type="button"
                className={`week-night-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => updateField('sleepComplaintNightsPerWeek', num)}
                style={{
                  height: 60,
                  borderRadius: 16,
                  border: isSelected ? '2px solid var(--color-outline)' : '1.5px solid rgba(199, 190, 219, 0.45)',
                  backgroundColor: isSelected ? 'var(--color-outline)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-dark)',
                  fontWeight: 800,
                  fontSize: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(88, 86, 214, 0.25)' : 'none'
                }}
              >
                <span>{num}</span>
                <span style={{ fontSize: 10, fontWeight: 600, opacity: isSelected ? 0.9 : 0.6 }}>
                  {num === 1 ? 'night' : 'nights'}
                </span>
              </button>
            );
          })}
        </div>

        {store.sleepComplaintNightsPerWeek > 3 && (
          <div
            style={{
              padding: 14,
              backgroundColor: '#FEF3C7',
              borderRadius: 14,
              border: '1px solid #FDE68A',
              color: '#92400E',
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.4,
              animation: 'fadeIn 0.2s ease'
            }}
          >
            Frequent sleep difficulties (3+ nights/week) often benefit from structured clinical care.
          </div>
        )}
      </div>
    </div>
  );
}
