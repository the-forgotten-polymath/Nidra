import React from 'react';
import { Minus, Plus, Scale } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen17BodyMeasurements({
  store,
  updateField,
  calculatedBMI,
  bmiCategoryInfo,
  isDeveloperMode
}) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 17 — Body measurements"
        title="Height and weight"
        caption="Your neck and waist are already done."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Weight Input */}
        <div>
          <div className="input-label-row">
            <label className="input-label">Weight</label>
            {store.weightKg > 0 && (
              <button
                type="button"
                onClick={() => updateField('weightKg', 0.0)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="stepper-card">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.weightKg >= 1) updateField('weightKg', Math.max(0, store.weightKg - 1));
              }}
              disabled={store.weightKg <= 0}
              aria-label="Decrease weight"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <div className="stepper-value-display">
              <span className="stepper-num" style={{ color: store.weightKg > 0 ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                {store.weightKg > 0 ? Math.round(store.weightKg) : '--'}
              </span>
              <span className="stepper-unit">kg</span>
            </div>

            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.weightKg === 0) updateField('weightKg', 65.0);
                else if (store.weightKg < 250) updateField('weightKg', store.weightKg + 1);
              }}
              aria-label="Increase weight"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Quick Add Weight */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Quick add:</span>
            {[1, 5, 10].map(inc => (
              <button
                key={inc}
                type="button"
                className="quick-chip"
                onClick={() => updateField('weightKg', Math.min(250, (store.weightKg || 60) + inc))}
              >
                +{inc} kg
              </button>
            ))}
          </div>
        </div>

        {/* Height Input */}
        <div>
          <div className="input-label-row">
            <label className="input-label">Height</label>
            {store.heightCm > 0 && (
              <button
                type="button"
                onClick={() => updateField('heightCm', 0.0)}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="stepper-card">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.heightCm >= 1) updateField('heightCm', Math.max(0, store.heightCm - 1));
              }}
              disabled={store.heightCm <= 0}
              aria-label="Decrease height"
            >
              <Minus size={16} strokeWidth={2.5} />
            </button>

            <div className="stepper-value-display">
              <span className="stepper-num" style={{ color: store.heightCm > 0 ? 'var(--color-text-dark)' : 'var(--color-text-light)' }}>
                {store.heightCm > 0 ? Math.round(store.heightCm) : '--'}
              </span>
              <span className="stepper-unit">cm</span>
            </div>

            <button
              type="button"
              className="stepper-btn"
              onClick={() => {
                if (store.heightCm === 0) updateField('heightCm', 170.0);
                else if (store.heightCm < 230) updateField('heightCm', store.heightCm + 1);
              }}
              aria-label="Increase height"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Quick Add Height */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-text-muted)' }}>Quick add:</span>
            {[1, 5, 10].map(inc => (
              <button
                key={inc}
                type="button"
                className="quick-chip"
                onClick={() => updateField('heightCm', Math.min(230, (store.heightCm || 160) + inc))}
              >
                +{inc} cm
              </button>
            ))}
          </div>
        </div>

        {/* Live Dynamic BMI Display Card */}
        <div
          className="bmi-reactive-card"
          style={{
            background: bmiCategoryInfo.bgColor,
            borderColor: bmiCategoryInfo.accentColor,
            color: bmiCategoryInfo.textColor
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Your BMI</div>
              <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85 }}>Asian Indian Standard</div>
            </div>

            <div
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.9)',
                border: `1.5px solid ${bmiCategoryInfo.accentColor}`,
                fontSize: 12,
                fontWeight: 800,
                color: bmiCategoryInfo.textColor
              }}
            >
              {bmiCategoryInfo.name}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 900 }}>
              {calculatedBMI > 0 ? calculatedBMI.toFixed(1) : '0.0'}
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, opacity: 0.85 }}>kg/m²</span>
          </div>

          <div style={{ height: 1, background: bmiCategoryInfo.accentColor, opacity: 0.3, marginBottom: 12 }} />

          {/* Reference Ranges */}
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 }}>
            BMI Category Ranges
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: 12, fontWeight: 600 }}>
            <div>• Underweight: &lt; 18.5</div>
            <div>• Normal: 18.5 – 22.9</div>
            <div>• Overweight: 23.0 – 24.9</div>
            <div>• Obese: ≥ 25.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
