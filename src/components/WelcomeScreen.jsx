import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  const handleStart = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([60, 40, 80]);
    }
    onStart();
  };

  return (
    <div className="welcome-viewport">
      {/* Top App Wordmark */}
      <div className="welcome-logo-text">
        Nidra
      </div>

      {/* Main Character Illustration */}
      <div className="welcome-illustration-wrap">
        <img
          src="/mainScreen_Illustration.png"
          alt="Nidra Sleep Assessment"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Value Proposition */}
      <div className="welcome-content-block">
        <h2 className="welcome-headline">Understand Your Sleep</h2>
        <p className="welcome-subtext">
          Explore your sleep patterns, identify possible concerns, and get personalized next steps for better sleep.
        </p>
      </div>

      {/* Click to Start Button */}
      <button
        type="button"
        className="primary-continue-btn"
        onClick={handleStart}
        style={{
          height: 60,
          borderRadius: 'var(--radius-full)',
          background: '#043CA0',
          borderColor: '#043CA0',
          fontSize: 16,
          fontWeight: 800,
          boxShadow: '0 8px 20px rgba(4, 60, 160, 0.3)',
          cursor: 'pointer'
        }}
      >
        <span>Start Assessment</span>
        <ArrowRight size={20} strokeWidth={2.5} />
      </button>

      {/* Footer Subtext */}
      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#021744', paddingTop: 12 }}>
        No account required • Takes about 5-10 minutes
      </div>
    </div>
  );
}
