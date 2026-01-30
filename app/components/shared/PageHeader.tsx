"use client";

import { MetricsIcon, PlayIcon, LoaderIcon } from "../../lib/slds-icons";

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export function PageHeader({ onRunScan, isScanning }: PageHeaderProps) {
  return (
    <div
      className="slds-page-header slds-page-header_record-home"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'sticky',
        top: '0',
        zIndex: 900,
        borderBottom: '1px solid var(--slds-g-color-border-1, #C9C9C9)',
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
              <h1 className="slds-page-header__title slds-truncate" title="Data Curation">
                Data Curation
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
            >
              {isScanning ? (
                <>
                  <LoaderIcon
                    size={14}
                    color="#FFFFFF"
                    className="slds-button__icon slds-button__icon_left"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <PlayIcon
                    size={14}
                    color="#FFFFFF"
                    className="slds-button__icon slds-button__icon_left"
                  />
                  <span>Run Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
