import { useState, useMemo, useCallback } from 'react';

export const INITIAL_INTAKE_STATE = {
  isDeveloperMode: false,
  
  // Screen 2: About You
  name: '',
  age: 0, // 0 means unselected, displays as '--'
  sex: '', // unselected initially
  
  // Screen 3: Contact
  mobileNumber: '',
  email: '',
  centreCode: '',
  
  // Screen 4: Sleep Problems
  selectedSleepProblems: [],
  otherSleepProblemText: '',
  
  // Screen 5: Duration & Frequency
  timeToFallAsleepMinutes: 0,
  nocturnalAwakeningsCount: 0,
  sleepDurationHours: 0.0,
  
  // Screen 6: Breathing Part 1
  snoresWhenSleeping: null,
  snoringLoudOtherRoom: null,
  
  // Screen 7: Breathing Part 2 (While Asleep)
  wakesChokingGasping: null,
  stopBreathingNoticed: null,
  
  // Screen 8: Morning Feelings
  dryMouth: null,
  morningHeadache: null,
  
  // Screen 9: Daytime Affect
  drowsyDuringDay: null,
  tiredLowEnergy: null,
  affectsWorkOrDaily: null,
  
  // Screen 10: Daytime Naps
  takesNaps: null,
  napDurationMinutes: 0,
  
  // Screen 11: Driving Safety
  drivesVehicle: null,
  sleepyWhileDriving: null,
  sleepinessIncidentTypes: [],
  
  // Screen 12 & 13: Leg Sensations
  legsUncomfortableResting: null,
  legsWorseEvening: null,
  legsMovingHelps: null,
  legsNoOtherReason: null,
  
  // Screen 14: Health Conditions
  diagnosedConditions: [],
  otherConditionText: '',
  
  // Screens 15 & 16: Anthropometrics
  neckCircumferenceCm: 0,
  waistCircumferenceCm: 0,
  
  // Screen 17: Body Measurements
  weightKg: 0.0,
  heightCm: 0.0,
  
  // Screen 18: Blood Pressure
  bpSystolic: '',
  bpDiastolic: '',
  skippedBloodPressure: false,
  
  // Screens 19 through 23: Habits
  bedtime: '23:30',
  wakeTime: '07:00',
  cigarettesPerDay: 0,
  alcoholFrequency: '',
  caffeinatedDrinksPerDay: 0,
  lastCaffeineTime: '20:00',
  preBedtimeScreenMinutes: 30,
  worksNightShifts: null,
  occupation: '',
  otherOccupationText: ''
};

