import React from 'react';
import { Tv, Smartphone, Laptop, Gamepad2 } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen24ScreenTime({ store, updateField, totalPreBedtimeScreenMinutes, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 24 — Screen time"
        title="Screen Exposure"
        caption="How many minutes do you spend on each screen in a day?"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Total Summary Card */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            border: '1.5px solid #043CA0',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6A789C' }}>
              Total Daily Screen Exposure
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: '#043CA0'
              }}
            >
              {totalPreBedtimeScreenMinutes} minutes
            </div>
          </div>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 800,
              background: 'rgba(4, 60, 160, 0.08)',
              color: '#043CA0'
            }}
          >
            Daily Total
          </div>
        </div>

        {/* 1. TV Screen Time */}
        <NumericStepperField
          title="TV / Television Screen Time"
          value={store.tvScreenMinutes || 0}
          onChange={(val) => updateField('tvScreenMinutes', val)}
          unit="min"
          min={0}
          max={240}
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

        {/* 2. Phone Screen Time */}
        <NumericStepperField
          title="Smartphone / Mobile Screen Time"
          value={store.phoneScreenMinutes || 0}
          onChange={(val) => updateField('phoneScreenMinutes', val)}
          unit="min"
          min={0}
          max={240}
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

        {/* 3. Computer / Laptop Screen Time */}
        <NumericStepperField
          title="Computer / Laptop / Tablet Screen Time"
          value={store.computerScreenMinutes || 0}
          onChange={(val) => updateField('computerScreenMinutes', val)}
          unit="min"
          min={0}
          max={240}
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

        {/* 4. Other Screens */}
        <NumericStepperField
          title="Other Screens / e-Readers / Gaming"
          value={store.otherScreenMinutes || 0}
          onChange={(val) => updateField('otherScreenMinutes', val)}
          unit="min"
          min={0}
          max={240}
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
