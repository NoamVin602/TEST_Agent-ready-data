"use client";

import { MetricsIcon, PlayIcon } from "../../lib/slds-icons";
import { Spinner } from "./Spinner";
import { getStageConfig } from "../../lib/stage-config";

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export function PageHeader({ onRunScan, isScanning }: PageHeaderProps) {
  const config = getStageConfig();
  const isDayZero = config.stage === 'day0';
  
  return (
    <div
      className="slds-page-header slds-page-header_record-home"
      style={{
        backgroundColor: 'var(--slds-g-color-surface-container-2, #f3f3f3)',
        position: 'sticky',
        top: '0',
        zIndex: 900,
        borderBottom: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
      }}
    >
      {/* Page Header Row */}
      <div className="slds-page-header__row">
        {/* Title Column */}
        <div className="slds-page-header__col-title">
          {/* Media Object for Icon + Title */}
          <div className="slds-media slds-media_center slds-has-flexi-truncate">
            {/* Icon */}
            <div className="slds-media__figure">
              <div
                className="slds-icon_container slds-icon-standard-record"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--slds-g-radius-border-2, 8px)',
                  backgroundColor: '#1B96FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MetricsIcon
                  size={20}
                  color="#FFFFFF"
                />
              </div>
            </div>

            {/* Title */}
            <div className="slds-media__body">
              <h1 className="slds-page-header__title slds-truncate" title="Data Health">
                Data Health
              </h1>
            </div>
          </div>
        </div>

        {/* Actions Column */}
        <div className="slds-page-header__col-actions">
          <div className="slds-page-header__controls">
            <button
              type="button"
              className="slds-button slds-button_brand"
              onClick={onRunScan}
              disabled={isScanning}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-2)',
              }}
            >
              {isScanning ? (
                <>
                  <Spinner size="x-small" variant="brand" aria-label="Scanning in progress" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <PlayIcon
                    size={14}
                    color="var(--slds-g-color-accent-2, #0250d9)"
                    className="slds-button__icon slds-button__icon_left"
                  />
                  <span>{isDayZero ? 'Run Health Scan' : 'Run Scan'}</span>
                  {isDayZero && (
                    <span style={{ 
                      fontSize: 'var(--slds-g-font-scale-neg-1, 12px)', 
                      color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                      marginLeft: 'var(--slds-g-spacing-2, 8px)',
                      fontWeight: 'var(--slds-g-font-weight-4, 400)'
                    }}>
                      Scan completed {config.lastScanTime}
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
