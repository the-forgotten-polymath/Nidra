import { useState, useMemo, useCallback } from 'react';

export const INITIAL_INTAKE_STATE = {
  isDeveloperMode: false,
  language: 'en', // 'en' | 'hi'
  
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
  
  // Screen 5: Sleep Duration (Allows 0 hours)
  timeToFallAsleepMinutes: 0,
  nocturnalAwakeningsCount: 0,
  sleepDurationHours: 0.0,
  
  // Screen 6: Sleep Frequency
  sleepComplaintNightsPerWeek: -1, // -1 means unselected
  
  // Screen 7: Problem Duration
  problemDurationYears: 0,
  problemDurationMonths: 0,
  
  // Screen 8: Breathing Part 1 (Snoring)
  snoresWhenSleeping: null,
  snoringLoudOtherRoom: null,
  
  // Screen 9: Breathing Part 2 (While Asleep)
  wakesChokingGasping: null,
  stopBreathingNoticed: null,
  
  // Screen 10: Morning Feelings
  dryMouth: null,
  morningHeadache: null,
  
  // Screen 11: Daytime Affect
  drowsyDuringDay: null,
  tiredLowEnergy: null,
  affectsWorkOrDaily: null,
  
  // Screen 12: Daytime Naps
  takesNaps: null,
  napDurationMinutes: 0,
  
  // Screen 13: Driving Safety
  drivesVehicle: null,
  sleepyWhileDriving: null,
  sleepinessIncidentTypes: [],
  
  // Screen 14 & 15: Leg Sensations
  legsUncomfortableResting: null,
  legsWorseEvening: null,
  legsMovingHelps: null,
  legsNoOtherReason: null,
  
  // Screen 16: Health Conditions
  diagnosedConditions: [],
  otherConditionText: '',
  
  // Screens 17 & 18: Anthropometrics (No default pre-fills)
  neckCircumferenceCm: 0,
  waistCircumferenceCm: 0,
  
  // Screen 19: Body Measurements (Defaults: Height 150 cm, Weight 60 kg)
  heightCm: 150.0,
  weightKg: 60.0,
  weightGm: 0.0, // 0 to 900 gm
  
  // Screen 20: Blood Pressure
  bpSystolic: '',
  bpDiastolic: '',
  skippedBloodPressure: false,
  
  // Screen 21: Sleep Schedule (Weekdays & Weekends Separated + Night Sleep Hours 0 to --)
  weekdayBedtime: '23:00',
  weekdayWakeTime: '07:00',
  weekdaySleepHours: 0.0,
  weekendBedtime: '23:30',
  weekendWakeTime: '08:00',
  weekendSleepHours: 0.0,
  
  // Legacy
  bedtime: '23:00',
  wakeTime: '07:00',
  
  // Screen 22: Smoking & Alcohol (No default pre-fills)
  cigarettesPerDay: 0,
  alcoholFrequency: '',
  
  // Screen 23: Caffeine (No default pre-fills)
  caffeinatedDrinksPerDay: 0,
  lastCaffeineTime: '18:00',
  
  // Screen 24: Screen Time (Separated for TV, Phone, Computer, Other; all defaulting to 0)
  tvScreenMinutes: 0,
  phoneScreenMinutes: 0,
  computerScreenMinutes: 0,
  otherScreenMinutes: 0,
  preBedtimeScreenMinutes: 0,
  
  // Screen 25: Work (No default pre-fills)
  worksNightShifts: null,
  occupation: '',
  otherOccupationText: ''
};

