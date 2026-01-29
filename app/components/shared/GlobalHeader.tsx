"use client";

import { Grid3x3, Search, Settings, Star, Bell, HelpCircle, User } from "lucide-react";

export function GlobalHeader() {
  return (
    <div 
      style={{
        /* SLDS Global Header Blueprint - Exact Specifications */
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 12px',
        gap: '12px',
        
        width: '100%',
        height: '64px',
        minHeight: '64px',
        maxHeight: '64px',
        
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
        
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* App Launcher */}
        <button
          type="button"
          aria-label="App Launcher"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.15s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F3F3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Grid3x3 style={{ width: '20px', height: '20px', color: '#03234D' }} />
        </button>

        {/* Salesforce Logo & App Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.5 3.5C8.8 3.5 7.3 4.4 6.6 5.8C5.9 5.5 5.1 5.3 4.3 5.3C1.9 5.3 0 7.2 0 9.6C0 12 1.9 13.9 4.3 13.9H13.7C16.1 13.9 18 12 18 9.6C18 7.2 16.1 5.3 13.7 5.3C13.5 5.3 13.3 5.3 13.1 5.4C12.4 4.2 11.1 3.5 10.5 3.5Z" fill="#00A1E0"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '16px', 
              fontWeight: 590,
              color: '#03234D',
            }}>
              Data 360
            </span>
            <span style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#5C5C5C',
              padding: '0 8px',
              borderLeft: '1px solid #C9C9C9',
            }}>
              Home
            </span>
          </div>
        </div>
      </div>

      {/* Center Section - Global Search */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 24px' }}>
        <div style={{ position: 'relative' }}>
          <Search 
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#5C5C5C',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              height: '32px',
              padding: '0 12px 0 40px',
              border: '1px solid #C9C9C9',
              borderRadius: '4px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#03234D',
              backgroundColor: '#F3F3F3',
              outline: 'none',
              transition: 'all 0.15s ease-in-out',
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#0176D3';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(1, 118, 211, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F3F3';
              e.currentTarget.style.borderColor = '#C9C9C9';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Right Section - Action Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[
          { icon: Settings, label: 'Settings' },
          { icon: Star, label: 'Favorites' },
          { icon: Bell, label: 'Notifications' },
          { icon: HelpCircle, label: 'Help' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F3F3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
          </button>
        ))}
        
        {/* User Avatar */}
        <button
          type="button"
          title="User Profile"
          aria-label="User Profile"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: '#0176D3',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#014486';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0176D3';
          }}
        >
          <User style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
        </button>
      </div>
    </div>
  );
}
