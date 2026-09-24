import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen11DrivingSafety({ store, updateField, isDeveloperMode }) {
  const incidents = ['A near-accident', 'An accident', 'Neither of these'];

  const handleIncidentToggle = (incident) => {
    let current = [...store.sleepinessIncidentTypes];
    if (incident === 'Neither of these') {
      current = ['Neither of these'];
    } else {
      current = current.filter(i => i !== 'Neither of these');
      if (current.includes(incident)) {
        current = current.filter(i => i !== incident);
      } else {
        current.push(incident);
      }
    }
    updateField('sleepinessIncidentTypes', current);
  };

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 11 — Driving safety"
        title="Driving and safety"
        caption="If you don't drive, you can skip ahead."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {/* Q1: Do you drive? */}
        <YesNoPicker
          question="Do you drive a vehicle?"
          value={store.drivesVehicle}
          onChange={(val) => {
            updateField('drivesVehicle', val);
            if (val === false) {
              updateField('sleepyWhileDriving', null);
              updateField('sleepinessIncidentTypes', []);
            }
          }}
        />

        {/* Subquestions if Drives */}
        {store.drivesVehicle === true && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Sub-question 1: Slides Left to Right */}
            <YesNoPicker
              className="anim-slide-leading"
              question="Do you ever feel sleepy while driving?"
              value={store.sleepyWhileDriving}
              onChange={(val) => {
                updateField('sleepyWhileDriving', val);
                if (val === false) {
                  updateField('sleepinessIncidentTypes', []);
                }
              }}
            />

            {/* Sub-question 2: Slides Right to Left */}
            {store.sleepyWhileDriving === true && (
              <div className="anim-slide-trailing" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="input-label">Has feeling sleepy ever caused:</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: -6, marginBottom: 4 }}>
                  Select any that apply
                </div>

                {incidents.map((incident) => {
                  const isSelected = store.sleepinessIncidentTypes.includes(incident);
                  return (
                    <div
                      key={incident}
                      className={`multiselect-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleIncidentToggle(incident)}
                    >
                      <span className="multiselect-card-title">{incident}</span>
                      <div className={`check-circle ${isSelected ? 'checked' : ''}`}>
                        {isSelected && <Check size={14} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Honest Answers Banner */}
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'var(--color-tag-high-bg)',
            border: '1.5px solid var(--color-outline)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}
        >
          <ShieldCheck size={24} color="var(--color-tag-high-text)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-dark)', lineHeight: 1.4 }}>
            Honest answers help your care team keep you safe on the road.
          </p>
        </div>
      </div>
    </div>
  );
}
