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
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '51px',
        width: '100%',
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
        {/* Database Icon - 32px circle */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
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
            fontSize: '28px',
            fontWeight: 400,
            lineHeight: '35px',
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
            borderRadius: '4px',
            border: '1px solid #C9C9C9',
            backgroundColor: '#FFFFFF',
            color: '#0176D3',
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
              e.currentTarget.style.outline = '2px solid #0176D3';
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
                color: '#0176D3',
                animation: 'spin 1s linear infinite',
              }}
            />
          ) : (
            <Play
              style={{
                width: '14px',
                height: '14px',
                color: '#0176D3',
                fill: '#0176D3',
              }}
            />
          )}
          <span>{isScanning ? 'Scanning...' : 'Run Scan'}</span>
        </button>
      </div>
    </div>
  );
}
