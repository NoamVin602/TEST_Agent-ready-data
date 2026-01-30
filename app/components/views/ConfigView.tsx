"use client";

import { useState } from "react";
import { SettingsIcon, ClockIcon, BellIcon, ShieldIcon, ZapIcon, SaveIcon } from "../../lib/slds-icons";

export function ConfigView() {
  const [config, setConfig] = useState({
    autoScan: true,
    scanFrequency: "daily",
    autoFix: true,
    autoFixThreshold: "95",
    notifications: true,
    notifyOnIssues: true,
    notifyOnGaps: true,
    sensitiveDataScan: true,
  });

  const handleSave = () => {
    // Handle save logic
    console.log("Saving configuration:", config);
  };

  return (
    <div
      style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: 'var(--slds-g-spacing-4)',
        width: '100%'
      }}
    >
      <div
        className="slds-grid slds-grid_vertical"
        style={{ gap: 'var(--slds-g-spacing-6)' }}
      >
        {/* Header */}
        <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
          <h2
            style={{
              fontFamily: 'var(--slds-g-font-family)',
              fontSize: 'var(--slds-g-font-scale-3)',
              fontWeight: 'var(--slds-g-font-weight-6)',
              lineHeight: '28px',
              color: 'var(--slds-g-color-on-surface-3)',
              margin: 0
            }}
          >
            Configuration
          </h2>
          <button
            type="button"
            className="slds-button slds-button_brand"
            onClick={handleSave}
            style={{
              gap: '0.5rem'
            }}
          >
            <SaveIcon size={16} color="#FFFFFF" />
            Save Changes
          </button>
        </div>

        {/* Scan Settings */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF' }}>
          <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-2)' }}>
              <ClockIcon size={20} color="rgba(2, 80, 217, 1)" />
              <h3
                style={{
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-2)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  lineHeight: '24px',
                  color: 'var(--slds-g-color-on-surface-3)',
                  margin: 0
                }}
              >
                Scan Settings
              </h3>
            </div>
          </div>
          <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-4)' }}>
              {/* Auto Scan Toggle */}
              <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                <div>
                  <label
                    htmlFor="auto-scan"
                    className="slds-form-element__label"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      lineHeight: '18px',
                      color: 'var(--slds-g-color-on-surface-1)'
                    }}
                  >
                    Automatic Scanning
                  </label>
                  <p
                    className="slds-form-element__help"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '17px',
                      color: 'var(--slds-g-color-on-surface-1)',
                      marginTop: '2px',
                      marginBottom: 0
                    }}
                  >
                    Automatically scan knowledge base on schedule
                  </p>
                </div>
                <label className="slds-checkbox_toggle">
                  <input
                    type="checkbox"
                    id="auto-scan"
                    checked={config.autoScan}
                    onChange={(e) => setConfig({ ...config, autoScan: e.target.checked })}
                  />
                  <span className="slds-checkbox_faux" aria-label="Automatic Scanning"></span>
                </label>
              </div>

              {/* Scan Frequency */}
              <div className="slds-form-element">
                <label
                  htmlFor="frequency"
                  className="slds-form-element__label"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-base)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1)'
                  }}
                >
                  Scan Frequency
                </label>
                <div className="slds-form-element__control">
                  <select
                    id="frequency"
                    className="slds-select"
                    value={config.scanFrequency}
                    onChange={(e) => setConfig({ ...config, scanFrequency: e.target.value })}
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '18px'
                    }}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Fix Settings */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF' }}>
          <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-2)' }}>
              <ZapIcon size={20} color="var(--slds-g-color-warning-base-50)" />
              <h3
                style={{
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-2)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  lineHeight: '24px',
                  color: 'var(--slds-g-color-on-surface-3)',
                  margin: 0
                }}
              >
                Auto-Fix Settings
              </h3>
            </div>
          </div>
          <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-4)' }}>
              {/* Auto-Fix Toggle */}
              <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                <div>
                  <label
                    htmlFor="auto-fix"
                    className="slds-form-element__label"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      lineHeight: '18px',
                      color: 'var(--slds-g-color-on-surface-1)'
                    }}
                  >
                    Enable Auto-Fix
                  </label>
                  <p
                    className="slds-form-element__help"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '17px',
                      color: 'var(--slds-g-color-on-surface-1)',
                      marginTop: '2px',
                      marginBottom: 0
                    }}
                  >
                    Automatically resolve high-confidence issues
                  </p>
                </div>
                <label className="slds-checkbox_toggle">
                  <input
                    type="checkbox"
                    id="auto-fix"
                    checked={config.autoFix}
                    onChange={(e) => setConfig({ ...config, autoFix: e.target.checked })}
                  />
                  <span className="slds-checkbox_faux" aria-label="Enable Auto-Fix"></span>
                </label>
              </div>

              {/* Trust Score Threshold */}
              <div className="slds-form-element">
                <label
                  htmlFor="threshold"
                  className="slds-form-element__label"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-base)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1)'
                  }}
                >
                  Trust Score Threshold (%)
                </label>
                <div className="slds-form-element__control">
                  <input
                    type="number"
                    id="threshold"
                    className="slds-input"
                    min="50"
                    max="100"
                    value={config.autoFixThreshold}
                    onChange={(e) => setConfig({ ...config, autoFixThreshold: e.target.value })}
                    style={{
                      width: '128px',
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '18px'
                    }}
                  />
                  <p
                    className="slds-form-element__help"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '17px',
                      color: 'var(--slds-g-color-on-surface-1)',
                      marginTop: '2px',
                      marginBottom: 0
                    }}
                  >
                    Only auto-fix when trust score exceeds this threshold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF' }}>
          <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-2)' }}>
              <BellIcon size={20} color="rgba(2, 80, 217, 1)" />
              <h3
                style={{
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-2)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  lineHeight: '24px',
                  color: 'var(--slds-g-color-on-surface-3)',
                  margin: 0
                }}
              >
                Notifications
              </h3>
            </div>
          </div>
          <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-4)' }}>
              {/* Notifications Toggle */}
              <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                <div>
                  <label
                    htmlFor="notifications"
                    className="slds-form-element__label"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      lineHeight: '18px',
                      color: 'var(--slds-g-color-on-surface-1)'
                    }}
                  >
                    Enable Notifications
                  </label>
                  <p
                    className="slds-form-element__help"
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '17px',
                      color: 'var(--slds-g-color-on-surface-1)',
                      marginTop: '2px',
                      marginBottom: 0
                    }}
                  >
                    Receive alerts about scan results
                  </p>
                </div>
                <label className="slds-checkbox_toggle">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={config.notifications}
                    onChange={(e) => setConfig({ ...config, notifications: e.target.checked })}
                  />
                  <span className="slds-checkbox_faux" aria-label="Enable Notifications"></span>
                </label>
              </div>

              {/* Notify on Issues */}
              <div
                className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
                style={{
                  paddingLeft: 'var(--slds-g-spacing-4)',
                  borderLeft: '2px solid var(--slds-g-color-border-2)'
                }}
              >
                <label
                  htmlFor="notify-issues"
                  className="slds-form-element__label"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-base)',
                    fontWeight: 'var(--slds-g-font-weight-4)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1)',
                    margin: 0
                  }}
                >
                  Notify on new issues
                </label>
                <label className="slds-checkbox_toggle">
                  <input
                    type="checkbox"
                    id="notify-issues"
                    checked={config.notifyOnIssues}
                    onChange={(e) => setConfig({ ...config, notifyOnIssues: e.target.checked })}
                  />
                  <span className="slds-checkbox_faux" aria-label="Notify on new issues"></span>
                </label>
              </div>

              {/* Notify on Gaps */}
              <div
                className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
                style={{
                  paddingLeft: 'var(--slds-g-spacing-4)',
                  borderLeft: '2px solid var(--slds-g-color-border-2)'
                }}
              >
                <label
                  htmlFor="notify-gaps"
                  className="slds-form-element__label"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-base)',
                    fontWeight: 'var(--slds-g-font-weight-4)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1)',
                    margin: 0
                  }}
                >
                  Notify on content gaps
                </label>
                <label className="slds-checkbox_toggle">
                  <input
                    type="checkbox"
                    id="notify-gaps"
                    checked={config.notifyOnGaps}
                    onChange={(e) => setConfig({ ...config, notifyOnGaps: e.target.checked })}
                  />
                  <span className="slds-checkbox_faux" aria-label="Notify on content gaps"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF' }}>
          <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-2)' }}>
              <ShieldIcon size={20} color="var(--slds-g-color-success-base-50)" />
              <h3
                style={{
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-2)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  lineHeight: '24px',
                  color: 'var(--slds-g-color-on-surface-3)',
                  margin: 0
                }}
              >
                Security
              </h3>
            </div>
          </div>
          <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
            <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
              <div>
                <label
                  htmlFor="sensitive-scan"
                  className="slds-form-element__label"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-base)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1)'
                  }}
                >
                  Sensitive Data Detection
                </label>
                <p
                  className="slds-form-element__help"
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-neg-1)',
                    fontWeight: 'var(--slds-g-font-weight-4)',
                    lineHeight: '17px',
                    color: 'var(--slds-g-color-on-surface-1)',
                    marginTop: '2px',
                    marginBottom: 0
                  }}
                >
                  Scan for PII, credentials, and sensitive information
                </p>
              </div>
              <label className="slds-checkbox_toggle">
                <input
                  type="checkbox"
                  id="sensitive-scan"
                  checked={config.sensitiveDataScan}
                  onChange={(e) => setConfig({ ...config, sensitiveDataScan: e.target.checked })}
                />
                <span className="slds-checkbox_faux" aria-label="Sensitive Data Detection"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
