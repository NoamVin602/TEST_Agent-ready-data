"use client";

import { Grid3x3 } from "lucide-react";

interface GlobalNavigationProps {
  activeTab?: string;
}

export function GlobalNavigation({ activeTab = "home" }: GlobalNavigationProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 24px 4px 0',
        height: '40px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px -1px 1px 0px rgba(0,0,0,0.05), 0px 1.4px 1.5px 0px rgba(0,0,0,0.09), 0px 0px 1.49px 0px rgba(0,0,0,0.09)',
        position: 'sticky',
        top: '64px', // Position below 64px Global Header
        zIndex: 999,
      }}
    >
      {/* Left Section: App Name + Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: '1 0 0',
          minWidth: 0,
        }}
      >
        {/* App Name Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            height: '32px',
            maxWidth: '320px',
            padding: '0 24px 0 16px',
          }}
        >
          {/* Waffle Icon */}
          <Grid3x3
            style={{
              width: '20px',
              height: '20px',
              color: '#5C5C5C',
              flexShrink: 0,
            }}
          />

          {/* App Name */}
          <p
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '28px',
              color: '#03234D',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: '1 0 0',
              minWidth: 0,
            }}
          >
            Data 360
          </p>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          }}
        >
          {/* Home Tab */}
          <button
            type="button"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              height: '100%',
              padding: '0 16px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'home' ? '2px solid #0176D3' : '2px solid transparent',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: activeTab === 'home' ? 590 : 400,
              lineHeight: '19px',
              color: activeTab === 'home' ? 'rgba(2, 80, 217, 1)' : '#5C5C5C',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== 'home') {
                e.currentTarget.style.color = '#03234D';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'home') {
                e.currentTarget.style.color = '#5C5C5C';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid rgba(2, 80, 217, 1)';
              e.currentTarget.style.outlineOffset = '-2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
