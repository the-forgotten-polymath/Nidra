import React from 'react';
import { Mail, Building2, Info } from 'lucide-react';
import ScreenHeaderBlock from '../components/ScreenHeaderBlock';

export default function Screen3Contact({ store, updateField, isDeveloperMode }) {
  return (
    <div className="screen-scroll-container">
      <ScreenHeaderBlock
        screenSubtitle="Screen 3 — Contact"
        title="A couple more details"
        isDeveloperMode={isDeveloperMode}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Helper Banner */}
        <div
          style={{
            padding: 14,
            borderRadius: 14,
            background: 'var(--color-tag-meeting-bg)',
            border: '1.2px solid var(--color-outline)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10
          }}
        >
          <Info size={18} color="var(--color-card1-wave)" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-dark)', lineHeight: 1.4 }}>
            Please provide either your phone number or email address so your care team can contact you.
          </p>
        </div>

        {/* Mobile Number */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="mobile-input">Mobile number</label>
            <span className="input-sub-label">Optional if email given</span>
          </div>

          <div className="input-group-row">
            <div className="input-group-prefix">
              <span>🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              id="mobile-input"
              type="tel"
              className="input-group-field"
              placeholder="98765 43210"
              value={store.mobileNumber}
              maxLength={10}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                updateField('mobileNumber', digits);
              }}
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="email-input">Email address</label>
            <span className="input-sub-label">Optional if phone given</span>
          </div>

          <div className="input-group-row">
            <div className="input-group-prefix">
              <Mail size={18} color="var(--color-text-muted)" />
            </div>
            <input
              id="email-input"
              type="email"
              className="input-group-field"
              placeholder="name@example.com"
              value={store.email}
              onChange={(e) => updateField('email', e.target.value)}
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* Centre Code */}
        <div>
          <div className="input-label-row">
            <label className="input-label" htmlFor="centre-input">Centre code (optional)</label>
          </div>

          <div className="input-group-row">
            <div className="input-group-prefix">
              <Building2 size={18} color="var(--color-text-muted)" />
            </div>
            <input
              id="centre-input"
              type="text"
              className="input-group-field"
              placeholder="Enter clinic centre code"
              value={store.centreCode}
              onChange={(e) => updateField('centreCode', e.target.value.toUpperCase())}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, paddingLeft: 4 }}>
            <Info size={13} color="var(--color-text-muted)" />
            <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
              If your clinic gave you a centre code, enter it here.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
