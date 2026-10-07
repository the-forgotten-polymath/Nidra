import React from 'react';
import { Check } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen4SleepProblems({ store, updateField, isDeveloperMode }) {
  const options = [
    'Snoring while sleeping',
    'Trouble falling asleep',
    'Waking up often during the night',
    'Waking up earlier than you want to',
    'Waking up but not feeling rested',
    'Something else'
  ];

  const handleToggle = (option) => {
    const current = store.selectedSleepProblems;
    if (current.includes(option)) {
      updateField('selectedSleepProblems', current.filter(item => item !== option));
    } else {
      updateField('selectedSleepProblems', [...current, option]);
    }
  };

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 4 — Sleep problems"
        title="Let's talk about your sleep"
        caption="Which of these problems are you having?&#10;Choose all that apply"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {options.map((option) => {
          const isSelected = store.selectedSleepProblems.includes(option);
          return (
            <div
              key={option}
              className={`multiselect-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggle(option)}
            >
              <span className="multiselect-card-title">{option}</span>
              <div className={`check-circle ${isSelected ? 'checked' : ''}`}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
            </div>
          );
        })}

        {/* If "Something else" selected, show dynamic text box */}
        {store.selectedSleepProblems.includes('Something else') && (
          <div className="anim-slide-leading" style={{ marginTop: 8 }}>
            <label className="input-label" style={{ display: 'block', marginBottom: 6 }}>
              Please describe
            </label>
            <input
              type="text"
              className="text-input-field"
              placeholder="e.g. vivid dreams, kicking legs, teeth grinding..."
              value={store.otherSleepProblemText}
              onChange={(e) => updateField('otherSleepProblemText', e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
