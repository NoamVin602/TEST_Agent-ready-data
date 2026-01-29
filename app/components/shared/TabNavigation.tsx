"use client";

import { motion } from "framer-motion";

export type TabId = "home" | "analysis" | "content-gaps" | "archived" | "activity" | "run-log" | "config" | "curation";

interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'sticky',
        top: '64px', // Sticks below PageHeader (64px) within scrollable area
        zIndex: 899,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0',
          padding: '0',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 16px',
                backgroundColor: isActive ? 'rgba(2, 80, 217, 1)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid rgba(2, 80, 217, 1)' : '3px solid transparent',
                fontFamily: 'var(--slds-g-font-family)',
                fontSize: 'var(--slds-g-font-scale-base)', // 13px
                fontWeight: isActive ? 'var(--slds-g-font-weight-6)' : 'var(--slds-g-font-weight-4)', // Semibold for active, Regular for inactive
                lineHeight: '19px',
                color: isActive ? '#FFFFFF' : '#5C5C5C',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out',
                outline: 'none',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#03234D';
                  e.currentTarget.style.backgroundColor = '#F3F3F3';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#5C5C5C';
                  e.currentTarget.style.backgroundColor = 'transparent';
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
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '20px',
                    height: '18px',
                    padding: '0 6px',
                    borderRadius: '9px',
                    backgroundColor: isActive ? '#FFFFFF' : '#C9C9C9',
                    color: isActive ? 'rgba(2, 80, 217, 1)' : '#5C5C5C', // Dark gray text for inactive badges
                    fontSize: '11px',
                    fontWeight: 'var(--slds-g-font-weight-6)', // Semibold
                    lineHeight: '18px',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
