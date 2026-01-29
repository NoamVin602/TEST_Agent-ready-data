"use client";

import { Grid3x3, Search, Settings, Star, Bell, HelpCircle, User } from "lucide-react";

export function GlobalHeader() {
  return (
    <div 
      style={{
        height: '48px',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        borderBottom: '1px solid var(--slds-g-color-border-1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--slds-g-spacing-4)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--slds-g-spacing-4)' }}>
        {/* App Launcher */}
        <button
          type="button"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderRadius: 'var(--slds-g-radius-border-1)',
            transition: 'background-color var(--slds-g-transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Grid3x3 style={{ width: '20px', height: '20px', color: 'var(--slds-g-color-text-default)' }} />
        </button>

        {/* Salesforce Logo & App Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--slds-g-spacing-3)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.5 3.5C8.8 3.5 7.3 4.4 6.6 5.8C5.9 5.5 5.1 5.3 4.3 5.3C1.9 5.3 0 7.2 0 9.6C0 12 1.9 13.9 4.3 13.9H13.7C16.1 13.9 18 12 18 9.6C18 7.2 16.1 5.3 13.7 5.3C13.5 5.3 13.3 5.3 13.1 5.4C12.4 4.2 11.1 3.5 10.5 3.5Z" fill="#00A1E0"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--slds-g-spacing-2)' }}>
            <span style={{ 
              fontSize: 'var(--slds-g-font-scale-3)', 
              fontWeight: 'var(--slds-g-font-weight-semibold)',
              color: 'var(--slds-g-color-text-default)'
            }}>
              Data 360
            </span>
            <span style={{
              fontSize: 'var(--slds-g-font-scale-2)',
              color: 'var(--slds-g-color-text-weak)',
              padding: '0 var(--slds-g-spacing-2)',
              borderLeft: '1px solid var(--slds-g-color-border-1)'
            }}>
              Home
            </span>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 var(--slds-g-spacing-6)' }}>
        <div style={{ position: 'relative' }}>
          <Search 
            style={{
              position: 'absolute',
              left: 'var(--slds-g-spacing-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: 'var(--slds-g-color-text-weak)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              height: '32px',
              padding: '0 var(--slds-g-spacing-3) 0 40px',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-2)',
              fontSize: 'var(--slds-g-font-scale-1)',
              backgroundColor: 'var(--slds-g-color-neutral-base-95)',
              outline: 'none',
              transition: 'all var(--slds-g-transition-base)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)';
              e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
              e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
            }}
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--slds-g-spacing-2)' }}>
        {[
          { icon: Settings, label: 'Settings' },
          { icon: Star, label: 'Favorites' },
          { icon: Bell, label: 'Notifications' },
          { icon: HelpCircle, label: 'Help' },
          { icon: User, label: 'User' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              borderRadius: 'var(--slds-g-radius-border-1)',
              transition: 'background-color var(--slds-g-transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon style={{ width: '18px', height: '18px', color: 'var(--slds-g-color-text-default)' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
