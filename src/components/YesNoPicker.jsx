import React from 'react';
import { Check } from 'lucide-react';

export default function YesNoPicker({
  question,
  subtitle,
  value,
  onChange,
  className = ''
}) {
  return (
    <div className={`yes-no-picker-card ${className}`}>
      <div className="yes-no-question-title">{question}</div>
      {subtitle && <div className="yes-no-question-subtitle">{subtitle}</div>}

      <div className="yes-no-grid">
        {/* Yes Button */}
        <button
          type="button"
          className={`choice-btn ${value === true ? 'selected' : ''}`}
          onClick={() => onChange(true)}
        >
          <span>Yes</span>
          {value === true && <Check size={16} strokeWidth={3} />}
        </button>

        {/* No Button */}
        <button
          type="button"
          className={`choice-btn ${value === false ? 'selected' : ''}`}
          onClick={() => onChange(false)}
        >
          <span>No</span>
          {value === false && <Check size={16} strokeWidth={3} />}
        </button>
      </div>
    </div>
  );
}
