"use client";

import { Database, Play, Loader2 } from "lucide-react";

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export function PageHeader({ onRunScan, isScanning }: PageHeaderProps) {
  return (
    <div 
      className="slds-page-header"
      style={{
        backgroundColor: 'var(--slds-g-color-surface-container-2)',
        borderBottom: '1px solid var(--slds-g-color-border-1)',
        padding: 'var(--slds-g-spacing-4)',
        width: '100%'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto'
        }}
      >
        {/* Icon + Title Section */}
        <div 
          style={{
            display: 'flex',
            gap: 'var(--slds-g-spacing-3)',
            alignItems: 'center',
            flex: '1 0 0',
            minHeight: '51px',
            paddingRight: 'var(--slds-g-spacing-3)'
          }}
        >
          {/* Icon Container */}
          <span 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--slds-g-radius-border-2)',
              backgroundColor: 'var(--slds-g-color-brand-base-50)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Database 
              style={{
                width: '16px',
                height: '16px',
                color: 'var(--slds-g-color-icon-white)',
                strokeWidth: 2
              }}
            />
          </span>
          
          {/* Title */}
          <div style={{ flex: '1 0 0', minWidth: 0 }}>
            <h1 className="slds-text-heading_page">
              Data Curation
            </h1>
          </div>
        </div>
        
        {/* Actions Section */}
        <div 
          style={{
            display: 'flex',
            gap: 'var(--slds-g-spacing-2)',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingLeft: 'var(--slds-g-spacing-2)',
            flexShrink: 0
          }}
        >
          <button
            type="button"
            onClick={onRunScan}
            disabled={isScanning}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--slds-g-spacing-2)',
              padding: '6px var(--slds-g-spacing-4)',
              backgroundColor: 'var(--slds-g-color-neutral-base-100)',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-3)',
              color: 'var(--slds-g-color-brand-base-50)',
              fontFamily: 'var(--slds-g-font-family)',
              fontSize: 'var(--slds-g-font-scale-1)',
              fontWeight: 'var(--slds-g-font-weight-6)',
              lineHeight: 'var(--slds-g-line-height-body)',
              cursor: isScanning ? 'not-allowed' : 'pointer',
              opacity: isScanning ? 0.5 : 1,
              transition: 'all var(--slds-g-transition-base)',
              height: '32px',
              minWidth: 'fit-content'
            }}
            onMouseEnter={(e) => {
              if (!isScanning) {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isScanning) {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)';
                e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
              }
            }}
          >
            {isScanning ? (
              <Loader2 
                style={{
                  width: '14px',
                  height: '14px',
                  animation: 'spin 1s linear infinite',
                  flexShrink: 0
                }}
              />
            ) : (
              <Play 
                style={{
                  width: '14px',
                  height: '14px',
                  flexShrink: 0
                }}
              />
            )}
            <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
