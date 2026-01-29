"use client";

import { 
  Search, 
  Sparkles, 
  Star, 
  ChevronDown, 
  Plus, 
  Award, 
  HelpCircle, 
  Settings, 
  Bell, 
  User 
} from "lucide-react";

export function GlobalHeader() {
  return (
    <div 
      style={{
        /* SLDS Global Header Blueprint */
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
        borderBottom: '1px solid #5C5C5C',
        
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left Section - Salesforce Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {/* Salesforce Cloud Logo */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
          <path d="M14 4.66667C11.7333 4.66667 9.73333 5.86667 8.8 7.73333C7.86667 7.33333 6.8 7.06667 5.73333 7.06667C2.53333 7.06667 0 9.6 0 12.8C0 16 2.53333 18.5333 5.73333 18.5333H18.2667C21.4667 18.5333 24 16 24 12.8C24 9.6 21.4667 7.06667 18.2667 7.06667C18 7.06667 17.7333 7.06667 17.4667 7.2C16.5333 5.6 15.4667 4.66667 14 4.66667Z" fill="#00A1E0"/>
        </svg>
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
              borderRadius: '20px',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#03234D',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              transition: 'all 0.15s ease-in-out',
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#0176D3';
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(1, 118, 211, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C9C9C9';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Right Section - Action Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {/* Einstein AI Icon */}
        <button
          type="button"
          title="Einstein"
          aria-label="Einstein AI"
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
          <Sparkles style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Favorites Icon */}
        <button
          type="button"
          title="Favorites"
          aria-label="Favorites"
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
          <Star style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Dropdown Icon */}
        <button
          type="button"
          title="More"
          aria-label="More options"
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
          <ChevronDown style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* New/Add Icon */}
        <button
          type="button"
          title="New"
          aria-label="Create new"
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
          <Plus style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Trailhead Icon */}
        <button
          type="button"
          title="Trailhead"
          aria-label="Trailhead"
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
          <Award style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Help/Question Icon */}
        <button
          type="button"
          title="Help"
          aria-label="Help"
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
          <HelpCircle style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Setup/Settings Icon */}
        <button
          type="button"
          title="Setup"
          aria-label="Setup"
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
          <Settings style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

        {/* Notifications Icon */}
        <button
          type="button"
          title="Notifications"
          aria-label="Notifications"
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
          <Bell style={{ width: '18px', height: '18px', color: '#5C5C5C' }} />
        </button>

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
            background: '#B0C4D9',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#9BB3CC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#B0C4D9';
          }}
        >
          <User style={{ width: '18px', height: '18px', color: '#FFFFFF' }} />
        </button>
      </div>
    </div>
  );
}