export const SCREENS = [
  { id: 'aboutYou', sectionNumber: 'SECTION 01', sectionTitle: 'ABOUT YOU', subtitle: 'Screen 2 — About you', progress: 0.05 },
  { id: 'contact', sectionNumber: 'SECTION 01', sectionTitle: 'ABOUT YOU', subtitle: 'Screen 3 — Contact', progress: 0.09 },
  { id: 'sleepProblems', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 4 — Sleep problems', progress: 0.14 },
  { id: 'sleepDurationFrequency', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 5 — Duration & pattern', progress: 0.18 },
  { id: 'breathingPart1', sectionNumber: 'SECTION 03', sectionTitle: 'BREATHING & SNORING', subtitle: 'Screen 6 — Snoring', progress: 0.23 },
  { id: 'breathingPart2', sectionNumber: 'SECTION 03', sectionTitle: 'BREATHING & SNORING', subtitle: 'Screen 7 — While asleep', progress: 0.27 },
  { id: 'morningFeelings', sectionNumber: 'SECTION 03', sectionTitle: 'BREATHING & SNORING', subtitle: 'Screen 8 — Morning feelings', progress: 0.32 },
  { id: 'daytimeAffect', sectionNumber: 'SECTION 04', sectionTitle: 'YOUR DAY', subtitle: 'Screen 9 — Daytime affect', progress: 0.36 },
  { id: 'dailyLifeNaps', sectionNumber: 'SECTION 04', sectionTitle: 'YOUR DAY', subtitle: 'Screen 10 — Daytime naps', progress: 0.41 },
  { id: 'drivingSafety', sectionNumber: 'SECTION 05', sectionTitle: 'DRIVING & SAFETY', subtitle: 'Screen 11 — Driving safety', progress: 0.45 },
  { id: 'legSensationsPart1', sectionNumber: 'SECTION 06', sectionTitle: 'LEG SENSATIONS', subtitle: 'Screen 12 — Leg sensations', progress: 0.50 },
  { id: 'legSensationsPart2', sectionNumber: 'SECTION 06', sectionTitle: 'LEG SENSATIONS', subtitle: 'Screen 13 — Leg relief', progress: 0.55 },
  { id: 'healthConditions', sectionNumber: 'SECTION 07', sectionTitle: 'HEALTH CONDITIONS', subtitle: 'Screen 14 — Diagnosed conditions', progress: 0.59 },
  { id: 'measureNeck', sectionNumber: 'SECTION 08', sectionTitle: 'MEASUREMENTS', subtitle: 'Screen 15 — Neck measurement', progress: 0.64 },
  { id: 'measureWaist', sectionNumber: 'SECTION 08', sectionTitle: 'MEASUREMENTS', subtitle: 'Screen 16 — Waist measurement', progress: 0.68 },
  { id: 'bodyMeasurements', sectionNumber: 'SECTION 09', sectionTitle: 'MEASUREMENTS', subtitle: 'Screen 17 — Body measurements', progress: 0.73 },
  { id: 'bloodPressure', sectionNumber: 'SECTION 10', sectionTitle: 'BLOOD PRESSURE', subtitle: 'Screen 18 — Blood pressure', progress: 0.77 },
  { id: 'sleepSchedule', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 19 — Sleep schedule', progress: 0.82 },
  { id: 'smokingAlcohol', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 20 — Smoking & alcohol', progress: 0.86 },
  { id: 'caffeine', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 21 — Caffeine intake', progress: 0.91 },
  { id: 'screenTime', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 22 — Screen exposure', progress: 0.95 },
  { id: 'work', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 23 — Work & shifts', progress: 1.0 }
];

export function useIntakeStore() {
  const [store, setStore] = useState(INITIAL_INTAKE_STATE);

  const updateField = useCallback((field, value) => {
    setStore(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetAll = useCallback(() => {
    setStore(INITIAL_INTAKE_STATE);
  }, []);

  const toggleDevMode = useCallback(() => {
    setStore(prev => ({ ...prev, isDeveloperMode: !prev.isDeveloperMode }));
  }, []);

  // Validation checks
  const isScreen2Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.name.trim().length > 0 && store.age > 0 && Boolean(store.sex);
  }, [store.isDeveloperMode, store.name, store.age, store.sex]);

  const isContactValid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    const hasValidPhone = store.mobileNumber.replace(/\D/g, '').length >= 10;
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email.trim());
    return hasValidPhone || hasValidEmail;
  }, [store.isDeveloperMode, store.mobileNumber, store.email]);

  const isScreen4Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.selectedSleepProblems.length === 0) return false;
    if (store.selectedSleepProblems.includes('Something else')) {
      return store.otherSleepProblemText.trim().length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.selectedSleepProblems, store.otherSleepProblemText]);

  const isScreen5Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.timeToFallAsleepMinutes > 0 && store.sleepDurationHours > 0.0;
  }, [store.isDeveloperMode, store.timeToFallAsleepMinutes, store.sleepDurationHours]);

  const isScreen6Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.snoresWhenSleeping === null) return false;
    if (store.snoresWhenSleeping === true) {
      return store.snoringLoudOtherRoom !== null;
    }
    return true;
  }, [store.isDeveloperMode, store.snoresWhenSleeping, store.snoringLoudOtherRoom]);

  const isScreen7Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.wakesChokingGasping !== null && store.stopBreathingNoticed !== null;
  }, [store.isDeveloperMode, store.wakesChokingGasping, store.stopBreathingNoticed]);

  const isScreen8Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.dryMouth !== null && store.morningHeadache !== null;
  }, [store.isDeveloperMode, store.dryMouth, store.morningHeadache]);

  const isScreen9Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.drowsyDuringDay !== null && store.tiredLowEnergy !== null && store.affectsWorkOrDaily !== null;
  }, [store.isDeveloperMode, store.drowsyDuringDay, store.tiredLowEnergy, store.affectsWorkOrDaily]);

  const isScreen10Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.takesNaps === null) return false;
    if (store.takesNaps === true) {
      return store.napDurationMinutes > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.takesNaps, store.napDurationMinutes]);

  const isScreen11Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.drivesVehicle === null) return false;
    if (store.drivesVehicle === false) return true;
    if (store.sleepyWhileDriving === null) return false;
    if (store.sleepyWhileDriving === true) {
      return store.sleepinessIncidentTypes.length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.drivesVehicle, store.sleepyWhileDriving, store.sleepinessIncidentTypes]);

  const isScreen12Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.legsUncomfortableResting === null) return false;
    if (store.legsUncomfortableResting === true) {
      return store.legsWorseEvening !== null;
    }
    return true;
  }, [store.isDeveloperMode, store.legsUncomfortableResting, store.legsWorseEvening]);

  const isScreen13Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.legsUncomfortableResting === false) return true;
    return store.legsMovingHelps !== null && store.legsNoOtherReason !== null;
  }, [store.isDeveloperMode, store.legsUncomfortableResting, store.legsMovingHelps, store.legsNoOtherReason]);

  const isScreen14Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.diagnosedConditions.length === 0) return false;
    if (store.diagnosedConditions.includes('Other')) {
      return store.otherConditionText.trim().length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.diagnosedConditions, store.otherConditionText]);

  const isScreen15Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.neckCircumferenceCm > 0;
  }, [store.isDeveloperMode, store.neckCircumferenceCm]);

  const isScreen16Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.waistCircumferenceCm > 0;
  }, [store.isDeveloperMode, store.waistCircumferenceCm]);

  const isScreen17Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.weightKg > 0 && store.heightCm > 0;
  }, [store.isDeveloperMode, store.weightKg, store.heightCm]);

  const isSystolicValid = useMemo(() => {
    if (store.bpSystolic.trim() === '') return true;
    const sys = Number(store.bpSystolic);
    return !isNaN(sys) && sys >= 90 && sys <= 200;
  }, [store.bpSystolic]);

  const isDiastolicValid = useMemo(() => {
    if (store.bpDiastolic.trim() === '') return true;
    const dia = Number(store.bpDiastolic);
    return !isNaN(dia) && dia >= 60 && dia <= 150;
  }, [store.bpDiastolic]);

  const isBloodPressurePlausible = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.skippedBloodPressure) return true;
    if (store.bpSystolic === '' && store.bpDiastolic === '') return true; // optional
    if (!isSystolicValid || !isDiastolicValid) return false;
    if (store.bpSystolic !== '' && store.bpDiastolic !== '') {
      return Number(store.bpSystolic) > Number(store.bpDiastolic);
    }
    return true;
  }, [store.isDeveloperMode, store.skippedBloodPressure, store.bpSystolic, store.bpDiastolic, isSystolicValid, isDiastolicValid]);

  const isScreen20Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return Boolean(store.alcoholFrequency);
  }, [store.isDeveloperMode, store.alcoholFrequency]);

  const isScreen23Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.worksNightShifts === null) return false;
    if (store.worksNightShifts === true) {
      if (!store.occupation) return false;
      if (store.occupation === 'Other') return store.otherOccupationText.trim().length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.worksNightShifts, store.occupation, store.otherOccupationText]);

  // BMI calculations
  const calculatedBMI = useMemo(() => {
    if (store.heightCm > 0 && store.weightKg > 0) {
      const hM = store.heightCm / 100.0;
      return Number((store.weightKg / (hM * hM)).toFixed(1));
    }
    return 0.0;
  }, [store.heightCm, store.weightKg]);

  const bmiCategoryInfo = useMemo(() => {
    if (calculatedBMI === 0.0) {
      return {
        name: 'Not calculated',
        bgColor: '#F8FAFC',
        textColor: '#64748B',
        accentColor: '#CBD5E1'
      };
    }
    if (calculatedBMI < 18.5) {
      return {
        name: 'Underweight',
        bgColor: '#EFF6FF',
        textColor: '#1D4ED8',
        accentColor: '#3B82F6'
      };
    }
    if (calculatedBMI <= 22.9) {
      return {
        name: 'Normal weight',
        bgColor: '#ECFDF5',
        textColor: '#047857',
        accentColor: '#10B981'
      };
    }
    if (calculatedBMI <= 24.9) {
      return {
        name: 'Overweight',
        bgColor: '#FFFBEB',
        textColor: '#B45309',
        accentColor: '#F59E0B'
      };
    }
    return {
      name: 'Obese',
      bgColor: '#FEF2F2',
      textColor: '#B91C1C',
      accentColor: '#EF4444'
    };
  }, [calculatedBMI]);

  return {
    store,
    updateField,
    resetAll,
    toggleDevMode,
    calculatedBMI,
    bmiCategoryInfo,
    validations: {
      isScreen2Valid,
      isContactValid,
      isScreen4Valid,
      isScreen5Valid,
      isScreen6Valid,
      isScreen7Valid,
      isScreen8Valid,
      isScreen9Valid,
      isScreen10Valid,
      isScreen11Valid,
      isScreen12Valid,
      isScreen13Valid,
      isScreen14Valid,
      isScreen15Valid,
      isScreen16Valid,
      isScreen17Valid,
      isSystolicValid,
      isDiastolicValid,
      isBloodPressurePlausible,
      isScreen20Valid,
      isScreen23Valid
    }
  };
}
