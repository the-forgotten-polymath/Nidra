import React from 'react';
import { Coffee } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen23Caffeine({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 23 — Caffeine"
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

          {/* AM Warning Prompt */}
          {store.lastCaffeineTime && Number(store.lastCaffeineTime.split(':')[0]) < 12 && (
            <div
              style={{
                marginTop: 10,
                padding: '10px 14px',
                borderRadius: 12,
                background: '#FFFBEB',
                border: '1.5px solid #F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                fontSize: 12,
                fontWeight: 700,
                color: '#92400E',
                animation: 'fadeIn 0.2s ease'
              }}
            >
              <span>
                ⚠️ You selected morning time (<strong>{store.lastCaffeineTime} AM</strong>). Are you sure your last caffeine is in the morning?
              </span>
              <button
                type="button"
                style={{
                  background: '#F59E0B',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => {
                  const [h, m] = store.lastCaffeineTime.split(':');
                  const pmHour = (Number(h) + 12) % 24;
                  const pmStr = `${String(pmHour).padStart(2, '0')}:${m || '00'}`;
                  updateField('lastCaffeineTime', pmStr);
                }}
              >
                Change to PM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
