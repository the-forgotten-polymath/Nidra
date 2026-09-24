import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function NumericStepperField({
  title,
  value,
  onChange,
  unit = '',
  min = 0,
  max = 999,
  step = 1,
  defaultValueIfZero = 10,
  quickPicks = []
}) {
  const handleDecrement = () => {
    if (value <= min) return;
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    if (value === 0 && defaultValueIfZero > 0 && min === 0) {
      onChange(defaultValueIfZero);
    } else if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {title && <div className="input-label">{title}</div>}

      <div className="stepper-card">
        {/* Minus Button */}
        <button
          type="button"
          className="stepper-btn"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Decrease"
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>

        {/* Display */}
        <div className="stepper-value-display">
          <span className="stepper-num" style={{ color: value > 0 ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
            {value > 0 ? value : '--'}
          </span>
          {unit && <span className="stepper-unit">{unit}</span>}
        </div>

        {/* Plus Button */}
        <button
          type="button"
          className="stepper-btn"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Increase"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Quick Picks if provided */}
      {quickPicks.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Quick pick:</span>
          {quickPicks.map(pick => (
            <button
              key={pick}
              type="button"
              className={`quick-chip ${value === pick ? 'selected' : ''}`}
              onClick={() => onChange(pick)}
            >
              {pick} {unit}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
