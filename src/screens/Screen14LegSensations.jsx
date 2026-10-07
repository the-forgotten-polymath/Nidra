import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen14LegSensations({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 14 — Leg sensations"
        title="Leg sensations"
        caption="These are about how your legs feel when you're resting."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Q1: Urge to move legs */}
        <YesNoPicker
          question="Do you feel an urge to move your legs, or an uncomfortable feeling in them, when lying down or resting?"
          value={store.legsUncomfortableResting}
          onChange={(val) => {
            updateField('legsUncomfortableResting', val);
            if (val === false) {
              updateField('legsWorseEvening', false);
              updateField('legsMovingHelps', false);
              updateField('legsNoOtherReason', false);
            }
          }}
        />

        {/* If Yes: Evening worsening */}
        {store.legsUncomfortableResting === true && (
          <div className="anim-slide-leading">
            <YesNoPicker
              question="Is it worse in the evening or at night?"
              value={store.legsWorseEvening}
              onChange={(val) => updateField('legsWorseEvening', val)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
