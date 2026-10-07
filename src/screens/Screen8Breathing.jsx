import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen8Breathing({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 8 — Snoring"
        title="Snoring"
        caption="Answer based on what you notice yourself or what someone who sleeps nearby has noticed."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you snore when you sleep?"
          value={store.snoresWhenSleeping}
          onChange={(val) => {
            updateField('snoresWhenSleeping', val);
            if (val === false) {
              updateField('snoringLoudOtherRoom', false);
            }
          }}
        />

        {/* Branching Logic: Only show loud snoring question if Yes */}
        {store.snoresWhenSleeping === true && (
          <YesNoPicker
            className="anim-slide-leading"
            question="Is your snoring loud enough to be heard from another room?"
            subtitle="Louder than talking or heavy breathing."
            value={store.snoringLoudOtherRoom}
            onChange={(val) => updateField('snoringLoudOtherRoom', val)}
          />
        )}
      </div>
    </div>
  );
}
