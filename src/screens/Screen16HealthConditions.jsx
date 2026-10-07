import React from 'react';
import { Activity, Heart, Droplets, Pill, Wind, Brain, Sun, Stethoscope, MoreHorizontal, Check, ShieldCheck } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen16HealthConditions({ store, updateField, isDeveloperMode }) {
  const conditions = [
    { id: 'High blood pressure', icon: Activity, color: '#E02424', bg: '#FDF2F2' },
    { id: 'Heart disease', icon: Heart, color: '#E02424', bg: '#FDF2F2' },
    { id: 'Diabetes', icon: Droplets, color: '#7E3AF2', bg: '#F6F5FF' },
    { id: 'High cholesterol', icon: Pill, color: '#D97706', bg: '#FFFBEB' },
    { id: 'Thyroid problems', icon: Wind, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'Asthma or COPD', icon: Wind, color: '#059669', bg: '#ECFDF5' },
    { id: 'Stroke', icon: Brain, color: '#DC2626', bg: '#FEF2F2' },
    { id: 'Depression or anxiety', icon: Sun, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'Kidney disease', icon: Stethoscope, color: '#0D9488', bg: '#F0FDFA' },
    { id: 'Other', icon: MoreHorizontal, color: '#64748B', bg: '#F8FAFC' }
  ];

  const handleToggle = (id) => {
    let current = [...store.diagnosedConditions];
    current = current.filter(item => item !== 'None of these');
    if (current.includes(id)) {
      current = current.filter(item => item !== id);
    } else {
      current.push(id);
    }
    updateField('diagnosedConditions', current);
  };

  const handleNoneToggle = () => {
    if (store.diagnosedConditions.includes('None of these')) {
      updateField('diagnosedConditions', []);
    } else {
      updateField('diagnosedConditions', ['None of these']);
      updateField('otherConditionText', '');
    }
  };

  const isNoneSelected = store.diagnosedConditions.includes('None of these');

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 16 — Health conditions"
        title="Health conditions"
        caption="Has a doctor told you that you have any of these?&#10;Select any that apply."
        isDeveloperMode={isDeveloperMode}
      />

      {/* 2-Column Grid */}
      <div className="conditions-grid">
        {conditions.map((item) => {
          const isSelected = store.diagnosedConditions.includes(item.id);
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`condition-block ${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggle(item.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="condition-icon-badge" style={{ backgroundColor: item.bg, color: item.color }}>
                  <IconComponent size={20} />
                </div>
                <div className={`check-circle ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <Check size={12} strokeWidth={3} />}
                </div>
              </div>

              <div style={{ fontSize: 13, fontWeight: isSelected ? 800 : 700, color: 'var(--color-text-dark)', marginTop: 8 }}>
                {item.id}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-width "None of these" */}
      <div
        className={`multiselect-card ${isNoneSelected ? 'selected' : ''}`}
        style={{ marginBottom: 16 }}
        onClick={handleNoneToggle}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="condition-icon-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
            <ShieldCheck size={22} />
          </div>
          <span className="multiselect-card-title">None of these</span>
        </div>
        <div className={`check-circle ${isNoneSelected ? 'checked' : ''}`}>
          {isNoneSelected && <Check size={14} strokeWidth={3} />}
        </div>
      </div>

      {/* If "Other" selected, show text box */}
      {store.diagnosedConditions.includes('Other') && (
        <div className="anim-slide-leading" style={{ marginBottom: 16 }}>
          <label className="input-label" style={{ display: 'block', marginBottom: 6 }}>
            Please specify condition
          </label>
          <input
            type="text"
            className="text-input-field"
            placeholder="Enter your medical condition..."
            value={store.otherConditionText}
            onChange={(e) => updateField('otherConditionText', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
