import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen5DurationFrequency({ store, updateField, isDeveloperMode }) {
  const [focusedField, setFocusedField] = useState('timeToFallAsleep');

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 5 — Duration & pattern"
        title="Sleep duration & pattern"
        caption="Tell us about your typical sleep at night."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Q1: Time to fall asleep */}
        <NumericStepperField
          title="How much time does it take you to fall asleep?"
          value={store.timeToFallAsleepMinutes}
          onChange={(val) => {
            setFocusedField('timeToFallAsleep');
            updateField('timeToFallAsleepMinutes', val);
          }}
          unit="minutes"
          min={0}
          max={180}
          step={1}
          defaultValueIfZero={20}
          quickPicks={[5, 10, 15, 20, 30, 45, 60, 90]}
          isFocused={focusedField === 'timeToFallAsleep'}
          onFocus={() => setFocusedField('timeToFallAsleep')}
        />

        {/* Q2: Awakenings count */}
        <NumericStepperField
          title="How many times do you wake up at night?"
          value={store.nocturnalAwakeningsCount}
          onChange={(val) => {
            setFocusedField('awakenings');
            updateField('nocturnalAwakeningsCount', val);
          }}
          unit="times"
          min={0}
          max={15}
          step={1}
          defaultValueIfZero={1}
          quickPicks={[1, 2, 3, 5]}
          isFocused={focusedField === 'awakenings'}
          onFocus={() => setFocusedField('awakenings')}
        />

        {/* Q3: Sleep duration hours */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          onClick={() => setFocusedField('sleepDuration')}
        >
          <div className="input-label">
            How many hours do you usually sleep each night?
          </div>

          <div
            className="stepper-card"
            style={{
              border: focusedField === 'sleepDuration' ? '2px solid var(--color-outline)' : '1.5px solid rgba(199, 190, 219, 0.45)',
              transition: 'border 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <button
              type="button"
              className="stepper-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFocusedField('sleepDuration');
                if (store.sleepDurationHours > 3.0) {
                  updateField('sleepDurationHours', Number((store.sleepDurationHours - 0.5).toFixed(1)));
                } else if (store.sleepDurationHours > 0) {
                  updateField('sleepDurationHours', 0.0);
                }
              }}
              disabled={store.sleepDurationHours <= 0}
              aria-label="Decrease hours"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <div className="stepper-value-display">
              <span className="stepper-num" style={{ color: store.sleepDurationHours > 0 ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                {store.sleepDurationHours > 0 ? store.sleepDurationHours.toFixed(1) : '--'}
              </span>
              <span className="stepper-unit">hours</span>
            </div>

            <button
              type="button"
              className="stepper-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFocusedField('sleepDuration');
                if (store.sleepDurationHours === 0.0) {
                  updateField('sleepDurationHours', 7.0);
                } else if (store.sleepDurationHours < 16.0) {
                  updateField('sleepDurationHours', Number((store.sleepDurationHours + 0.5).toFixed(1)));
                }
              }}
              aria-label="Increase hours"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          {focusedField === 'sleepDuration' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, animation: 'fadeIn 0.2s ease' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Quick pick:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                {[0.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0].map(h => (
                  <button
                    key={h}
                    type="button"
                    className={`quick-chip ${store.sleepDurationHours === h ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFocusedField('sleepDuration');
                      updateField('sleepDurationHours', h);
                    }}
                  >
                    {h.toFixed(1)} hrs
                  </button>
                ))}
                <button
                  type="button"
                  className="quick-chip"
                  style={{
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 800,
                    background: '#EFF6FF',
                    color: '#043CA0',
                    border: '1.5px solid #BFDBFE'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedField('sleepDuration');
                    updateField('sleepDurationHours', Math.min(16, Number((Number(store.sleepDurationHours || 0) + 0.5).toFixed(1))));
                  }}
                >
                  +0.5 hr
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
