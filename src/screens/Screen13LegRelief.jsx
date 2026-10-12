import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen13LegRelief({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 13 — Leg relief"
        title="Leg sensations"
        caption="These are about how your legs feel when you're resting."
        isDeveloperMode={isDeveloperMode}
      />

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
  );
}
