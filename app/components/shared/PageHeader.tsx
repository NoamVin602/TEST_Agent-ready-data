"use client";

import { MetricsIcon, PlayIcon, PlusIcon } from "../../lib/slds-icons";
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
        padding: 'var(--slds-g-spacing-4, 16px)',
        minHeight: '83px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Page Header Row */}
      <div 
        className="slds-page-header__row"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 'var(--slds-g-spacing-3, 12px)',
        }}
      >
        {/* Title Column */}
        <div 
          className="slds-page-header__col-title"
          style={{
            flex: '1 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-3, 12px)',
            minHeight: '51px',
            paddingRight: 'var(--slds-g-spacing-3, 12px)',
            minWidth: 0,
          }}
        >
          {/* Icon */}
          <div className="slds-media__figure" style={{ flexShrink: 0 }}>
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
          <div className="slds-media__body" style={{ flex: '1 0 0', minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <h1 
              className="slds-page-header__title slds-truncate" 
              title="Data Health"
              style={{
                fontSize: 'var(--slds-g-font-scale-5, 28px)',
                fontWeight: 'var(--slds-g-font-weight-4, 400)',
                lineHeight: '35px',
                color: 'var(--slds-g-color-on-surface-3, #03234d)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Data Health
            </h1>
          </div>
        </div>

        {/* Actions Column */}
        <div 
          className="slds-page-header__col-actions"
          style={{
            display: 'flex',
            gap: 'var(--slds-g-spacing-2, 8px)',
            alignItems: 'center',
            flexShrink: 0,
            paddingLeft: 'var(--slds-g-spacing-2, 8px)',
          }}
        >
          {/* Connect Data Source Button */}
          <button
            type="button"
            className="slds-button slds-button_neutral"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--slds-g-spacing-2, 8px)',
              height: '32px',
              padding: '0 var(--slds-g-spacing-4, 16px)',
              fontSize: 'var(--slds-g-font-scale-1, 14px)',
              fontWeight: 'var(--slds-g-font-weight-6, 590)',
              lineHeight: '19px',
              color: 'var(--slds-g-color-on-surface-3, #03234d)',
              backgroundColor: 'var(--slds-g-color-neutral-base-100, #ffffff)',
              border: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
              borderRadius: 'var(--slds-g-radius-border-2, 8px)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <PlusIcon
              size={14}
              color="var(--slds-g-color-on-surface-3, #03234d)"
              className="slds-button__icon slds-button__icon_left"
            />
            <span>Connect Data Source</span>
          </button>

          {/* Run Health Scan Button with Status */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--slds-g-spacing-1, 4px)', 
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={onRunScan}
              disabled={isScanning}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--slds-g-spacing-2, 8px)',
                height: '32px',
                padding: '0 var(--slds-g-spacing-4, 16px)',
                fontSize: 'var(--slds-g-font-scale-1, 14px)',
                fontWeight: 'var(--slds-g-font-weight-6, 590)',
                lineHeight: '19px',
                color: 'var(--slds-g-color-on-surface-3, #03234d)',
                backgroundColor: 'var(--slds-g-color-neutral-base-100, #ffffff)',
                border: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
                borderRadius: 'var(--slds-g-radius-border-2, 8px)',
                cursor: isScanning ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap',
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
                    color="var(--slds-g-color-on-surface-3, #03234d)"
                    className="slds-button__icon slds-button__icon_left"
                  />
                  <span>{isDayZero ? 'Run Health Scan' : 'Run Scan'}</span>
                </>
              )}
            </button>
            {isDayZero && !isScanning && (
              <span 
                style={{ 
                  fontSize: 'var(--slds-g-font-scale-neg-1, 12px)', 
                  color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                  fontWeight: 'var(--slds-g-font-weight-4, 400)',
                  lineHeight: '16px',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                Scan completed {config.lastScanTime}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
