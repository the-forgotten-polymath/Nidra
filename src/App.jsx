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
import Screen5SleepDuration from './screens/Screen5SleepDuration';
import Screen6SleepFrequency from './screens/Screen6SleepFrequency';
import Screen7SleepHistory from './screens/Screen7SleepHistory';
import Screen8Breathing from './screens/Screen8Breathing';
import Screen9WhileAsleep from './screens/Screen9WhileAsleep';
import Screen11DaytimeAffect from './screens/Screen11DaytimeAffect';
import Screen12DailyLifeNaps from './screens/Screen12DailyLifeNaps';
import Screen13DrivingSafety from './screens/Screen13DrivingSafety';
import Screen14LegSensations from './screens/Screen14LegSensations';
import Screen15LegRelief from './screens/Screen15LegRelief';
import Screen16HealthConditions from './screens/Screen16HealthConditions';
import Screen17NeckMeasurement from './screens/Screen17NeckMeasurement';
import Screen18WaistMeasurement from './screens/Screen18WaistMeasurement';
import Screen19BodyMeasurements from './screens/Screen19BodyMeasurements';
import Screen20BloodPressure from './screens/Screen20BloodPressure';
import Screen21SleepSchedule from './screens/Screen21SleepSchedule';
import Screen22SmokingAlcohol from './screens/Screen22SmokingAlcohol';
import Screen23Caffeine from './screens/Screen23Caffeine';
import Screen24ScreenTime from './screens/Screen24ScreenTime';
import Screen24PreBedtimeScreen from './screens/Screen24PreBedtimeScreen';
import Screen25Work from './screens/Screen25Work';
import Screen26AssessmentResults from './screens/Screen26AssessmentResults';

export default function App() {
  const [isShowingWelcome, setIsShowingWelcome] = useState(true);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    store,
    updateField,
    resetAll,
    toggleDevMode,
    totalWeightKg,
    heightFeet,
    heightInches,
    totalPreBedtimeScreenMinutes,
    calculatedBMI,
    bmiCategoryInfo,
    validations
  } = useIntakeStore();

  const currentScreen = SCREENS[currentScreenIndex] || SCREENS[0];

  // Navigation handlers
  const handleNext = () => {
    // Restless legs bypass condition
    if (currentScreen.id === 'legSensationsPart1' && store.legsUncomfortableResting === false) {
      const healthIdx = SCREENS.findIndex(s => s.id === 'healthConditions');
      if (healthIdx !== -1) {
        setCurrentScreenIndex(healthIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

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
    } else if (currentScreen.id === 'healthConditions' && store.legsUncomfortableResting === false) {
      const leg1Idx = SCREENS.findIndex(s => s.id === 'legSensationsPart1');
      if (leg1Idx !== -1) {
        setCurrentScreenIndex(leg1Idx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
      case 'sleepDuration':
        return validations.isScreen5Valid;
      case 'sleepFrequency':
        return validations.isScreen6Valid;
      case 'sleepHistory':
        return validations.isScreen7Valid;
      case 'breathingPart1':
        return validations.isScreen8Valid;
      case 'breathingPart2':
        return validations.isScreen9Valid;
      case 'daytimeAffect':
        return validations.isScreen11Valid;
      case 'dailyLifeNaps':
        return validations.isScreen12Valid;
      case 'drivingSafety':
        return validations.isScreen13Valid;
      case 'legSensationsPart1':
        return validations.isScreen14Valid;
      case 'legSensationsPart2':
        return validations.isScreen15Valid;
      case 'healthConditions':
        return validations.isScreen16Valid;
      case 'measureNeck':
        return validations.isScreen17Valid;
      case 'measureWaist':
        return validations.isScreen18Valid;
      case 'bodyMeasurements':
        return validations.isScreen19Valid;
      case 'bloodPressure':
        return validations.isScreen20Valid;
      case 'sleepSchedule':
        return true;
      case 'smokingAlcohol':
        return validations.isScreen22Valid;
      case 'caffeine':
        return true;
      case 'screenTime':
        return true;
      case 'work':
        return validations.isScreen25Valid;
      case 'assessmentResults':
        return true;
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
            {currentScreen.id === 'sleepDuration' && (
              <Screen5SleepDuration
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'sleepFrequency' && (
              <Screen6SleepFrequency
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'sleepHistory' && (
              <Screen7SleepHistory
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'breathingPart1' && (
              <Screen8Breathing
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'breathingPart2' && (
              <Screen9WhileAsleep
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'daytimeAffect' && (
              <Screen11DaytimeAffect
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'dailyLifeNaps' && (
              <Screen12DailyLifeNaps
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'drivingSafety' && (
              <Screen13DrivingSafety
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'legSensationsPart1' && (
              <Screen14LegSensations
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'legSensationsPart2' && (
              <Screen15LegRelief
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'healthConditions' && (
              <Screen16HealthConditions
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'measureNeck' && (
              <Screen17NeckMeasurement
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'measureWaist' && (
              <Screen18WaistMeasurement
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'bodyMeasurements' && (
              <Screen19BodyMeasurements
                store={store}
                updateField={updateField}
                totalWeightKg={totalWeightKg}
                heightFeet={heightFeet}
                heightInches={heightInches}
                calculatedBMI={calculatedBMI}
                bmiCategoryInfo={bmiCategoryInfo}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'bloodPressure' && (
              <Screen20BloodPressure
                store={store}
                updateField={updateField}
                validations={validations}
                isDeveloperMode={store.isDeveloperMode}
                onContinue={handleNext}
              />
            )}
            {currentScreen.id === 'sleepSchedule' && (
              <Screen21SleepSchedule
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'smokingAlcohol' && (
              <Screen22SmokingAlcohol
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'caffeine' && (
              <Screen23Caffeine
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'screenTime' && (
              <Screen24ScreenTime
                store={store}
                updateField={updateField}
                totalPreBedtimeScreenMinutes={totalPreBedtimeScreenMinutes}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'preBedtimeScreen' && (
              <Screen24PreBedtimeScreen
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'work' && (
              <Screen25Work
                store={store}
                updateField={updateField}
                isDeveloperMode={store.isDeveloperMode}
              />
            )}
            {currentScreen.id === 'reviewReadings' && (
              <Screen26AssessmentResults
                store={store}
                updateField={updateField}
                totalWeightKg={totalWeightKg}
                heightFeet={heightFeet}
                heightInches={heightInches}
                totalPreBedtimeScreenMinutes={totalPreBedtimeScreenMinutes}
                calculatedBMI={calculatedBMI}
                bmiCategoryInfo={bmiCategoryInfo}
                onContinue={handleNext}
                onBack={handleBack}
                onNavigateToScreen={handleSelectScreen}
              />
            )}

            {/* Pinned Bottom Continue Button (Hidden on Review Readings Screen since it has sliding submit handle) */}
            {currentScreen.id !== 'reviewReadings' && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
