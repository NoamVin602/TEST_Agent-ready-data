"use client";

import { motion } from "framer-motion";

export type TabId = "home" | "analysis" | "content-gaps" | "archived" | "activity" | "run-log" | "config";

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
        borderBottom: '1px solid var(--slds-g-color-border-2)',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        paddingLeft: 'var(--slds-g-spacing-4)',
        paddingRight: 'var(--slds-g-spacing-4)'
      }}
    >
      <div 
        style={{
          display: 'flex',
          gap: 'var(--slds-g-spacing-1)',
          maxWidth: '1440px',
          margin: '0 auto',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
        role="tablist"
        aria-label="Data Curation navigation"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--slds-g-spacing-2)',
              padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)',
              fontSize: 'var(--slds-g-font-scale-1)',
              fontWeight: activeTab === tab.id 
                ? 'var(--slds-g-font-weight-6)' 
                : 'var(--slds-g-font-weight-4)',
              lineHeight: 'var(--slds-g-line-height-body)',
              border: 'none',
              borderBottom: '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              color: activeTab === tab.id 
                ? 'var(--slds-g-color-brand-base-50)' 
                : 'var(--slds-g-color-text-weak)',
              whiteSpace: 'nowrap',
              transition: 'color var(--slds-g-transition-fast)',
              marginBottom: '-1px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = 'var(--slds-g-color-neutral-base-30)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = 'var(--slds-g-color-text-weak)';
              }
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
                  height: '20px',
                  padding: '0 var(--slds-g-spacing-1)',
                  borderRadius: 'var(--slds-g-radius-border-3)',
                  fontSize: 'var(--slds-g-font-scale-neg-1)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  backgroundColor: activeTab === tab.id
                    ? 'var(--slds-g-color-brand-base-50)'
                    : 'var(--slds-g-color-neutral-base-95)',
                  color: activeTab === tab.id
                    ? 'var(--slds-g-color-neutral-base-100)'
                    : 'var(--slds-g-color-text-weak)'
                }}
              >
                {tab.count}
              </span>
            )}
            {/* Blue Underline for Active Tab */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: 'var(--slds-g-color-brand-base-50)'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
