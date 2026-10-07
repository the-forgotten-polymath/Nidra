import React from 'react';
import { ChevronLeft, Globe } from 'lucide-react';
import { SCREENS } from '../store/intakeStore';

export default function QuestionnaireTopBar({
  currentScreenId,
  onBack,
  language = 'en',
  onToggleLanguage
}) {
  const currentScreenIndex = SCREENS.findIndex(s => s.id === currentScreenId);
  const currentScreen = SCREENS[currentScreenIndex] || SCREENS[0];
  const progressPercent = Math.round((currentScreen?.progress || 0.05) * 100);

  // Color mappings matching iOS design
  const getDotColor = (id) => {
    switch (id) {
      case 'aboutYou':
      case 'contact':
      case 'sleepProblems':
      case 'sleepDurationFrequency':
      case 'legSensationsPart1':
      case 'legSensationsPart2':
        return '#6C5CE7';
      case 'breathingPart1':
      case 'breathingPart2':
      case 'measureNeck':
      case 'measureWaist':
      case 'bodyMeasurements':
        return '#A29BFE';
      case 'daytimeAffect':
      case 'dailyLifeNaps':
      case 'sleepSchedule':
      case 'smokingAlcohol':
      case 'caffeine':
      case 'screenTime':
      case 'work':
        return '#FDA7DF';
      case 'healthConditions':
        return '#74B9FF';
      case 'drivingSafety':
      case 'bloodPressure':
        return '#DC2626';
      default:
        return '#6C5CE7';
    }
  };

  return (
    <div className="questionnaire-top-bar">
      <div className="top-bar-nav-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Left Side: Back Button & Section Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className="back-circle-btn"
            onClick={onBack}
            aria-label="Previous screen"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          <div className="category-badge-pill">
            <span
              className="badge-dot"
              style={{ backgroundColor: getDotColor(currentScreen.id) }}
            />
            <span>{currentScreen.sectionTitle}</span>
          </div>
        </div>

        {/* Center: Top Center Branding */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: '#043CA0', letterSpacing: -0.5 }}>
          Nidra
        </div>

        {/* Right Side: Language Toggle (English / Hindi) */}
        <button
          type="button"
          onClick={onToggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '5px 10px',
            borderRadius: 20,
            background: '#FFFFFF',
            border: '1.5px solid #043CA0',
            color: '#043CA0',
            fontSize: 11,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Toggle Language"
        >
          <Globe size={14} strokeWidth={2.5} />
          <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
        </button>
      </div>

      {/* Fluid Liquid Progress Bar */}
      <div className="progress-track" style={{ marginTop: 10 }}>
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
