import React from 'react';
import { User, Minus, Plus, Check } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen2AboutYou({ store, updateField, isDeveloperMode, onContinue }) {
  const sexOptions = [
    { id: 'Male', label: 'Male', icon: '👨' },
    { id: 'Female', label: 'Female', icon: '👩' },
    { id: 'Other', label: 'Other', icon: '🧑' }
  ];

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 2 — About you"
        title="Let's start with you"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Question 1: Name */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="patient-name">What's your name?</label>
          </div>
          <div className="input-group-row">
            <div className="input-group-prefix">
              <User size={18} color="var(--color-text-dark)" />
            </div>
            <input
              id="patient-name"
              type="text"
              className="input-group-field"
              placeholder="Enter your name"
              value={store.name}
              onChange={(e) => updateField('name', e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Question 2: Age */}
        <div>
          <div className="input-label-row">
            <label className="input-label">How old are you?</label>
          </div>
          
          <div className="stepper-card">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.age > 1) updateField('age', store.age - 1);
              }}
              disabled={store.age <= 0}
              aria-label="Decrease age"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <div className="stepper-value-display">
              <span className="stepper-num" style={{ color: store.age > 0 ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                {store.age > 0 ? store.age : '--'}
              </span>
              <span className="stepper-unit">years</span>
            </div>

            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.age === 0) {
                  updateField('age', 25);
                } else if (store.age < 120) {
                  updateField('age', store.age + 1);
                }
              }}
              aria-label="Increase age"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          <input
            type="range"
            min="12"
            max="99"
            step="1"
            className="custom-range-slider"
            value={store.age > 0 ? store.age : 30}
            onChange={(e) => updateField('age', Number(e.target.value))}
          />
        </div>

        {/* Question 3: Sex */}
        <div>
          <div className="input-label-row">
            <label className="input-label">What is your sex?</label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {sexOptions.map((opt) => {
              const isSelected = store.sex === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`choice-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => updateField('sex', opt.id)}
                >
                  <span style={{ fontSize: 16 }}>{opt.icon}</span>
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
