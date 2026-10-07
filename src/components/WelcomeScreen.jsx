import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function WelcomeScreen({ onStart, onSelectPreset }) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const startXRef = useRef(0);
  const currentOffsetRef = useRef(0);

  const handlePointerDown = (e) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    
    // Set pointer capture to capture move/up outside element
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore if unsupported
    }

    const startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startXRef.current = startX;
    currentOffsetRef.current = 0;
    setIsDragging(true);

    const maxDrag = Math.max(100, track.offsetWidth - 60);

    const onPointerMove = (moveEvt) => {
      const currentX = moveEvt.clientX || (moveEvt.touches && moveEvt.touches[0].clientX) || 0;
      const diff = currentX - startXRef.current;
      const clamped = Math.max(0, Math.min(maxDrag, diff));
      currentOffsetRef.current = clamped;
      setDragOffset(clamped);
    };

    const onPointerUp = (upEvt) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      
      setIsDragging(false);

      // Only trigger if dragged towards the end (70% or more)
      if (currentOffsetRef.current >= maxDrag * 0.70) {
        setDragOffset(maxDrag);
        // Haptic feedback if available
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(50);
        }
        setTimeout(() => {
          onStart();
        }, 180);
      } else {
        // Snap back to starting position
        setDragOffset(0);
        currentOffsetRef.current = 0;
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  };

  const trackWidth = trackRef.current?.offsetWidth || 340;
  const maxDrag = Math.max(100, trackWidth - 60);
  const dragRatio = Math.min(1, Math.max(0, dragOffset / maxDrag));

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

      {/* Drag-To-Start Slider Track (No click-to-start, dragging arrow required) */}
      <div
        ref={trackRef}
        className="welcome-start-slider"
      >
        {/* Draggable Arrow Thumb */}
        <div
          className="slider-thumb-circle"
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'grab'
          }}
          onPointerDown={handlePointerDown}
        >
          <ArrowRight size={22} strokeWidth={3} />
        </div>

        {/* Text and chevrons that fade as thumb is dragged */}
        <div
          className="slider-cta-text"
          style={{
            opacity: Math.max(0.1, 1 - dragRatio * 1.5),
            transform: `translateX(${dragOffset * 0.15}px)`
          }}
        >
          Slide to Start
        </div>

        <div
          className="slider-chevrons"
          style={{ opacity: Math.max(0.1, 1 - dragRatio * 1.2) }}
        >
          <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline', marginRight: -6 }} />
          <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline', marginRight: -6 }} />
          <ChevronRight size={18} strokeWidth={3} style={{ display: 'inline' }} />
        </div>
      </div>

      {/* Footer Subtext */}
      <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#021744', paddingTop: 12 }}>
        No account required • Takes about 5-10 minutes
      </div>

      {/* Quick Test Demo Presets */}
      {onSelectPreset && (
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1.5px solid rgba(2, 23, 68, 0.15)', textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 900, color: '#021744', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
            🧪 Quick Test Diagnostic Results (1-Click)
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { id: 'NORMAL', label: 'Healthy Normal' },
              { id: 'RLS', label: 'Only RLS' },
              { id: 'INSOMNIA', label: 'Only Insomnia' },
              { id: 'OSA_CARDIAC', label: 'OSA + Cardiac' },
              { id: 'COMISA', label: 'COMISA' },
              { id: 'ACCIDENT_RISK', label: '🏁 Crash Risk' }
            ].map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPreset(p.id)}
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #021744',
                  color: '#021744',
                  padding: '5px 10px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.15s ease'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
