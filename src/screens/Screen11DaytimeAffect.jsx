import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen11DaytimeAffect({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 11 — Daytime affect"
        title="Daytime Symptoms"
        caption="Think about how you usually feel during a typical day."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you feel drowsy during the day?"
          value={store.drowsyDuringDay}
          onChange={(val) => updateField('drowsyDuringDay', val)}
        />

        <YesNoPicker
          question="Do you feel tired or low on energy?"
          value={store.tiredLowEnergy}
          onChange={(val) => updateField('tiredLowEnergy', val)}
        />

        <YesNoPicker
          question="Does this affect your work or daily activities?"
          value={store.affectsWorkOrDaily}
          onChange={(val) => updateField('affectsWorkOrDaily', val)}
        />
      </div>
    </div>
  );
}