export const SCREENS = [
  { id: 'aboutYou', sectionNumber: 'SECTION 01', sectionTitle: 'ABOUT YOU', subtitle: 'Screen 2 — About you', progress: 1 / 25 },
  { id: 'contact', sectionNumber: 'SECTION 01', sectionTitle: 'ABOUT YOU', subtitle: 'Screen 3 — Contact', progress: 2 / 25 },
  { id: 'sleepProblems', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 4 — Sleep problems', progress: 3 / 25 },
  { id: 'sleepDuration', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 5 — Sleep duration', progress: 4 / 25 },
  { id: 'sleepFrequency', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 6 — Sleep frequency', progress: 5 / 25 },
  { id: 'sleepHistory', sectionNumber: 'SECTION 02', sectionTitle: 'YOUR SLEEP', subtitle: 'Screen 7 — Problem duration', progress: 6 / 25 },
  { id: 'breathingPart1', sectionNumber: 'SECTION 03', sectionTitle: 'SNORING', subtitle: 'Screen 8 — Snoring', progress: 7 / 24 },
  { id: 'breathingPart2', sectionNumber: 'SECTION 03', sectionTitle: 'SNORING', subtitle: 'Screen 9 — While asleep', progress: 8 / 24 },
  { id: 'daytimeAffect', sectionNumber: 'SECTION 04', sectionTitle: 'YOUR DAY', subtitle: 'Screen 10 — Daytime affect', progress: 9 / 24 },
  { id: 'dailyLifeNaps', sectionNumber: 'SECTION 04', sectionTitle: 'YOUR DAY', subtitle: 'Screen 12 — Daytime naps', progress: 11 / 25 },
  { id: 'drivingSafety', sectionNumber: 'SECTION 05', sectionTitle: 'DRIVING & SAFETY', subtitle: 'Screen 13 — Driving safety', progress: 12 / 25 },
  { id: 'legSensationsPart1', sectionNumber: 'SECTION 06', sectionTitle: 'LEG SENSATIONS', subtitle: 'Screen 14 — Leg sensations', progress: 13 / 25 },
  { id: 'legSensationsPart2', sectionNumber: 'SECTION 06', sectionTitle: 'LEG SENSATIONS', subtitle: 'Screen 15 — Leg relief', progress: 14 / 25 },
  { id: 'healthConditions', sectionNumber: 'SECTION 07', sectionTitle: 'HEALTH CONDITIONS', subtitle: 'Screen 16 — Diagnosed conditions', progress: 15 / 25 },
  { id: 'measureNeck', sectionNumber: 'SECTION 08', sectionTitle: 'MEASUREMENTS', subtitle: 'Screen 17 — Neck measurement', progress: 16 / 25 },
  { id: 'measureWaist', sectionNumber: 'SECTION 08', sectionTitle: 'MEASUREMENTS', subtitle: 'Screen 18 — Waist measurement', progress: 17 / 25 },
  { id: 'bodyMeasurements', sectionNumber: 'SECTION 09', sectionTitle: 'BODY MEASUREMENTS', subtitle: 'Screen 19 — Body measurements', progress: 18 / 25 },
  { id: 'bloodPressure', sectionNumber: 'SECTION 10', sectionTitle: 'BLOOD PRESSURE', subtitle: 'Screen 20 — Blood pressure', progress: 19 / 25 },
  { id: 'sleepSchedule', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 21 — Sleep schedule', progress: 20 / 25 },
  { id: 'smokingAlcohol', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 22 — Smoking & alcohol', progress: 21 / 25 },
  { id: 'caffeine', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 23 — Caffeine intake', progress: 22 / 25 },
  { id: 'screenTime', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 24 — Screen exposure', progress: 23 / 26 },
  { id: 'preBedtimeScreen', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 24B — Pre-bedtime screen', progress: 24 / 26 },
  { id: 'work', sectionNumber: 'SECTION 11', sectionTitle: 'DAILY HABITS', subtitle: 'Screen 25 — Work & shifts', progress: 25 / 26 },
  { id: 'reviewReadings', sectionNumber: 'SECTION 12', sectionTitle: 'REVIEW READINGS', subtitle: 'Screen 26 — Review & Submit', progress: 1.0 }
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

  const toggleLanguage = useCallback(() => {
    setStore(prev => ({ ...prev, language: prev.language === 'en' ? 'hi' : 'en' }));
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
    return store.sleepDurationHours >= 0.0;
  }, [store.isDeveloperMode, store.sleepDurationHours]);

  const isScreen6Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.sleepComplaintNightsPerWeek >= 0;
  }, [store.isDeveloperMode, store.sleepComplaintNightsPerWeek]);

  const isScreen7Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.problemDurationYears > 0 || store.problemDurationMonths > 0;
  }, [store.isDeveloperMode, store.problemDurationYears, store.problemDurationMonths]);

  const isScreen8Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.snoresWhenSleeping === null) return false;
    if (store.snoresWhenSleeping === true) {
      return store.snoringLoudOtherRoom !== null;
    }
    return true;
  }, [store.isDeveloperMode, store.snoresWhenSleeping, store.snoringLoudOtherRoom]);

  const isScreen9Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.wakesChokingGasping !== null && store.stopBreathingNoticed !== null;
  }, [store.isDeveloperMode, store.wakesChokingGasping, store.stopBreathingNoticed]);

  const isScreen10Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.dryMouth !== null && store.morningHeadache !== null;
  }, [store.isDeveloperMode, store.dryMouth, store.morningHeadache]);

  const isScreen11Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.drowsyDuringDay !== null && store.tiredLowEnergy !== null && store.affectsWorkOrDaily !== null;
  }, [store.isDeveloperMode, store.drowsyDuringDay, store.tiredLowEnergy, store.affectsWorkOrDaily]);

  const isScreen12Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.takesNaps === null) return false;
    if (store.takesNaps === true) {
      return store.napDurationMinutes > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.takesNaps, store.napDurationMinutes]);

  const isScreen13Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.drivesVehicle === null) return false;
    if (store.drivesVehicle === false) return true;
    if (store.sleepyWhileDriving === null) return false;
    if (store.sleepyWhileDriving === true) {
      return store.sleepinessIncidentTypes.length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.drivesVehicle, store.sleepyWhileDriving, store.sleepinessIncidentTypes]);

  const isScreen14Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.legsUncomfortableResting === null) return false;
    if (store.legsUncomfortableResting === true) {
      return store.legsWorseEvening !== null;
    }
    return true;
  }, [store.isDeveloperMode, store.legsUncomfortableResting, store.legsWorseEvening]);

  const isScreen15Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.legsUncomfortableResting === false) return true;
    return store.legsMovingHelps !== null && store.legsNoOtherReason !== null;
  }, [store.isDeveloperMode, store.legsUncomfortableResting, store.legsMovingHelps, store.legsNoOtherReason]);

  const isScreen16Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.diagnosedConditions.length === 0) return false;
    if (store.diagnosedConditions.includes('Other')) {
      return store.otherConditionText.trim().length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.diagnosedConditions, store.otherConditionText]);

  const isScreen17Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.neckCircumferenceCm > 0;
  }, [store.isDeveloperMode, store.neckCircumferenceCm]);

  const isScreen18Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return store.waistCircumferenceCm > 0;
  }, [store.isDeveloperMode, store.waistCircumferenceCm]);

  // Total weight including grams
  const totalWeightKg = useMemo(() => {
    return Number(((store.weightKg || 0) + ((store.weightGm || 0) / 1000.0)).toFixed(2));
  }, [store.weightKg, store.weightGm]);

  // Height feet and inches
  const heightFeet = useMemo(() => {
    if (!store.heightCm || store.heightCm <= 0) return 0;
    const totalInches = store.heightCm / 2.54;
    return Math.floor(totalInches / 12);
  }, [store.heightCm]);

  const heightInches = useMemo(() => {
    if (!store.heightCm || store.heightCm <= 0) return 0;
    const totalInches = Math.round(store.heightCm / 2.54);
    return totalInches % 12;
  }, [store.heightCm]);

  const isScreen19Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return totalWeightKg >= 20.0 && store.heightCm >= 50.0;
  }, [store.isDeveloperMode, totalWeightKg, store.heightCm]);

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
    return store.skippedBloodPressure || isBloodPressurePlausible;
  }, [store.isDeveloperMode, store.skippedBloodPressure, isBloodPressurePlausible]);

  const isScreen22Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    return Boolean(store.alcoholFrequency);
  }, [store.isDeveloperMode, store.alcoholFrequency]);

  const totalPreBedtimeScreenMinutes = useMemo(() => {
    return (Number(store.tvScreenMinutes) || 0) +
           (Number(store.phoneScreenMinutes) || 0) +
           (Number(store.computerScreenMinutes) || 0) +
           (Number(store.otherScreenMinutes) || 0);
  }, [store.tvScreenMinutes, store.phoneScreenMinutes, store.computerScreenMinutes, store.otherScreenMinutes]);

  const isScreen25Valid = useMemo(() => {
    if (store.isDeveloperMode) return true;
    if (store.worksNightShifts === null) return false;
    if (store.worksNightShifts === true) {
      if (!store.occupation) return false;
      if (store.occupation === 'Other') return store.otherOccupationText.trim().length > 0;
    }
    return true;
  }, [store.isDeveloperMode, store.worksNightShifts, store.occupation, store.otherOccupationText]);

  // BMI calculations (Asian Indian Standard)
  const calculatedBMI = useMemo(() => {
    if (store.heightCm > 0 && totalWeightKg > 0) {
      const hM = store.heightCm / 100.0;
      return Number((totalWeightKg / (hM * hM)).toFixed(1));
    }
    return 0.0;
  }, [store.heightCm, totalWeightKg]);

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
        name: 'Normal weight (Asian Indian Standard)',
        bgColor: '#ECFDF5',
        textColor: '#047857',
        accentColor: '#10B981'
      };
    }
    if (calculatedBMI <= 24.9) {
      return {
        name: 'Overweight (Asian Indian Standard)',
        bgColor: '#FFFBEB',
        textColor: '#B45309',
        accentColor: '#F59E0B'
      };
    }
    return {
      name: 'Obese (Asian Indian Standard)',
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
    toggleLanguage,
    totalWeightKg,
    heightFeet,
    heightInches,
    totalPreBedtimeScreenMinutes,
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
      isScreen18Valid,
      isScreen19Valid,
      isSystolicValid,
      isDiastolicValid,
      isBloodPressurePlausible,
      isScreen20Valid,
      isScreen22Valid,
      isScreen25Valid
    }
  };
}
