import React, { useState } from 'react';
import { Moon, Sun, Briefcase, Sparkles, Minus, Plus } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen21SleepSchedule({ store, updateField, isDeveloperMode }) {
  const [activeTab, setActiveTab] = useState('weekdays'); // 'weekdays' | 'weekends'

  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 21 — Sleep schedule"
        title="Tell us about your usual schedule"
        caption="We ask separately for weekdays and weekends to assess schedule consistency."
        isDeveloperMode={isDeveloperMode}
      />

      {/* Weekday / Weekend Tab Switcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => setActiveTab('weekdays')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px 16px',
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            border: activeTab === 'weekdays' ? '2px solid #043CA0' : '1.5px solid rgba(199, 190, 219, 0.45)',
            background: activeTab === 'weekdays' ? '#043CA0' : '#FFFFFF',
            color: activeTab === 'weekdays' ? '#FFFFFF' : '#021744',
            boxShadow: activeTab === 'weekdays' ? '0 4px 12px rgba(4, 60, 160, 0.2)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Briefcase size={16} />
          <span>Weekdays (Mon-Fri)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('weekends')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px 16px',
            borderRadius: 14,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            border: activeTab === 'weekends' ? '2px solid #043CA0' : '1.5px solid rgba(199, 190, 219, 0.45)',
            background: activeTab === 'weekends' ? '#043CA0' : '#FFFFFF',
            color: activeTab === 'weekends' ? '#FFFFFF' : '#021744',
            boxShadow: activeTab === 'weekends' ? '0 4px 12px rgba(4, 60, 160, 0.2)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Sparkles size={16} />
          <span>Weekends (Sat-Sun)</span>
        </button>
      </div>

      {activeTab === 'weekdays' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeIn 0.2s ease' }}>
          {/* Weekday Bedtime */}
          <div>
            <div className="input-label-row">
              <label className="input-label" htmlFor="weekday-bedtime-input">
                What time do you usually go to bed on weekdays?
              </label>
            </div>
            <div className="input-group-row">
              <div className="input-group-prefix">
                <Moon size={18} color="#8B94FB" />
              </div>
              <input
                id="weekday-bedtime-input"
                type="time"
                className="input-group-field"
                value={store.weekdayBedtime || '23:00'}
                onChange={(e) => updateField('weekdayBedtime', e.target.value)}
              />
            </div>
          </div>

          {/* Weekday Wake Time */}
          <div>
            <div className="input-label-row">
              <label className="input-label" htmlFor="weekday-waketime-input">
                What time do you usually wake up on weekdays?
              </label>
            </div>
            <div className="input-group-row">
              <div className="input-group-prefix">
                <Sun size={18} color="#FAB84A" />
              </div>
              <input
                id="weekday-waketime-input"
                type="time"
                className="input-group-field"
                value={store.weekdayWakeTime || '07:00'}
                onChange={(e) => updateField('weekdayWakeTime', e.target.value)}
              />
            </div>
          </div>

          {/* Weekday Sleep Duration (0 to 16 hrs) */}
          <div>
            <div className="input-label-row">
              <label className="input-label">
                How many hours do you think you sleep during night on weekdays?
              </label>
            </div>
            <div className="stepper-card" style={{ border: '1.5px solid #043CA0' }}>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => updateField('weekdaySleepHours', Math.max(0, Math.round((store.weekdaySleepHours || 0) - 1)))}
                disabled={(store.weekdaySleepHours || 0) <= 0}
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>
              <div className="stepper-value-display">
                <span className="stepper-num">{Math.round(store.weekdaySleepHours || 0)}</span>
                <span className="stepper-unit">hours</span>
              </div>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => updateField('weekdaySleepHours', Math.min(16, Math.round((store.weekdaySleepHours || 0) + 1)))}
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6A789C' }}>Quick pick:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {[0, 4, 5, 6, 7, 8, 9, 10].map(h => (
                  <button
                    key={h}
                    type="button"
                    className="quick-chip"
                    style={{
                      padding: '3px 8px',
                      fontSize: 11,
                      background: store.weekdaySleepHours === h ? '#043CA0' : '#F1F5F9',
                      color: store.weekdaySleepHours === h ? '#FFFFFF' : '#021744'
                    }}
                    onClick={() => updateField('weekdaySleepHours', h)}
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeIn 0.2s ease' }}>
          {/* Weekend Bedtime */}
          <div>
            <div className="input-label-row">
              <label className="input-label" htmlFor="weekend-bedtime-input">
                What time do you usually go to bed on weekends?
              </label>
            </div>
            <div className="input-group-row">
              <div className="input-group-prefix">
                <Moon size={18} color="#8B94FB" />
              </div>
              <input
                id="weekend-bedtime-input"
                type="time"
                className="input-group-field"
                value={store.weekendBedtime || '23:30'}
                onChange={(e) => updateField('weekendBedtime', e.target.value)}
              />
            </div>
          </div>

          {/* Weekend Wake Time */}
          <div>
            <div className="input-label-row">
              <label className="input-label" htmlFor="weekend-waketime-input">
                What time do you usually wake up on weekends?
              </label>
            </div>
            <div className="input-group-row">
              <div className="input-group-prefix">
                <Sun size={18} color="#FAB84A" />
              </div>
              <input
                id="weekend-waketime-input"
                type="time"
                className="input-group-field"
                value={store.weekendWakeTime || '08:00'}
                onChange={(e) => updateField('weekendWakeTime', e.target.value)}
              />
            </div>
          </div>

          {/* Weekend Sleep Duration (0 to 16 hrs) */}
          <div>
            <div className="input-label-row">
              <label className="input-label">
                How many hours do you think you sleep during night on weekends?
              </label>
            </div>
            <div className="stepper-card" style={{ border: '1.5px solid #043CA0' }}>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => updateField('weekendSleepHours', Math.max(0, Math.round((store.weekendSleepHours || 0) - 1)))}
                disabled={(store.weekendSleepHours || 0) <= 0}
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>
              <div className="stepper-value-display">
                <span className="stepper-num">{Math.round(store.weekendSleepHours || 0)}</span>
                <span className="stepper-unit">hours</span>
              </div>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => updateField('weekendSleepHours', Math.min(16, Math.round((store.weekendSleepHours || 0) + 1)))}
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6A789C' }}>Quick pick:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {[0, 4, 5, 6, 7, 8, 9, 10].map(h => (
                  <button
                    key={h}
                    type="button"
                    className="quick-chip"
                    style={{
                      padding: '3px 8px',
                      fontSize: 11,
                      background: store.weekendSleepHours === h ? '#043CA0' : '#F1F5F9',
                      color: store.weekendSleepHours === h ? '#FFFFFF' : '#021744'
                    }}
                    onClick={() => updateField('weekendSleepHours', h)}
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
