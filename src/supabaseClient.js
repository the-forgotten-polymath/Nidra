import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://notruxpxeqcbfiysvtum.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vdHJ1eHB4ZXFjYmZpeXN2dHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMTY3NTYsImV4cCI6MjEwNTc5Mjc1Nn0.f6XnqidQ0koZ4ztIw1JK1dJUuPO6XvL5mWSg4OijT64';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Format and submit sleep assessment record to Supabase
 * @param {Object} store 
 * @returns {Promise<{data: any, error: any}>}
 */
export async function submitSleepAssessment(store) {
  try {
    const insomniaLevel = (store.sleepComplaintNightsPerWeek > 3 || store.timeToFallAsleepMinutes >= 30 || store.nocturnalAwakeningsCount >= 3)
      ? 'Elevated'
      : (store.timeToFallAsleepMinutes >= 20 || store.nocturnalAwakeningsCount >= 2 ? 'Moderate' : 'Low');

    const totalScreen = (Number(store.tvScreenMinutes) || 0) +
      (Number(store.phoneScreenMinutes) || 0) +
      (Number(store.computerScreenMinutes) || 0) +
      (Number(store.otherScreenMinutes) || 0);

    const payload = {
      patient_name: store.name?.trim() || 'Anonymous Patient',
      age: Number(store.age) || 0,
      sex: store.sex || 'Male',
      mobile_number: store.mobileNumber?.trim() ? `+91${store.mobileNumber.trim()}` : null,
      email: store.email?.trim() || null,
      centre_code: store.centreCode?.trim() || null,
      
      // Screen 4 & 5
      selected_sleep_problems: store.selectedSleepProblems || [],
      other_sleep_problem_text: store.otherSleepProblemText?.trim() || null,
      time_to_fall_asleep_minutes: Number(store.timeToFallAsleepMinutes) || 0,
      nocturnal_awakenings_count: Number(store.nocturnalAwakeningsCount) || 0,
      sleep_duration_hours: Number(store.sleepDurationHours) || 0.0,
      sleep_complaint_nights_per_week: Number(store.sleepComplaintNightsPerWeek) >= 0 ? Math.min(7, Math.max(0, Number(store.sleepComplaintNightsPerWeek))) : 0,
      problem_duration_years: Number(store.problemDurationYears) || 0,
      problem_duration_months: Number(store.problemDurationMonths) || 0,
      
      // Screens 8, 9, 10
      snores_when_sleeping: store.snoresWhenSleeping ?? false,
      snoring_loud_other_room: store.snoringLoudOtherRoom ?? false,
      wakes_choking_gasping: store.wakesChokingGasping ?? false,
      stop_breathing_noticed: store.stopBreathingNoticed ?? false,
      dry_mouth: store.dryMouth ?? false,
      morning_headache: store.morningHeadache ?? false,
      
      // Screens 11, 12
      drowsy_during_day: store.drowsyDuringDay ?? false,
      tired_low_energy: store.tiredLowEnergy ?? false,
      affects_work_or_daily: store.affectsWorkOrDaily ?? false,
      takes_naps: store.takesNaps ?? false,
      nap_duration_minutes: Number(store.napDurationMinutes) || 0,
      
      // Screen 13
      drives_vehicle: store.drivesVehicle ?? false,
      sleepy_while_driving: store.sleepyWhileDriving ?? false,
      sleepiness_incident_types: store.sleepinessIncidentTypes || [],
      
      // Screens 14, 15
      legs_uncomfortable_resting: store.legsUncomfortableResting ?? false,
      legs_worse_evening: store.legsWorseEvening ?? false,
      legs_moving_helps: store.legsMovingHelps ?? false,
      legs_no_other_reason: store.legsNoOtherReason ?? false,
      
      // Screen 16
      diagnosed_conditions: store.diagnosedConditions || [],
      other_condition_text: store.otherConditionText?.trim() || null,
      
      // Screens 17, 18, 19
      neck_circumference_cm: store.neckCircumferenceCm > 0 ? Number(store.neckCircumferenceCm) : null,
      waist_circumference_cm: store.waistCircumferenceCm > 0 ? Number(store.waistCircumferenceCm) : null,
      weight_kg: Number(store.weightKg) || 60.0,
      weight_gm: Number(store.weightGm) || 0.0,
      height_cm: Number(store.heightCm) || 150.0,
      
      // Screen 20
      bp_systolic: (!store.skippedBloodPressure && store.bpSystolic) ? Number(store.bpSystolic) : null,
      bp_diastolic: (!store.skippedBloodPressure && store.bpDiastolic) ? Number(store.bpDiastolic) : null,
      skipped_blood_pressure: Boolean(store.skippedBloodPressure),
      
      // Screen 21 (Sleep schedule)
      weekday_bedtime: store.weekdayBedtime ? `${store.weekdayBedtime}:00` : '23:00:00',
      weekday_wake_time: store.weekdayWakeTime ? `${store.weekdayWakeTime}:00` : '07:00:00',
      weekday_sleep_hours: Number(store.weekdaySleepHours) || 0.0,
      weekend_bedtime: store.weekendBedtime ? `${store.weekendBedtime}:00` : '23:30:00',
      weekend_wake_time: store.weekendWakeTime ? `${store.weekendWakeTime}:00` : '08:00:00',
      weekend_sleep_hours: Number(store.weekendSleepHours) || 0.0,
      usual_bedtime: store.weekdayBedtime ? `${store.weekdayBedtime}:00` : (store.bedtime ? `${store.bedtime}:00` : '23:00:00'),
      usual_wake_time: store.weekdayWakeTime ? `${store.weekdayWakeTime}:00` : (store.wakeTime ? `${store.wakeTime}:00` : '07:00:00'),
      
      // Screen 22, 23
      cigarettes_per_day: Number(store.cigarettesPerDay) || 0,
      alcohol_frequency: store.alcoholFrequency || '',
      caffeinated_drinks_per_day: Number(store.caffeinatedDrinksPerDay) || 0,
      last_caffeine_time: store.lastCaffeineTime ? `${store.lastCaffeineTime}:00` : '18:00:00',
      
      // Screen 24
      tv_screen_minutes: Number(store.tvScreenMinutes) || 0,
      phone_screen_minutes: Number(store.phoneScreenMinutes) || 0,
      computer_screen_minutes: Number(store.computerScreenMinutes) || 0,
      other_screen_minutes: Number(store.otherScreenMinutes) || 0,
      total_pre_bedtime_screen_minutes: Math.max(0, totalScreen),
      pre_bedtime_screen_minutes: Math.min(60, Math.max(0, totalScreen)),
      
      // Screen 25
      works_night_shifts: store.worksNightShifts ?? false,
      occupation: store.occupation || '',
      other_occupation_text: store.otherOccupationText?.trim() || null,
      
      // Screen 26
      insomnia_risk_level: insomniaLevel,
      status: 'completed'
    };

    const { data, error } = await supabase
      .from('sleep_assessments')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error during Supabase submission:', err);
    return { data: null, error: err };
  }
}
