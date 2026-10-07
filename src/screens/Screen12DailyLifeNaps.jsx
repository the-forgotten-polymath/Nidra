import React from 'react';
import { Plus } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';
import NumericStepperField from '../components/NumericStepperField';

export default function Screen12DailyLifeNaps({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 12 — Daily life & naps"
        title="Daytime Naps"
        caption="Tell us about your napping habits."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you nap during the day?"
          value={store.takesNaps}
          onChange={(val) => {
            updateField('takesNaps', val);
            if (val === true && store.napDurationMinutes === 0) {
              updateField('napDurationMinutes', 30);
            }
          }}
        />

        {/* If Yes: Nap duration stepper + Quick add */}
        {store.takesNaps === true && (
          <div
            className="anim-slide-leading"
            style={{
              padding: 16,
              borderRadius: 18,
              background: '#F7F5FD',
              border: '1.5px solid var(--color-outline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}
          >
            <div className="input-label">How long are your naps, usually?</div>

            <NumericStepperField
              value={store.napDurationMinutes}
              onChange={(val) => updateField('napDurationMinutes', val)}
              unit="minutes"
              min={5}
              max={300}
              step={5}
              defaultValueIfZero={30}
            />

            {/* Quick Add Buttons */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                Quick Add
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[5, 10, 30].map(inc => (
                  <button
                    key={inc}
                    type="button"
                    className="quick-chip"
                    style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                    onClick={() => updateField('napDurationMinutes', Math.min(300, store.napDurationMinutes + inc))}
                  >
                    <Plus size={11} strokeWidth={3} />
                    <span>{inc} min</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
