import React, { useState, useRef, useEffect } from 'react';
import { Pencil, CheckCircle2, ArrowRight, ChevronRight, Save, X, Plus, Minus, User, Bed, Wind, Activity, Sparkles } from 'lucide-react';

export default function Screen26AssessmentResults({ 
  store, 
  updateField,
  totalWeightKg, 
  heightFeet, 
  heightInches, 
  totalPreBedtimeScreenMinutes, 
  calculatedBMI, 
  bmiCategoryInfo, 
  onContinue, 
  onBack,
  onNavigateToScreen
}) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editingSection, setEditingSection] = useState(null); // 'personal' | 'sleep' | 'breathing' | 'body' | 'lifestyle' | null
  
  const holdTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const holdStartTimeRef = useRef(0);
  const HOLD_DURATION_MS = 1000; // Hold 1 sec to submit

  // Hypertension Flag: Systolic > 140 AND Diastolic > 90 AND History of Hypertension
  const isHypertensive = React.useMemo(() => {
    const sys = Number(store.bpSystolic);
    const dia = Number(store.bpDiastolic);
    const hasHistory = store.diagnosedConditions?.some(c => 
      c.includes('High blood pressure') || c.includes('Hypertension')
    );
    return sys > 140 && dia > 90 && Boolean(hasHistory);
  }, [store.bpSystolic, store.bpDiastolic, store.diagnosedConditions]);

  const triggerSubmit = () => {
    setIsSubmitted(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([60, 40, 80]);
    }
    setTimeout(() => {
      onContinue();
    }, 200);
  };

  const startHold = (e) => {
    if (e.cancelable) e.preventDefault();
    if (isSubmitted) return;
    setIsHolding(true);
    holdStartTimeRef.current = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHoldProgress(progress);

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        triggerSubmit();
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
  };

  const cancelHold = () => {
    if (isSubmitted) return;
    setIsHolding(false);
    setHoldProgress(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
  };

  const toggleEditing = (section) => {
    setEditingSection(prev => prev === section ? null : section);
  };

  return (
    <div className="screen-scroll-container">
      {/* Screen Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#043CA0', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
          Final Review
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#021744', margin: 0, letterSpacing: '-0.3px' }}>
          Review Your Intake Details
        </h1>
        <div style={{
          marginTop: 10,
          padding: '10px 14px',
          borderRadius: 14,
          background: 'rgba(4, 60, 160, 0.06)',
          border: '1px solid rgba(4, 60, 160, 0.15)',
          fontSize: 12,
          fontWeight: 700,
          color: '#043CA0',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span>❓ Are you sure about your readings? Tap any ✏️ edit button on cards below to edit inline.</span>
        </div>
      </div>

      {/* Cards Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* CARD 1: Personal & Contact Profile */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <User size={18} color="#043CA0" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Personal & Contact Profile</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('personal')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'personal' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'personal' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'personal' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'personal' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'personal' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'personal' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Full Name</label>
                <input
                  type="text"
                  value={store.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Enter your name"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Age (Years)</label>
                  <input
                    type="number"
                    value={store.age || ''}
                    onChange={(e) => updateField('age', Math.max(0, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Biological Sex</label>
                  <select
                    value={store.sex || ''}
                    onChange={(e) => updateField('sex', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', background: '#FFF' }}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Phone Number</label>
                <input
                  type="tel"
                  value={store.mobileNumber || ''}
                  onChange={(e) => updateField('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Clinic / Centre Code</label>
                <input
                  type="text"
                  value={store.centreCode || ''}
                  onChange={(e) => updateField('centreCode', e.target.value)}
                  placeholder="Optional clinic code"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                />
              </div>

              <button
                type="button"
                onClick={() => toggleEditing('personal')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Changes
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Name</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.name || 'Not provided'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Age & Sex</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.age ? `${store.age} yrs` : 'Age --'} • {store.sex || '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Phone Number</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.mobileNumber ? `+91 ${store.mobileNumber}` : 'Not provided'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Clinic / Centre Code</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.centreCode || 'None'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 2: Sleep Habits & Duration */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bed size={18} color="#043CA0" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Sleep Habits & Duration</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('sleep')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'sleep' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'sleep' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'sleep' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'sleep' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'sleep' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'sleep' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Time to Fall Asleep (Minutes)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', background: '#FFF', padding: 6, borderRadius: 10, border: '1.5px solid #CBD5E1' }}>
                  <button type="button" onClick={() => updateField('timeToFallAsleepMinutes', Math.max(0, store.timeToFallAsleepMinutes - 5))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#021744', flex: 1, textAlign: 'center' }}>{store.timeToFallAsleepMinutes} mins</span>
                  <button type="button" onClick={() => updateField('timeToFallAsleepMinutes', store.timeToFallAsleepMinutes + 5)} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Night Awakenings (Times/Night)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', background: '#FFF', padding: 6, borderRadius: 10, border: '1.5px solid #CBD5E1' }}>
                  <button type="button" onClick={() => updateField('nocturnalAwakeningsCount', Math.max(0, store.nocturnalAwakeningsCount - 1))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#021744', flex: 1, textAlign: 'center' }}>{store.nocturnalAwakeningsCount} times</span>
                  <button type="button" onClick={() => updateField('nocturnalAwakeningsCount', store.nocturnalAwakeningsCount + 1)} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Estimated Nightly Sleep (Hours)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', background: '#FFF', padding: 6, borderRadius: 10, border: '1.5px solid #CBD5E1' }}>
                  <button type="button" onClick={() => updateField('sleepDurationHours', Math.max(0, Number((store.sleepDurationHours - 0.5).toFixed(1))))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#021744', flex: 1, textAlign: 'center' }}>{store.sleepDurationHours} hrs</span>
                  <button type="button" onClick={() => updateField('sleepDurationHours', Number((store.sleepDurationHours + 0.5).toFixed(1)))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleEditing('sleep')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Sleep Habits
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: 'span 2', background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Primary Sleep Complaints</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>
                  {store.selectedSleepProblems.length > 0 ? store.selectedSleepProblems.join(', ') : 'None specified'}
                </span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Time to Fall Asleep</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.timeToFallAsleepMinutes} mins</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Night Awakenings</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.nocturnalAwakeningsCount} times/night</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Est. Nightly Sleep</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.sleepDurationHours} hours</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Complaint Frequency</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.sleepComplaintNightsPerWeek >= 0 ? `${store.sleepComplaintNightsPerWeek} nights/wk` : 'Not set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 3: Snoring & Breathing Symptoms */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Wind size={18} color="#043CA0" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Snoring & Breathing</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('breathing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'breathing' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'breathing' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'breathing' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'breathing' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'breathing' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'breathing' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              {[
                { key: 'snoresWhenSleeping', label: 'Snore when sleeping?' },
                { key: 'snoringLoudOtherRoom', label: 'Loud enough to hear in another room?' },
                { key: 'wakesChokingGasping', label: 'Wake up choking or gasping?' },
                { key: 'stopBreathingNoticed', label: 'Observed breathing pauses?' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#021744' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, true)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === true ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === true ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, false)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === false ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === false ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => toggleEditing('breathing')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Breathing Symptoms
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Snores When Sleeping</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.snoresWhenSleeping ? 'Yes' : store.snoresWhenSleeping === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Loud Other Room Snoring</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.snoringLoudOtherRoom ? 'Yes' : store.snoringLoudOtherRoom === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Choking / Gasping</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.wakesChokingGasping ? 'Yes' : store.wakesChokingGasping === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Observed Breathing Pauses</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.stopBreathingNoticed ? 'Yes' : store.stopBreathingNoticed === false ? 'No' : '--'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 4: Body Measurements & Vitals */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={18} color="#043CA0" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Body Measurements & Vitals</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('body')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'body' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'body' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'body' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'body' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'body' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {/* Hypertensive Banner */}
          {isHypertensive && (
            <div style={{
              marginBottom: 12,
              padding: '8px 12px',
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 800,
              color: '#991B1B'
            }}>
              🩺 Hypertensive Flag: Systolic &gt; 140 / Diastolic &gt; 90 with history
            </div>
          )}

          {editingSection === 'body' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Height (cm)</label>
                  <input
                    type="number"
                    value={store.heightCm || ''}
                    onChange={(e) => updateField('heightCm', parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Weight (kg)</label>
                  <input
                    type="number"
                    value={store.weightKg || ''}
                    onChange={(e) => updateField('weightKg', parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Blood Pressure (Systolic / Diastolic mmHg)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
                  <input
                    type="number"
                    value={store.bpSystolic || ''}
                    onChange={(e) => updateField('bpSystolic', e.target.value)}
                    placeholder="Sys (120)"
                    style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', padding: '10px 10px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                  <span style={{ fontWeight: 800, color: '#94A3B8' }}>/</span>
                  <input
                    type="number"
                    value={store.bpDiastolic || ''}
                    onChange={(e) => updateField('bpDiastolic', e.target.value)}
                    placeholder="Dia (80)"
                    style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', padding: '10px 10px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Neck (cm)</label>
                  <input
                    type="number"
                    value={store.neckCircumferenceCm || ''}
                    onChange={(e) => updateField('neckCircumferenceCm', parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Waist (cm)</label>
                  <input
                    type="number"
                    value={store.waistCircumferenceCm || ''}
                    onChange={(e) => updateField('waistCircumferenceCm', parseInt(e.target.value) || 0)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleEditing('body')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Vitals
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Height</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.heightCm} cm ({heightFeet}'{heightInches}")</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Weight</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{totalWeightKg} kg</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>BMI (Asian Standard)</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{calculatedBMI} ({bmiCategoryInfo.name})</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Blood Pressure</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: isHypertensive ? '#DC2626' : '#021744' }}>
                  {store.skippedBloodPressure ? 'Skipped' : store.bpSystolic ? `${store.bpSystolic}/${store.bpDiastolic} mmHg` : 'Not recorded'}
                </span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Neck Circumference</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.neckCircumferenceCm > 0 ? `${store.neckCircumferenceCm} cm` : 'Not set'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Waist Circumference</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.waistCircumferenceCm > 0 ? `${store.waistCircumferenceCm} cm` : 'Not set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 5: Daytime Symptoms & Naps */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>☀️</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Daytime Symptoms & Naps</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('daytime')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'daytime' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'daytime' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'daytime' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'daytime' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'daytime' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'daytime' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              {[
                { key: 'drowsyDuringDay', label: 'Feel drowsy during the day?' },
                { key: 'tiredLowEnergy', label: 'Feel tired or low energy?' },
                { key: 'affectsWorkOrDaily', label: 'Affects work or daily activities?' },
                { key: 'takesNaps', label: 'Take daytime naps?' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#021744' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, true)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === true ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === true ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, false)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === false ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === false ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => toggleEditing('daytime')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Daytime Symptoms
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Drowsy During Day</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.drowsyDuringDay ? 'Yes' : store.drowsyDuringDay === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Tired / Low Energy</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.tiredLowEnergy ? 'Yes' : store.tiredLowEnergy === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Affects Daily Activities</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.affectsWorkOrDaily ? 'Yes' : store.affectsWorkOrDaily === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Daytime Naps</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.takesNaps ? `${store.napDurationMinutes || 0} mins` : 'No naps'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 6: Driving & Safety */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🚗</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Driving & Safety</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('driving')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'driving' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'driving' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'driving' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'driving' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'driving' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'driving' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              {[
                { key: 'drivesVehicle', label: 'Do you drive a vehicle?' },
                { key: 'sleepyWhileDriving', label: 'Feel sleepy while driving?' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#021744' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, true)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === true ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === true ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, false)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === false ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === false ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => toggleEditing('driving')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Driving Safety
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Drives Vehicle</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.drivesVehicle ? 'Yes' : store.drivesVehicle === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Sleepy Driving</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.sleepyWhileDriving ? 'Yes' : store.sleepyWhileDriving === false ? 'No' : '--'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 7: Restless Legs Symptoms */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>🦵</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Leg Sensations (RLS)</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('legs')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'legs' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'legs' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'legs' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'legs' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'legs' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'legs' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              {[
                { key: 'legsUncomfortableResting', label: 'Uncomfortable urge to move legs?' },
                { key: 'legsWorseEvening', label: 'Worse during evening/night?' },
                { key: 'legsMovingHelps', label: 'Moving legs gives relief?' },
                { key: 'legsNoOtherReason', label: 'Not caused by cramps or position?' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFF', padding: '8px 12px', borderRadius: 10, border: '1px solid #CBD5E1' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#021744' }}>{item.label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, true)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === true ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === true ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField(item.key, false)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 800,
                        border: 'none',
                        background: store[item.key] === false ? '#043CA0' : '#E2E8F0',
                        color: store[item.key] === false ? '#FFF' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => toggleEditing('legs')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Leg Sensations
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Uncomfortable Urge</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.legsUncomfortableResting ? 'Yes' : store.legsUncomfortableResting === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Worse Evening/Night</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.legsWorseEvening ? 'Yes' : store.legsWorseEvening === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Moving Helps</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.legsMovingHelps ? 'Yes' : store.legsMovingHelps === false ? 'No' : '--'}</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>No Other Reason</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.legsNoOtherReason ? 'Yes' : store.legsNoOtherReason === false ? 'No' : '--'}</span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 8: Medical Conditions & Lifestyle */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: 16,
          border: '1.5px solid rgba(4, 60, 160, 0.18)',
          boxShadow: '0 4px 12px rgba(2, 23, 68, 0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 12, borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} color="#043CA0" />
              <span style={{ fontSize: 14, fontWeight: 800, color: '#021744' }}>Medical Conditions & Lifestyle</span>
            </div>
            <button
              type="button"
              onClick={() => toggleEditing('lifestyle')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '6px 12px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                border: editingSection === 'lifestyle' ? '1px solid #F59E0B' : 'none',
                background: editingSection === 'lifestyle' ? '#FEF3C7' : 'rgba(4, 60, 160, 0.08)',
                color: editingSection === 'lifestyle' ? '#92400E' : '#043CA0',
                cursor: 'pointer'
              }}
            >
              {editingSection === 'lifestyle' ? <X size={14} /> : <Pencil size={13} />}
              <span>{editingSection === 'lifestyle' ? 'Done' : 'Edit'}</span>
            </button>
          </div>

          {editingSection === 'lifestyle' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#F8FAFC', padding: 12, borderRadius: 14, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Caffeine Drinks/Day</label>
                  <input
                    type="number"
                    value={store.caffeinatedDrinksPerDay || 0}
                    onChange={(e) => updateField('caffeinatedDrinksPerDay', Math.max(0, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Cigarettes/Day</label>
                  <input
                    type="number"
                    value={store.cigarettesPerDay || 0}
                    onChange={(e) => updateField('cigarettesPerDay', Math.max(0, parseInt(e.target.value) || 0))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1.5px solid #CBD5E1', fontSize: 13, fontWeight: 700, color: '#021744', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 800, color: '#6A789C', display: 'block', marginBottom: 4 }}>Pre-Bedtime Screen (Minutes)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', background: '#FFF', padding: 6, borderRadius: 10, border: '1.5px solid #CBD5E1' }}>
                  <button type="button" onClick={() => updateField('preBedtimeScreenMinutes', Math.max(0, (store.preBedtimeScreenMinutes || 0) - 5))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#021744', flex: 1, textAlign: 'center' }}>{store.preBedtimeScreenMinutes || 0} mins</span>
                  <button type="button" onClick={() => updateField('preBedtimeScreenMinutes', Math.min(60, (store.preBedtimeScreenMinutes || 0) + 5))} style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', border: 'none', fontWeight: 800, color: '#043CA0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleEditing('lifestyle')}
                style={{ width: '100%', padding: 10, borderRadius: 10, background: '#043CA0', color: '#FFF', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 4 }}
              >
                <Save size={15} /> Save Lifestyle Details
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: 'span 2', background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Diagnosed Conditions</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>
                  {store.diagnosedConditions.length > 0 ? store.diagnosedConditions.join(', ') : 'None selected'}
                </span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Caffeine / Smoking</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.caffeinatedDrinksPerDay} drinks/day • {store.cigarettesPerDay} cigs/day</span>
              </div>
              <div style={{ background: '#F8FAFC', padding: 10, borderRadius: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6A789C', display: 'block' }}>Pre-bed Screen Minutes</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#021744' }}>{store.preBedtimeScreenMinutes || 0} mins</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Hold to Submit Assessment Button */}
      <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          className="welcome-hold-button"
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
          onTouchStart={startHold}
          onTouchEnd={cancelHold}
          onTouchCancel={cancelHold}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
            width: '100%'
          }}
        >
          {/* Animated Progress Fill Background */}
          <div
            className="hold-progress-bar"
            style={{
              width: `${holdProgress}%`,
              transition: isHolding ? 'none' : 'width 0.25s ease-out'
            }}
          />

          <div className="hold-button-content" style={{ justifyContent: 'center' }}>
            <span className="hold-label-text">
              {isSubmitted ? 'Submitted!' : isHolding ? 'Hold to Submit...' : 'Hold to Submit Assessment'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
