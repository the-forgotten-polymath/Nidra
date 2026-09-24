import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen8MorningFeelings({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 8 — Morning feelings"
        title="How do you feel when you wake up?"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you often wake up with a dry mouth?"
          value={store.dryMouth}
          onChange={(val) => updateField('dryMouth', val)}
        />

        <YesNoPicker
          question="Do you often wake up with a headache?"
          value={store.morningHeadache}
          onChange={(val) => updateField('morningHeadache', val)}
        />
      </div>
    </div>
  );
}
