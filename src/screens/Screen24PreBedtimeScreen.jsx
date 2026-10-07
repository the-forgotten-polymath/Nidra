import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen24PreBedtimeScreen({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 24B — Pre-bedtime screen exposure"
        title="Screen Time Before Bed"
        caption="How many minutes in the last hour before bedtime do you use a screen (TV / phone / computer)?"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Pre-bedtime screen time (0 to 60 minutes limit, step 1) */}
        <NumericStepperField
          title="Pre-bedtime Screen Minutes (Last hour before bed)"
          value={store.preBedtimeScreenMinutes || 0}
          onChange={(val) => updateField('preBedtimeScreenMinutes', val)}
          unit="min"
          min={0}
          max={60}
          step={1}
          defaultValueIfZero={0}
          quickPicks={[
            { label: '0 min', value: 0 },
            { label: '+5 min', value: 5, isIncrement: true },
            { label: '+10 min', value: 10, isIncrement: true },
            { label: '+15 min', value: 15, isIncrement: true },
            { label: '+30 min', value: 30, isIncrement: true },
            { label: '+60 min', value: 60, isIncrement: true }
          ]}
        />
      </div>
    </div>
  );
}
