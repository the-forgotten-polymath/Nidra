import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen22SmokingAlcohol({ store, updateField, isDeveloperMode }) {
  const alcoholOptions = [
    'Never / Do not drink',
    'Occasionally (1-2 drinks/month)',
    '1-2 drinks per week',
    '3-5 drinks per week',
    'Daily / 6+ drinks per week'
  ];

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 22 — Smoking & alcohol"
        title="A few daily habits"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Smoking Stepper */}
        <NumericStepperField
          title="How many cigarettes or beedis do you usually smoke each day?"
          value={store.cigarettesPerDay}
          onChange={(val) => updateField('cigarettesPerDay', val)}
          unit="/ day"
          min={0}
          max={100}
          step={1}
          defaultValueIfZero={0}
          quickPicks={[0, 2, 5, 10]}
        />

        {/* Alcohol Frequency Selector */}
        <div>
          <div className="input-label" style={{ marginBottom: 8 }}>
            How much alcohol do you usually drink?
          </div>

          <select
            className="text-input-field"
            style={{ cursor: 'pointer' }}
            value={store.alcoholFrequency}
            onChange={(e) => updateField('alcoholFrequency', e.target.value)}
          >
            <option value="" disabled>Select alcohol frequency</option>
            {alcoholOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
