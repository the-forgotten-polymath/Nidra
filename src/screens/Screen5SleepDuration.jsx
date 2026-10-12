import React, { useState } from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen5SleepDuration({ store, updateField, isDeveloperMode }) {
  const [focusedField, setFocusedField] = useState('timeToFallAsleep');

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 5 — Sleep duration"
        title="Sleep duration"
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
      </div>
    </div>
  );
}
