import React from 'react';
import { Moon, Sun } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen19SleepSchedule({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 19 — Sleep schedule"
        title="Tell us about your usual schedule"
        caption="Think about your typical schedule on work or routine days."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Bedtime */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="bedtime-input">
              What time do you usually go to bed?
            </label>
          </div>
          <div className="input-group-row">
            <div className="input-group-prefix">
              <Moon size={18} color="var(--color-card1-base)" />
            </div>
            <input
              id="bedtime-input"
              type="time"
              className="input-group-field"
              value={store.bedtime}
              onChange={(e) => updateField('bedtime', e.target.value)}
            />
          </div>
        </div>

        {/* Wake Time */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="waketime-input">
              What time do you usually wake up?
            </label>
          </div>
          <div className="input-group-row">
            <div className="input-group-prefix">
              <Sun size={18} color="var(--color-tag-medium-text)" />
            </div>
            <input
              id="waketime-input"
              type="time"
              className="input-group-field"
              value={store.wakeTime}
              onChange={(e) => updateField('wakeTime', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
