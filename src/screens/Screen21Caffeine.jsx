import React from 'react';
import { Coffee } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen21Caffeine({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 21 — Caffeine intake"
        title="What about caffeine?"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Caffeine Stepper */}
        <div>
          <NumericStepperField
            title="How many caffeinated drinks do you usually have each day?"
            value={store.caffeinatedDrinksPerDay}
            onChange={(val) => updateField('caffeinatedDrinksPerDay', val)}
            unit="drinks"
            min={0}
            max={30}
            step={1}
            defaultValueIfZero={2}
            quickPicks={[0, 1, 2, 3, 5]}
          />
          <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 6, paddingLeft: 4 }}>
            Include tea, coffee, energy drinks, cola, or other caffeinated drinks.
          </div>
        </div>

        {/* Last Caffeine Time */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="last-caffeine-input">
              When do you usually have your last caffeinated drink?
            </label>
          </div>
          <div className="input-group-row">
            <div className="input-group-prefix">
              <Coffee size={18} color="var(--color-card3-wave)" />
            </div>
            <input
              id="last-caffeine-input"
              type="time"
              className="input-group-field"
              value={store.lastCaffeineTime}
              onChange={(e) => updateField('lastCaffeineTime', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
