import React, { useState } from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen7SleepHistory({ store, updateField, isDeveloperMode }) {
  const [focusedField, setFocusedField] = useState('durationYears');

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 7 — Problem duration"
        title="Problem duration"
        caption="Tell us how long you've had these sleep problems."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="input-label" style={{ fontSize: 16 }}>
          How long have you had these problems?
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Years */}
          <NumericStepperField
            title="Years"
            value={store.problemDurationYears}
            onChange={(val) => {
              setFocusedField('durationYears');
              updateField('problemDurationYears', val);
            }}
            unit={store.problemDurationYears === 1 ? 'year' : 'years'}
            min={0}
            max={50}
            step={1}
            defaultValueIfZero={1}
            quickPicks={[1, 2, 5, 10]}
            isFocused={focusedField === 'durationYears'}
            onFocus={() => setFocusedField('durationYears')}
          />

          {/* Months */}
          <NumericStepperField
            title="Months"
            value={store.problemDurationMonths}
            onChange={(val) => {
              setFocusedField('durationMonths');
              updateField('problemDurationMonths', val);
            }}
            unit={store.problemDurationMonths === 1 ? 'month' : 'months'}
            min={0}
            max={11}
            step={1}
            defaultValueIfZero={3}
            quickPicks={[1, 3, 6, 9]}
            isFocused={focusedField === 'durationMonths'}
            onFocus={() => setFocusedField('durationMonths')}
          />
        </div>
      </div>
    </div>
  );
}
