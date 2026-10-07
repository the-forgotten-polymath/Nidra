import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen19BodyMeasurements({
  store,
  updateField,
  totalWeightKg,
  heightFeet,
  heightInches,
  calculatedBMI,
  bmiCategoryInfo,
  isDeveloperMode
}) {
  const [focusedField, setFocusedField] = useState('weightKg');

  const setHeightFromFeetInches = (ft, inc) => {
    const totalInc = ft * 12 + inc;
    const cm = Math.round(totalInc * 2.54 * 10) / 10;
    updateField('heightCm', cm);
  };

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 19 — Body measurements"
        title="Height and weight"
        caption="Enter height in cm or ft/in, and weight in kg."
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Weight Section (kg) */}
        <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 20, border: '1.5px solid #043CA0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label className="input-label" style={{ margin: 0 }}>Weight (kg)</label>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#043CA0', background: 'rgba(4, 60, 160, 0.08)', padding: '3px 10px', borderRadius: 12 }}>
              Total: {Math.round(store.weightKg || 60)} kg
            </span>
          </div>

          {/* KG Stepper */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6A789C', marginBottom: 6 }}>Kilograms (kg)</div>
            <div
              className="stepper-card"
              style={{
                border: focusedField === 'weightKg' ? '2px solid #043CA0' : '1.5px solid rgba(199, 190, 219, 0.45)',
                minHeight: 52
              }}
              onClick={() => setFocusedField('weightKg')}
            >
              <button
                type="button"
                className="stepper-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusedField('weightKg');
                  updateField('weightKg', Math.max(20, (store.weightKg || 60) - 1));
                }}
                aria-label="Decrease kg"
              >
                <Minus size={15} strokeWidth={2.5} />
              </button>

              <div className="stepper-value-display">
                <span className="stepper-num" style={{ color: '#021744', fontSize: 22 }}>
                  {Math.round(store.weightKg || 60)}
                </span>
                <span className="stepper-unit">kg</span>
              </div>

              <button
                type="button"
                className="stepper-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setFocusedField('weightKg');
                  updateField('weightKg', Math.min(250, (store.weightKg || 60) + 1));
                }}
                aria-label="Increase kg"
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Quick Common Weights */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6A789C' }}>Quick pick:</span>
            {[50, 60, 70, 80, 90, 100].map(kg => (
              <button
                key={kg}
                type="button"
                className="quick-chip"
                style={{
                  padding: '3px 8px',
                  fontSize: 11,
                  background: Math.round(store.weightKg || 60) === kg ? '#043CA0' : '#F1F5F9',
                  color: Math.round(store.weightKg || 60) === kg ? '#FFFFFF' : '#021744'
                }}
                onClick={() => {
                  setFocusedField('weightKg');
                  updateField('weightKg', kg);
                }}
              >
                {kg} kg
              </button>
            ))}
          </div>
        </div>

        {/* Height Section (cm & ft/in dual display) */}
        <div style={{ background: '#FFFFFF', padding: 18, borderRadius: 20, border: '1.5px solid #043CA0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label className="input-label" style={{ margin: 0 }}>Height</label>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#043CA0', background: 'rgba(4, 60, 160, 0.08)', padding: '3px 10px', borderRadius: 12 }}>
              {heightFeet}' {heightInches}" ({Math.round(store.heightCm || 150)} cm)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* CM Stepper */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6A789C', marginBottom: 6 }}>Centimeters (cm)</div>
              <div
                className="stepper-card"
                style={{
                  border: focusedField === 'heightCm' ? '2px solid #043CA0' : '1.5px solid rgba(199, 190, 219, 0.45)',
                  minHeight: 52
                }}
                onClick={() => setFocusedField('heightCm')}
              >
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedField('heightCm');
                    updateField('heightCm', Math.max(50, (store.heightCm || 150) - 1));
                  }}
                  aria-label="Decrease cm"
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>

                <div className="stepper-value-display">
                  <span className="stepper-num" style={{ color: '#021744', fontSize: 22 }}>
                    {Math.round(store.heightCm || 150)}
                  </span>
                </div>

                <button
                  type="button"
                  className="stepper-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedField('heightCm');
                    updateField('heightCm', Math.min(240, (store.heightCm || 150) + 1));
                  }}
                  aria-label="Increase cm"
                >
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Feet & Inches Stepper */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#6A789C', marginBottom: 6 }}>Inches (ft & in)</div>
              <div
                className="stepper-card"
                style={{
                  border: focusedField === 'heightInches' ? '2px solid #043CA0' : '1.5px solid rgba(199, 190, 219, 0.45)',
                  minHeight: 52
                }}
                onClick={() => setFocusedField('heightInches')}
              >
                <button
                  type="button"
                  className="stepper-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedField('heightInches');
                    const totalInches = Math.max(20, heightFeet * 12 + heightInches - 1);
                    const newFt = Math.floor(totalInches / 12);
                    const newIn = totalInches % 12;
                    setHeightFromFeetInches(newFt, newIn);
                  }}
                  aria-label="Decrease inches"
                >
                  <Minus size={15} strokeWidth={2.5} />
                </button>

                <div className="stepper-value-display">
                  <span className="stepper-num" style={{ color: '#021744', fontSize: 20 }}>
                    {heightFeet}' {heightInches}"
                  </span>
                </div>

                <button
                  type="button"
                  className="stepper-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFocusedField('heightInches');
                    const totalInches = Math.min(96, heightFeet * 12 + heightInches + 1);
                    const newFt = Math.floor(totalInches / 12);
                    const newIn = totalInches % 12;
                    setHeightFromFeetInches(newFt, newIn);
                  }}
                  aria-label="Increase inches"
                >
                  <Plus size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Common Heights */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6A789C' }}>Quick heights:</span>
            {[
              { label: "4'11\" (150)", cm: 150 },
              { label: "5'2\" (157)", cm: 157.5 },
              { label: "5'4\" (163)", cm: 162.6 },
              { label: "5'7\" (170)", cm: 170.2 },
              { label: "5'10\" (178)", cm: 177.8 }
            ].map(item => (
              <button
                key={item.label}
                type="button"
                className="quick-chip"
                style={{
                  padding: '3px 8px',
                  fontSize: 11,
                  background: Math.round(store.heightCm || 150) === Math.round(item.cm) ? '#043CA0' : '#F1F5F9',
                  color: Math.round(store.heightCm || 150) === Math.round(item.cm) ? '#FFFFFF' : '#021744'
                }}
                onClick={() => {
                  setFocusedField('heightCm');
                  updateField('heightCm', item.cm);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Dynamic BMI Display Card (Asian Indian Standard) */}
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
            Asian Indian BMI Category Ranges
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
