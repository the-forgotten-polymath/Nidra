import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useIntakeStore, SCREENS } from './store/intakeStore';

// Components
import QuestionnaireTopBar from './components/QuestionnaireTopBar';
import WelcomeScreen from './components/WelcomeScreen';
import ThankYouScreen from './components/ThankYouScreen';

// Screens
import Screen2AboutYou from './screens/Screen2AboutYou';
import Screen3Contact from './screens/Screen3Contact';
import Screen4SleepProblems from './screens/Screen4SleepProblems';
import Screen5DurationFrequency from './screens/Screen5DurationFrequency';
import Screen6Breathing from './screens/Screen6Breathing';
import Screen7WhileAsleep from './screens/Screen7WhileAsleep';
import Screen8MorningFeelings from './screens/Screen8MorningFeelings';
import Screen9DaytimeAffect from './screens/Screen9DaytimeAffect';
import Screen10DailyLifeNaps from './screens/Screen10DailyLifeNaps';
import Screen11DrivingSafety from './screens/Screen11DrivingSafety';
import Screen12LegSensations from './screens/Screen12LegSensations';
import Screen13LegRelief from './screens/Screen13LegRelief';
import Screen14HealthConditions from './screens/Screen14HealthConditions';
import Screen15NeckMeasurement from './screens/Screen15NeckMeasurement';
import Screen16WaistMeasurement from './screens/Screen16WaistMeasurement';
import Screen17BodyMeasurements from './screens/Screen17BodyMeasurements';
import Screen18BloodPressure from './screens/Screen18BloodPressure';
import Screen19SleepSchedule from './screens/Screen19SleepSchedule';
import Screen20SmokingAlcohol from './screens/Screen20SmokingAlcohol';
import Screen21Caffeine from './screens/Screen21Caffeine';
import Screen22ScreenTime from './screens/Screen22ScreenTime';
import Screen23Work from './screens/Screen23Work';

export default function App() {
  const [isShowingWelcome, setIsShowingWelcome] = useState(true);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    store,
    updateField,
    resetAll,
    toggleDevMode,
    calculatedBMI,
    bmiCategoryInfo,
    validations
  } = useIntakeStore();

  const currentScreen = SCREENS[currentScreenIndex] || SCREENS[0];

  // Navigation handlers
  const handleNext = () => {
    if (currentScreenIndex + 1 < SCREENS.length) {
      setCurrentScreenIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (isCompleted) {
      setIsCompleted(false);
      setCurrentScreenIndex(SCREENS.length - 1);
    } else if (currentScreenIndex > 0) {
      setCurrentScreenIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsShowingWelcome(true);
    }
  };

  const handleSelectScreen = (screenId) => {
    const idx = SCREENS.findIndex(s => s.id === screenId);
    if (idx !== -1) {
      setIsCompleted(false);
      setCurrentScreenIndex(idx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check whether current screen continue button should be enabled
  const isContinueEnabled = () => {
    if (store.isDeveloperMode) return true;

    switch (currentScreen.id) {
      case 'aboutYou':
        return validations.isScreen2Valid;
      case 'contact':
        return validations.isContactValid;
      case 'sleepProblems':
        return validations.isScreen4Valid;
      case 'sleepDurationFrequency':
        return validations.isScreen5Valid;
      case 'breathingPart1':
        return validations.isScreen6Valid;
      case 'breathingPart2':
        return validations.isScreen7Valid;
      case 'morningFeelings':
        return validations.isScreen8Valid;
      case 'daytimeAffect':
        return validations.isScreen9Valid;
      case 'dailyLifeNaps':
        return validations.isScreen10Valid;
      case 'drivingSafety':
        return validations.isScreen11Valid;
      case 'legSensationsPart1':
        return validations.isScreen12Valid;
      case 'legSensationsPart2':
        return validations.isScreen13Valid;
      case 'healthConditions':
        return validations.isScreen14Valid;
      case 'measureNeck':
        return validations.isScreen15Valid;
      case 'measureWaist':
        return validations.isScreen16Valid;
      case 'bodyMeasurements':
        return validations.isScreen17Valid;
      case 'bloodPressure':
        return validations.isBloodPressurePlausible;
      case 'sleepSchedule':
        return true;
      case 'smokingAlcohol':
        return validations.isScreen20Valid;
      case 'caffeine':
        return true;
      case 'screenTime':
        return true;
      case 'work':
        return validations.isScreen23Valid;
      default:
        return true;
    }
  };

  return (
    <div className={`app-viewport-wrapper ${isShowingWelcome ? 'welcome-mode' : ''}`}>
      <div className="mobile-app-container">
        {/* Welcome / Splash Screen */}
        {isShowingWelcome ? (
          <WelcomeScreen onStart={() => setIsShowingWelcome(false)} />
        ) : isCompleted ? (
          /* Thank You Screen */
          <ThankYouScreen
            store={store}
            calculatedBMI={calculatedBMI}
            bmiCategoryInfo={bmiCategoryInfo}
            onNewAssessment={() => {
              resetAll();
              setCurrentScreenIndex(0);
              setIsCompleted(false);
              setIsShowingWelcome(false);
            }}
          />
        ) : (
          /* Questionnaire Screens */
          <>
            {/* Sticky Navigation Bar */}
            <QuestionnaireTopBar
              currentScreenId={currentScreen.id}
              onBack={handleBack}
            />

            {/* Screen Content */}
            {currentScreen.id === 'aboutYou' && (
              <Screen2AboutYou
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
                onContinue={handleNext}
              />
            )}
            {currentScreen.id === 'contact' && (
              <Screen3Contact
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'sleepProblems' && (
              <Screen4SleepProblems
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'sleepDurationFrequency' && (
              <Screen5DurationFrequency
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'breathingPart1' && (
              <Screen6Breathing
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'breathingPart2' && (
              <Screen7WhileAsleep
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'morningFeelings' && (
              <Screen8MorningFeelings
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'daytimeAffect' && (
              <Screen9DaytimeAffect
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'dailyLifeNaps' && (
              <Screen10DailyLifeNaps
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'drivingSafety' && (
              <Screen11DrivingSafety
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'legSensationsPart1' && (
              <Screen12LegSensations
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'legSensationsPart2' && (
              <Screen13LegRelief
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'healthConditions' && (
              <Screen14HealthConditions
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'measureNeck' && (
              <Screen15NeckMeasurement
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'measureWaist' && (
              <Screen16WaistMeasurement
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'bodyMeasurements' && (
              <Screen17BodyMeasurements
                store={store}
                updateField={updateField}
                calculatedBMI={calculatedBMI}
                bmiCategoryInfo={bmiCategoryInfo}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'bloodPressure' && (
              <Screen18BloodPressure
                store={store}
                updateField={updateField}
                validations={validations}
                isDeveloperMode={store.isDeveloperMode}
                onContinue={handleNext}
              />
            )}
            {currentScreen.id === 'sleepSchedule' && (
              <Screen19SleepSchedule
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'smokingAlcohol' && (
              <Screen20SmokingAlcohol
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'caffeine' && (
              <Screen21Caffeine
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'screenTime' && (
              <Screen22ScreenTime
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'work' && (
              <Screen23Work
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}

            {/* Pinned Bottom Continue Button */}
            <div className="bottom-pinned-bar">
              <button
                type="button"
                className="primary-continue-btn"
                disabled={!isContinueEnabled()}
                onClick={handleNext}
              >
                <span>Continue</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
