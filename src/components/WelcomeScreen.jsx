import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const holdStartTimeRef = useRef(0);
  const HOLD_DURATION_MS = 1000; // Hold for 1 second to start

  const triggerStart = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([60, 40, 80]);
    }
    onStart();
  };

  const startHold = (e) => {
    // Prevent context menus or text selection
    if (e.cancelable) e.preventDefault();
    setIsHolding(true);
    holdStartTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHoldProgress(progress);

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        triggerStart();
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
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

      {/* Hold to Start Button Container */}
      <div
        className="welcome-hold-button"
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        onTouchCancel={cancelHold}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none'
        }}
      >
        {/* Animated Progress Fill Background */}
        <div
          className="hold-progress-bar"
          style={{
            width: `${holdProgress}%`,
            transition: isHolding ? 'none' : 'width 0.25s ease-out'
          }}
        />

        <div className="hold-button-content">
          <div className="hold-icon-wrap">
            <ArrowRight size={22} strokeWidth={3} className={isHolding ? 'hold-pulse-icon' : ''} />
          </div>
          <span className="hold-label-text">
            {isHolding ? 'Hold to Begin...' : 'Hold to Start'}
          </span>
          <div className="hold-chevrons">
            <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline', marginRight: -6 }} />
            <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline', marginRight: -6 }} />
            <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline' }} />
          </div>
        </div>
      </div>

      {/* Footer Subtext */}
      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#021744', paddingTop: 12 }}>
        No account required • Takes about 5-10 minutes
      </div>
    </div>
  );
}
