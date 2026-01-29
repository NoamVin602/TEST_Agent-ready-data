"use client";

import { Database, Play, Loader2 } from "lucide-react";

interface PageHeaderProps {
  onRunScan: () => void;
  isScanning: boolean;
}

export function PageHeader({ onRunScan, isScanning }: PageHeaderProps) {
  return (
    <div
      style={{
        backgroundColor: '#F3F3F3',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '64px',
        width: '100%',
        position: 'sticky',
        top: '0', // Sticks to top of scrollable content area
        zIndex: 900,
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      {/* Icon + Title Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: '1 0 0',
          paddingRight: '12px',
          minWidth: 0,
        }}
      >
        {/* Database Icon - 32px rounded square */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: '#0176D3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Database
            style={{
              width: '18px',
              height: '18px',
              color: '#FFFFFF',
              strokeWidth: 2,
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '20px',
            fontWeight: 600,
            lineHeight: '28px',
            color: '#03234D',
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

      {/* Run Scan Button */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          paddingLeft: '8px',
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
            <Loader2
              style={{
                width: '14px',
                height: '14px',
                color: 'rgba(2, 80, 217, 1)',
                animation: 'spin 1s linear infinite',
              }}
            />
          ) : (
            <Play
              style={{
                width: '14px',
                height: '14px',
                color: 'rgba(2, 80, 217, 1)',
                fill: 'rgba(2, 80, 217, 1)',
              }}
            />
          )}
          <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
        </button>
      </div>
    </div>
  );
}
