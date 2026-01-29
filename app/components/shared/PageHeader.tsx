"use client";

import { MetricsIcon, PlayIcon, LoaderIcon } from "../../lib/slds-icons";

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export function PageHeader({ onRunScan, isScanning }: PageHeaderProps) {
  return (
    <div
      className="slds-page-header slds-page-header_record-home slds-page-header_sticky"
      style={{
        backgroundColor: 'var(--slds-g-color-surface-container-2, #F3F3F3)',
        padding: 'var(--slds-g-spacing-4, 16px) var(--slds-g-spacing-6, 24px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '64px',
        width: '100%',
        position: 'sticky',
        top: '0',
        zIndex: 900,
        borderBottom: '1px solid var(--slds-g-color-border-1, #C9C9C9)',
      }}
    >
      {/* Icon + Title Section */}
      <div
        className="slds-page-header__col-title"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--slds-g-spacing-3, 12px)',
          flex: '1 0 0',
          paddingRight: 'var(--slds-g-spacing-3, 12px)',
          minWidth: 0,
        }}
      >
        {/* Metrics Icon - 32px rounded square with blue background */}
        <div
          className="slds-media__figure"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--slds-g-radius-border-2, 8px)',
            backgroundColor: '#1B96FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <MetricsIcon
            size={32}
            style={{ display: 'block' }}
          />
        </div>

        {/* Title */}
        <div className="slds-media__body" style={{ flex: '1 0 0', minWidth: 0 }}>
          <h1
            className="slds-page-header__title"
            style={{
              fontFamily: 'var(--slds-g-font-family)',
              fontSize: 'var(--slds-g-font-scale-3, 20px)',
              fontWeight: 'var(--slds-g-font-weight-4, 400)',
              lineHeight: '28px',
              color: 'var(--slds-g-color-on-surface-3, #03234D)',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Data Curation
          </h1>
        </div>
      </div>

      {/* Run Scan Button */}
      <div
        className="slds-page-header__col-actions"
        style={{
          display: 'flex',
          gap: 'var(--slds-g-spacing-2, 8px)',
          alignItems: 'center',
          paddingLeft: 'var(--slds-g-spacing-2, 8px)',
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onRunScan}
          disabled={isScanning}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            height: '32px',
            borderRadius: '16px',
            border: '1px solid #C9C9C9',
            backgroundColor: '#FFFFFF',
            color: 'rgba(2, 80, 217, 1)',
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '13px',
            fontWeight: 590,
            lineHeight: '19px',
            cursor: isScanning ? 'not-allowed' : 'pointer',
            opacity: isScanning ? 0.7 : 1,
            transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            if (!isScanning) {
              e.currentTarget.style.backgroundColor = '#F3F3F3';
            }
          }}
          onMouseLeave={(e) => {
            if (!isScanning) {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }
          }}
          onFocus={(e) => {
            if (!isScanning) {
              e.currentTarget.style.outline = '2px solid rgba(2, 80, 217, 1)';
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          {isScanning ? (
            <LoaderIcon
              size={14}
              color="rgba(2, 80, 217, 1)"
              style={{ animation: 'spin 1s linear infinite' }}
            />
          ) : (
            <PlayIcon
              size={14}
              color="rgba(2, 80, 217, 1)"
            />
          )}
          <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
        </button>
      </div>
    </div>
  );
}
