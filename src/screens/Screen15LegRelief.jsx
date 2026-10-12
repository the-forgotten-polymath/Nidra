import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen15LegRelief({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 15 — Leg relief"
        title="Leg relief & causes"
        caption="These are about what helps or causes the uncomfortable feeling."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Q3: Better with stretch or walk */}
        <YesNoPicker
          question="Does it get better till the time you stretch or Walk ?"
          value={store.legsMovingHelps}
          onChange={(val) => updateField('legsMovingHelps', val)}
        />

        {/* Q4: Worse in evening or night */}
        <YesNoPicker
          question="does this sensation gets worse in evening or night ?"
          value={store.legsWorseEvening}
          onChange={(val) => updateField('legsWorseEvening', val)}
        />
      </div>
    </div>
  );
}
