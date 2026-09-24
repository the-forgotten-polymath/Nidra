import React from 'react';
import { Smartphone } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen22ScreenTime({ store, updateField, isDeveloperMode }) {
  const minutes = store.preBedtimeScreenMinutes || 0;

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 22 — Screen exposure"
        title="Pre-bedtime Screen Exposure"
        caption="Light from electronic screens in the hour before sleep can delay melatonin onset and affect sleep quality."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            padding: 20,
            borderRadius: 20,
            border: '1.5px solid var(--color-outline)',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#F3E8FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7E3AF2'
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <div className="input-label">Screen Time Before Bed</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
                Phone, TV, laptop, or tablet
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 900, color: 'var(--color-text-dark)' }}>
              {minutes}
            </span>
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-muted)', marginLeft: 6 }}>
              minutes
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="180"
            step="5"
            className="custom-range-slider"
            value={minutes}
            onChange={(e) => updateField('preBedtimeScreenMinutes', Number(e.target.value))}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>
            <span>0 min</span>
            <span>60 min</span>
            <span>120 min</span>
            <span>180 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
