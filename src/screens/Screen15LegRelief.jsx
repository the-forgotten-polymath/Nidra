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
        <YesNoPicker
          question="Does it get better when you walk or move?"
          value={store.legsMovingHelps}
          onChange={(val) => updateField('legsMovingHelps', val)}
        />

        <YesNoPicker
          question="Does it happen even without another obvious cause, like cramps or an injury?"
          value={store.legsNoOtherReason}
          onChange={(val) => updateField('legsNoOtherReason', val)}
        />
      </div>
    </div>
  );
}
