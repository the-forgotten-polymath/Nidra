import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { SCREENS } from '../store/intakeStore';

export default function QuestionnaireTopBar({
  currentScreenId,
  onBack
}) {
  const currentScreenIndex = SCREENS.findIndex(s => s.id === currentScreenId);
  const currentScreen = SCREENS[currentScreenIndex] || SCREENS[0];
  const progressPercent = Math.round((currentScreen?.progress || 0.05) * 100);

  // Color mappings matching iOS
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
      <div className="top-bar-nav-row">
        {/* Back Button */}
        <button
          type="button"
          className="back-circle-btn"
          onClick={onBack}
          aria-label="Previous screen"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Section Pill Badge */}
        <div className="category-badge-pill">
          <span
            className="badge-dot"
            style={{ backgroundColor: getDotColor(currentScreen.id) }}
          />
          <span>{currentScreen.sectionTitle}</span>
        </div>
      </div>

      {/* Fluid Liquid Progress Bar */}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
