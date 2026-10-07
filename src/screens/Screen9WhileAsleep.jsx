import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen9WhileAsleep({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 9 — While you're asleep"
        title="While you're asleep"
        caption="Other symptoms during the night"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you wake up choking or gasping in your sleep?"
          subtitle="Waking abruptly with a feeling of shortness of breath or suffocation."
          value={store.wakesChokingGasping}
          onChange={(val) => updateField('wakesChokingGasping', val)}
        />

        <YesNoPicker
          question="Has anyone noticed that you stop breathing while asleep?"
          subtitle="For example, someone notices pauses between your breaths."
          value={store.stopBreathingNoticed}
          onChange={(val) => updateField('stopBreathingNoticed', val)}
        />
      </div>
    </div>
  );
}
