import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen12LegSensations({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 12 — Leg sensations"
        title="Leg sensations"
        caption="These are about how your legs feel when you're resting."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Q1: Urge to move legs */}
        <YesNoPicker
          question="Do you feel an urge to move your legs or an uncomfortable sensation in them?"
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

        {/* Q2: Increases on lying down or resting */}
        {store.legsUncomfortableResting === true && (
          <div className="anim-slide-leading">
            <YesNoPicker
              question="does this sensation increases on lying down or resting ?"
              value={store.legsNoOtherReason}
              onChange={(val) => updateField('legsNoOtherReason', val)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
