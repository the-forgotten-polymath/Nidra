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
  quickPicks = [],
  isFocused = true,
  onFocus
}) {
  const handleDecrement = () => {
    onFocus?.();
    if (value <= min) return;
    onChange(Math.max(min, value - step));
  };

  const handleIncrement = () => {
    onFocus?.();
    if (value === 0 && defaultValueIfZero > 0 && min === 0) {
      onChange(defaultValueIfZero);
    } else if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onClick={() => onFocus?.()}
    >
      {title && <div className="input-label">{title}</div>}

      <div
        className="stepper-card"
        style={{
          border: isFocused ? '2px solid var(--color-outline)' : '1.5px solid rgba(199, 190, 219, 0.45)',
          transition: 'border 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        {/* Minus Button */}
        <button
          type="button"
          className="stepper-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDecrement();
          }}
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
          onClick={(e) => {
            e.stopPropagation();
            handleIncrement();
          }}
          disabled={value >= max}
          aria-label="Increase"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Quick Picks (visible only when focused and quickPicks provided) */}
      {quickPicks.length > 0 && isFocused && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4, animation: 'fadeIn 0.2s ease' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Quick pick:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {quickPicks.map((pick, idx) => {
              const isObj = typeof pick === 'object' && pick !== null;
              const pickVal = isObj ? pick.value : pick;
              const pickLabel = isObj ? pick.label : `${pick}${unit ? ' ' + unit : ''}`;
              const isSelected = isObj ? (pick.isIncrement ? false : value === pickVal) : value === pickVal;

              return (
                <button
                  key={isObj ? pick.label + idx : pick}
                  type="button"
                  className={`quick-chip ${isSelected ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onFocus?.();
                    if (isObj && pick.isIncrement) {
                      onChange(Math.min(max, Math.max(min, (value || 0) + pick.value)));
                    } else {
                      onChange(pickVal);
                    }
                  }}
                >
                  {pickLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
