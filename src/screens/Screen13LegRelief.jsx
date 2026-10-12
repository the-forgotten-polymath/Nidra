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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Does it get better till the time you stretch or Walk ?"
          value={store.legsMovingHelps}
          onChange={(val) => updateField('legsMovingHelps', val)}
        />

        <YesNoPicker
          question="Does this sensation increases on lying down or resting ? "
          value={store.legsNoOtherReason}
          onChange={(val) => updateField('legsNoOtherReason', val)}
        />
      </div>
    </div>
  );
}
