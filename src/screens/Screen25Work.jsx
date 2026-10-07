import React from 'react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';
import YesNoPicker from '../components/YesNoPicker';

export default function Screen25Work({ store, updateField, isDeveloperMode }) {
  const occupations = [
    'Desk / Office Work',
    'Healthcare / Hospital',
    'Driving / Transportation',
    'Manual / Physical Labor',
    'Education / Teaching',
    'Student',
    'Homemaker',
    'Retired',
    'Self-Employed / Business',
    'Other'
  ];

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 25 — Work"
        title="Tell us about your work"
        caption="Shift work and night schedules can impact your circadian rhythm."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <YesNoPicker
          question="Do you work night shifts or changing shifts?"
          value={store.worksNightShifts}
          onChange={(val) => {
            updateField('worksNightShifts', val);
            if (val === true && !store.occupation) {
              updateField('occupation', 'Desk / Office Work');
            }
          }}
        />

        {/* If Yes: Occupation dropdown */}
        {store.worksNightShifts === true && (
          <div className="anim-slide-leading" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div className="input-label" style={{ marginBottom: 8 }}>
                What kind of work do you do?
              </div>

              <select
                className="text-input-field"
                style={{ cursor: 'pointer' }}
                value={store.occupation}
                onChange={(e) => updateField('occupation', e.target.value)}
              >
                <option value="" disabled>Select occupation</option>
                {occupations.map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* If Other: text input */}
            {store.occupation === 'Other' && (
              <div className="anim-slide-trailing">
                <label className="input-label" style={{ display: 'block', marginBottom: 6 }}>
                  Please specify your work
                </label>
                <input
                  type="text"
                  className="text-input-field"
                  placeholder="e.g. Freelancer, Consultant..."
                  value={store.otherOccupationText}
                  onChange={(e) => updateField('otherOccupationText', e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
