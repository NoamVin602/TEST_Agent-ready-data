"use client";

import { useState } from "react";
import { 
  Database, 
  Link2, 
  Shield, 
  Wand2, 
  Search, 
  BarChart3, 
  Users,
  ChevronRight 
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  children?: { id: string; label: string; }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "connect-unify",
    label: "Connect & Unify",
    icon: Link2,
    children: [
      { id: "data-streams", label: "Data Streams" },
      { id: "data-lake", label: "Data Lake Objects" },
      { id: "data-transforms", label: "Data Transforms" },
      { id: "data-model", label: "Data Model" },
      { id: "identity", label: "Identity Resolution" },
    ]
  },
  {
    id: "govern-secure",
    label: "Govern & Secure",
    icon: Shield,
  },
  {
    id: "process-enrich",
    label: "Process & Enrich",
    icon: Wand2,
  },
  {
    id: "query-explore",
    label: "Query & Explore",
    icon: Search,
  },
  {
    id: "analyze-predict",
    label: "Analyze & Predict",
    icon: BarChart3,
  },
  {
    id: "segment-act",
    label: "Segment & Act",
    icon: Users,
  },
];

export function LeftNavigation() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["connect-unify"]);
  const [activeItem, setActiveItem] = useState("data-curation");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          width: '60px',
          backgroundColor: 'var(--slds-g-color-neutral-base-100)',
          borderRight: '1px solid var(--slds-g-color-border-1)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--slds-g-spacing-2) 0',
          transition: 'width var(--slds-g-transition-base)',
          height: '100%',
        }}
      >
        {NAV_ITEMS.map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            style={{
              width: '100%',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--slds-g-color-text-weak)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon style={{ width: '20px', height: '20px' }} />
          </button>
        ))}
        
        {/* Expand Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--slds-g-spacing-2)',
            border: 'none',
            borderTop: '1px solid var(--slds-g-color-border-1)',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            color: 'var(--slds-g-color-text-weak)',
            marginTop: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Expand
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '240px',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        borderRight: '1px solid var(--slds-g-color-border-1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        transition: 'width var(--slds-g-transition-base)',
        height: '100%'
      }}
    >
      {/* Quick Find */}
      <div style={{ padding: 'var(--slds-g-spacing-3)' }}>
        <div style={{ position: 'relative' }}>
          <Search 
            style={{
              position: 'absolute',
              left: 'var(--slds-g-spacing-2)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: 'var(--slds-g-color-text-weak)'
            }}
          />
          <input
            type="text"
            placeholder="Quick find"
            style={{
              width: '100%',
              height: '32px',
              padding: '0 var(--slds-g-spacing-2) 0 32px',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-2)',
              fontSize: 'var(--slds-g-font-scale-neg-1)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: 'var(--slds-g-spacing-2) 0' }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, children }) => (
          <div key={id}>
            <button
              type="button"
              onClick={() => children && toggleItem(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-2)',
                padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-3)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--slds-g-font-scale-1)',
                color: 'var(--slds-g-color-text-default)',
                textAlign: 'left',
                transition: 'background-color var(--slds-g-transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {children && (
                <ChevronRight 
                  style={{ 
                    width: '14px', 
                    height: '14px',
                    transform: expandedItems.includes(id) ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform var(--slds-g-transition-fast)'
                  }} 
                />
              )}
            </button>

            {/* Children */}
            {children && expandedItems.includes(id) && (
              <div style={{ paddingLeft: 'var(--slds-g-spacing-8)' }}>
                {children.map(({ id: childId, label: childLabel }) => (
                  <button
                    key={childId}
                    type="button"
                    onClick={() => setActiveItem(childId)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-3)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 'var(--slds-g-font-scale-1)',
                      color: 'var(--slds-g-color-text-weak)',
                      textAlign: 'left',
                      transition: 'all var(--slds-g-transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {childLabel}
                  </button>
                ))}
                {/* Data Curation */}
                <button
                  type="button"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-3)',
                    border: 'none',
                    backgroundColor: activeItem === "data-curation" 
                      ? 'var(--slds-g-color-brand-base-50)' 
                      : 'transparent',
                    cursor: 'pointer',
                    fontSize: 'var(--slds-g-font-scale-1)',
                    color: activeItem === "data-curation"
                      ? 'var(--slds-g-color-neutral-base-100)'
                      : 'var(--slds-g-color-text-weak)',
                    textAlign: 'left',
                    borderRadius: 'var(--slds-g-radius-border-1)',
                    fontWeight: activeItem === "data-curation"
                      ? 'var(--slds-g-font-weight-6)'
                      : 'var(--slds-g-font-weight-4)',
                    transition: 'all var(--slds-g-transition-fast)'
                  }}
                >
                  <Database style={{ width: '14px', height: '14px', marginRight: 'var(--slds-g-spacing-2)' }} />
                  Data Curation
                </button>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(true)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--slds-g-spacing-2)',
          border: 'none',
          borderTop: '1px solid var(--slds-g-color-border-1)',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 'var(--slds-g-font-scale-neg-1)',
          color: 'var(--slds-g-color-text-weak)',
          transition: 'background-color var(--slds-g-transition-fast)',
          marginTop: 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        Collapse
      </button>
    </div>
  );
}
