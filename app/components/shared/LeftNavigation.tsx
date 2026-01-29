"use client";

import { useState } from "react";
import { 
  SearchIcon,
  ChevronDownIcon,
  DataMappingIcon,
  ShieldIcon,
  ProcessIcon,
  TableIcon,
  ChartIcon,
  SegmentsIcon,
  DatabaseIcon,
  LightBulbIcon,
  ArrowLeftIcon
} from "../../lib/slds-icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  children?: { id: string; label: string; }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "connect-unify",
    label: "Connect & Unify",
    icon: DataMappingIcon,
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
    icon: ShieldIcon,
  },
  {
    id: "process-enrich",
    label: "Process & Enrich",
    icon: ProcessIcon,
  },
  {
    id: "query-explore",
    label: "Query & Explore",
    icon: TableIcon,
  },
  {
    id: "analyze-predict",
    label: "Analyze & Predict",
    icon: ChartIcon,
  },
  {
    id: "segment-act",
    label: "Segment & Act",
    icon: SegmentsIcon,
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
        className="slds-navigation"
        style={{
          width: '60px',
          backgroundColor: 'var(--slds-g-color-neutral-base-100)',
          borderRight: '1px solid var(--slds-g-color-border-2)',
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
            className="slds-button slds-button_icon"
            style={{
              width: '100%',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--slds-g-color-icon-default)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon size={20} />
          </button>
        ))}
        
        {/* Expand Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(false)}
          className="slds-button slds-button_neutral"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--slds-g-spacing-2)',
            border: 'none',
            borderTop: '1px solid var(--slds-g-color-border-2)',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 'var(--slds-g-font-scale-base)',
            color: 'var(--slds-g-color-on-surface-1)',
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
      className="slds-navigation"
      style={{
        width: '220px',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        borderRight: '1px solid var(--slds-g-color-border-2)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        transition: 'width var(--slds-g-transition-base)',
        height: '100%'
      }}
    >
      {/* Quick Find Search */}
      <div style={{ padding: 'var(--slds-g-spacing-4) var(--slds-g-spacing-4) var(--slds-g-spacing-3)' }}>
        <div className="slds-form-element" style={{ position: 'relative' }}>
          <div className="slds-form-element__control slds-input-has-icon_left">
            <SearchIcon 
              className="slds-input__icon slds-input__icon_left"
              size={14}
              color="var(--slds-g-color-icon-default)"
              style={{
                position: 'absolute',
                left: 'var(--slds-g-spacing-2)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              className="slds-input"
              placeholder="Quick find"
              style={{
                width: '100%',
                height: '32px',
                paddingLeft: '32px',
                fontSize: 'var(--slds-g-font-scale-base)',
                fontFamily: 'var(--slds-g-font-family)',
                fontWeight: 'var(--slds-g-font-weight-4)',
                lineHeight: '18px',
                color: 'var(--slds-g-color-on-surface-2)',
                border: '1px solid var(--slds-g-color-border-2)',
                borderRadius: 'var(--slds-g-radius-border-2)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: 0 }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, children }) => (
          <div key={id}>
            <button
              type="button"
              onClick={() => children && toggleItem(id)}
              className="slds-navigation__item"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-2)',
                padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--slds-g-font-scale-base)',
                fontFamily: 'var(--slds-g-font-family)',
                fontWeight: 'var(--slds-g-font-weight-4)',
                lineHeight: '18px',
                color: 'var(--slds-g-color-on-surface-2)',
                textAlign: 'left',
                transition: 'background-color var(--slds-g-transition-fast)',
                height: '34px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon size={16} color="var(--slds-g-color-icon-default)" style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {children && (
                <ChevronDownIcon 
                  size={14}
                  color="var(--slds-g-color-icon-default)"
                  style={{ 
                    transform: expandedItems.includes(id) ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform var(--slds-g-transition-fast)',
                    flexShrink: 0
                  }} 
                />
              )}
            </button>

            {/* Children */}
            {children && expandedItems.includes(id) && (
              <div style={{ paddingLeft: 0 }}>
                {children.map(({ id: childId, label: childLabel }) => (
                  <button
                    key={childId}
                    type="button"
                    onClick={() => setActiveItem(childId)}
                    className="slds-navigation__item"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      fontFamily: 'var(--slds-g-font-family)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '18px',
                      color: 'var(--slds-g-color-on-surface-2)',
                      textAlign: 'left',
                      transition: 'all var(--slds-g-transition-fast)',
                      height: '34px'
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
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Data Curation - Active State (Above Collapse Button) */}
      <div
        className="slds-navigation__item slds-is-active"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--slds-g-spacing-2)',
          padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
          borderLeft: '5px solid var(--slds-g-color-accent-2)',
          borderTop: '1px solid var(--slds-g-color-border-2)',
          backgroundColor: 'var(--slds-g-color-electric-blue-90)',
          cursor: 'pointer',
          fontSize: 'var(--slds-g-font-scale-base)',
          fontFamily: 'var(--slds-g-font-family)',
          fontWeight: 'var(--slds-g-font-weight-6)',
          lineHeight: '18px',
          color: 'var(--slds-g-color-electric-blue-30)',
          textAlign: 'left',
          transition: 'all var(--slds-g-transition-fast)',
          height: '34px',
          marginTop: 'auto'
        }}
        onClick={() => setActiveItem("data-curation")}
      >
        <LightBulbIcon 
          size={16} 
          color="var(--slds-g-color-electric-blue-30)" 
          style={{ flexShrink: 0 }} 
        />
        <span style={{ flex: 1 }}>Data Curation</span>
      </div>

      {/* Collapse Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(true)}
        className="slds-button slds-button_neutral"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--slds-g-spacing-2)',
          padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
          border: 'none',
          borderTop: '1px solid var(--slds-g-color-border-2)',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 'var(--slds-g-font-scale-base)',
          fontFamily: 'var(--slds-g-font-family)',
          fontWeight: 'var(--slds-g-font-weight-4)',
          lineHeight: '18px',
          color: 'var(--slds-g-color-on-surface-1)',
          textAlign: 'left',
          transition: 'background-color var(--slds-g-transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ArrowLeftIcon 
          size={16}
          color="var(--slds-g-color-icon-default)"
          style={{ flexShrink: 0 }}
        />
        <span style={{ flex: 1 }}>Collapse</span>
      </button>
    </div>
  );
}
