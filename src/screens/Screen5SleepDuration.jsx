import React, { useState } from 'react';
import { Minus, Plus, Moon } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen5SleepDuration({ store, updateField, isDeveloperMode }) {
  const [focusedField, setFocusedField] = useState('bedtime');

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 5 — Sleep duration"
        title="Sleep duration"
        caption="Tell us about your typical sleep at night."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Q0: Bedtime / At what time do you sleep? */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="screen5-bedtime-input">
              At what time do you usually sleep?
            </label>
          </div>
          <div className="input-group-row">
            <div className="input-group-prefix">
              <Moon size={18} color="#8B94FB" />
            </div>
            <input
              id="screen5-bedtime-input"
              type="time"
              className="input-group-field"
              value={store.weekdayBedtime || store.bedtime || '23:00'}
              onChange={(e) => {
                updateField('weekdayBedtime', e.target.value);
                updateField('bedtime', e.target.value);
              }}
            />
          </div>
        </div>

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
          defaultValueIfZero={0}
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
          defaultValueIfZero={0}
          quickPicks={[0, 1, 2, 3, 5]}
          isFocused={focusedField === 'awakenings'}
          onFocus={() => setFocusedField('awakenings')}
        />

        {/* Q3: Sleep duration hours (starts from 0) */}
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
                updateField('sleepDurationHours', Math.max(0, Math.round((store.sleepDurationHours || 0) - 1)));
              }}
              disabled={(store.sleepDurationHours || 0) <= 0}
              aria-label="Decrease hours"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <div className="stepper-value-display">
              <span className="stepper-num" style={{ color: 'var(--color-text-dark)' }}>
                {Math.round(store.sleepDurationHours || 0)}
              </span>
              <span className="stepper-unit">hours</span>
            </div>

            <button
              type="button"
              className="stepper-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFocusedField('sleepDuration');
                updateField('sleepDurationHours', Math.min(16, Math.round((store.sleepDurationHours || 0) + 1)));
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
                {[0, 4, 5, 6, 7, 8, 9, 10].map(h => (
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
                    {h} hrs
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
