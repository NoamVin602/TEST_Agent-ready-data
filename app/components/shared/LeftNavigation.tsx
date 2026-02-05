"use client";

import { useState } from "react";
import { 
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DataMappingIcon,
  ShieldIcon,
  ProcessIcon,
  TableIcon,
  ChartIcon,
  SegmentsIcon
} from "../../lib/slds-icons";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  children?: { id: string; label: string; isActive?: boolean }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "connect-unify",
    label: "Connect & Unify",
    icon: DataMappingIcon,
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
    children: [
      { id: "data-health", label: "Data Health", isActive: true },
      { id: "intelligent-context", label: "Intelligent Context" },
      { id: "document-ai", label: "Document AI" },
      { id: "search-indexes", label: "Search Indexes" },
      { id: "data-catalog", label: "Data Catalog & Lineage" },
    ]
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

interface LeftNavigationProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export function LeftNavigation({ onCollapseChange }: LeftNavigationProps = {}) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["process-enrich"]);
  const [activeItem, setActiveItem] = useState("data-health");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    onCollapseChange?.(collapsed);
  };

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
          borderRight: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--slds-g-spacing-2) 0',
          transition: 'width var(--slds-g-transition-base)',
          height: '100%',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
              <Icon size={16} color="var(--slds-g-color-icon-default)" />
            </button>
          ))}
        </div>
        
        {/* Expand Button */}
        <div className="slds-nav-vertical__item" style={{ borderTop: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))', marginTop: 'auto' }}>
          <button
            type="button"
            onClick={() => handleCollapseToggle(false)}
            className="slds-nav-vertical__action"
            aria-label="Expand navigation"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--slds-g-spacing-2)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 'var(--slds-g-font-scale-base)',
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 'var(--slds-g-font-weight-4)',
              lineHeight: '18px',
              color: 'var(--slds-g-color-on-surface-1)',
              textAlign: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M12.8617 2.9847C12.8617 2.82149 12.9265 2.66496 13.0419 2.54955C13.1573 2.43415 13.3139 2.36931 13.4771 2.36931H14.7694C14.9326 2.36931 15.0891 2.43415 15.2045 2.54955C15.3199 2.66496 15.3848 2.82149 15.3848 2.9847V13.0155C15.3848 13.1787 15.3199 13.3352 15.2045 13.4506C15.0891 13.566 14.9326 13.6309 14.7694 13.6309H13.5079C13.4271 13.6309 13.347 13.6149 13.2724 13.584C13.1977 13.5531 13.1299 13.5078 13.0727 13.4506C13.0156 13.3935 12.9703 13.3256 12.9393 13.251C12.9084 13.1763 12.8925 13.0963 12.8925 13.0155L12.8617 2.9847ZM0.615479 7.38471C0.622978 7.22391 0.690247 7.0717 0.804073 6.95787C0.917899 6.84405 1.07009 6.77681 1.23089 6.76932H6.58477C6.67158 6.78185 6.7601 6.76549 6.8367 6.72277C6.9133 6.68006 6.97374 6.61335 7.00871 6.53291C7.04369 6.45248 7.05125 6.36278 7.03024 6.27762C7.00924 6.19246 6.96082 6.11657 6.89246 6.06163L5.41548 4.58471C5.30278 4.46971 5.23958 4.31501 5.23958 4.15395C5.23958 3.99289 5.30278 3.83819 5.41548 3.72319L6.27707 2.80008C6.33143 2.74519 6.39613 2.70162 6.46743 2.67189C6.53873 2.64215 6.61521 2.62684 6.69246 2.62684C6.76971 2.62684 6.84619 2.64215 6.91749 2.67189C6.98879 2.70162 7.05348 2.74519 7.10784 2.80008L11.7232 7.56929C11.7837 7.62678 11.8319 7.69598 11.8649 7.77268C11.8978 7.84938 11.9148 7.93197 11.9148 8.01544C11.9148 8.09891 11.8978 8.18151 11.8649 8.25821C11.8319 8.33491 11.7837 8.40411 11.7232 8.4616L7.10784 13.1693C7.05348 13.2242 6.98879 13.2678 6.91749 13.2975C6.84619 13.3272 6.76971 13.3425 6.69246 13.3425C6.61521 13.3425 6.53873 13.3272 6.46743 13.2975C6.39613 13.2678 6.33143 13.2242 6.27707 13.1693L5.41548 12.3078C5.35498 12.2503 5.30679 12.1811 5.27386 12.1044C5.24093 12.0277 5.22395 11.9451 5.22395 11.8616C5.22395 11.7781 5.24093 11.6955 5.27386 11.6188C5.30679 11.5421 5.35498 11.4729 5.41548 11.4154L6.86169 9.93848C6.91534 9.88263 6.95162 9.81241 6.96612 9.73633C6.98063 9.66026 6.97275 9.58162 6.94343 9.50994C6.9141 9.43826 6.8646 9.37664 6.80093 9.33255C6.73726 9.28846 6.66217 9.2638 6.58477 9.26156H1.23089C1.06738 9.24678 0.914876 9.17309 0.801699 9.05423C0.688522 8.93536 0.622322 8.77941 0.615479 8.6154V7.38464Z" fill="#747474"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="slds-navigation"
      style={{
        width: '220px',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        borderRight: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
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
                border: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
                borderRadius: 'var(--slds-g-radius-border-2)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav style={{ flex: 1, padding: 0 }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, children }) => {
          const isExpanded = expandedItems.includes(id);
          return (
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
                <Icon size={16} color="var(--slds-g-color-icon-default)" />
                <span style={{ flex: 1 }}>{label}</span>
                {children && (
                  isExpanded ? (
                    <ChevronUpIcon 
                      size={14}
                      color="var(--slds-g-color-icon-default)"
                      style={{ 
                        transition: 'transform var(--slds-g-transition-fast)',
                        flexShrink: 0
                      }} 
                    />
                  ) : (
                    <ChevronDownIcon 
                      size={14}
                      color="var(--slds-g-color-icon-default)"
                      style={{ 
                        transition: 'transform var(--slds-g-transition-fast)',
                        flexShrink: 0
                      }} 
                    />
                  )
                )}
              </button>

              {/* Children */}
              {children && isExpanded && (
                <div style={{ paddingLeft: 0 }}>
                  {children.map(({ id: childId, label: childLabel, isActive }) => {
                    const isChildActive = activeItem === childId || isActive;
                    return (
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
                          paddingLeft: '38px',
                          border: 'none',
                          borderLeft: isChildActive ? '2px solid var(--slds-g-color-electric-blue-50, #066afe)' : 'none',
                          background: isChildActive ? 'var(--slds-g-color-electric-blue-90, #d6e6ff)' : 'transparent',
                          cursor: 'pointer',
                          fontSize: 'var(--slds-g-font-scale-base)',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: isChildActive ? 'var(--slds-g-font-weight-6)' : 'var(--slds-g-font-weight-4)',
                          lineHeight: '18px',
                          color: isChildActive ? 'var(--slds-g-color-on-surface-3, #03234d)' : 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                          textAlign: 'left',
                          transition: 'all var(--slds-g-transition-fast)',
                          height: '34px'
                        }}
                        onMouseEnter={(e) => {
                          if (!isChildActive) {
                            e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isChildActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {childLabel}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="slds-nav-vertical__item" style={{ borderTop: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))' }}>
        <button
          type="button"
          onClick={() => handleCollapseToggle(true)}
          className="slds-nav-vertical__action"
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
            color: 'var(--slds-g-color-on-surface-1)',
            textAlign: 'left',
            transition: 'background-color var(--slds-g-transition-fast)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M3.13831 13.0153C3.13831 13.1785 3.07348 13.335 2.95807 13.4504C2.84266 13.5658 2.68614 13.6307 2.52293 13.6307H1.23062C1.06741 13.6307 0.910883 13.5658 0.795476 13.4504C0.680069 13.335 0.615234 13.1785 0.615234 13.0153V2.98453C0.615234 2.82132 0.680069 2.66479 0.795476 2.54938C0.910883 2.43398 1.06741 2.36914 1.23062 2.36914H2.49216C2.57297 2.36914 2.65299 2.38506 2.72765 2.41598C2.80232 2.44691 2.87016 2.49224 2.9273 2.54938C2.98444 2.60653 3.02977 2.67437 3.0607 2.74903C3.09162 2.82369 3.10754 2.90371 3.10754 2.98453L3.13831 13.0153ZM15.3845 8.61529C15.377 8.77609 15.3097 8.9283 15.1959 9.04213C15.0821 9.15595 14.9299 9.22319 14.7691 9.23068H9.41523C9.32842 9.21815 9.2399 9.23451 9.1633 9.27723C9.0867 9.31994 9.02626 9.38665 8.99129 9.46709C8.95631 9.54752 8.94875 9.63722 8.96976 9.72238C8.99076 9.80754 9.03918 9.88343 9.10754 9.93837L10.5845 11.4153C10.6972 11.5303 10.7604 11.685 10.7604 11.8461C10.7604 12.0071 10.6972 12.1618 10.5845 12.2768L9.72293 13.1999C9.66857 13.2548 9.60387 13.2984 9.53257 13.3281C9.46128 13.3578 9.38479 13.3731 9.30754 13.3731C9.23029 13.3731 9.15381 13.3578 9.08251 13.3281C9.01121 13.2984 8.94652 13.2548 8.89216 13.1999L4.27677 8.43068C4.21626 8.37319 4.16807 8.30399 4.13514 8.22729C4.10221 8.15059 4.08523 8.068 4.08523 7.98453C4.08523 7.90106 4.10221 7.81846 4.13514 7.74176C4.16807 7.66506 4.21626 7.59586 4.27677 7.53837L8.89216 2.83068C8.94652 2.77579 9.01121 2.73222 9.08251 2.70249C9.15381 2.67275 9.23029 2.65744 9.30754 2.65744C9.38479 2.65744 9.46128 2.67275 9.53257 2.70249C9.60387 2.73222 9.66857 2.77579 9.72293 2.83068L10.5845 3.69222C10.645 3.74971 10.6932 3.81891 10.7261 3.89561C10.759 3.97231 10.776 4.0549 10.776 4.13837C10.776 4.22184 10.759 4.30444 10.7261 4.38114C10.6932 4.45784 10.645 4.52704 10.5845 4.58453L9.13831 6.06145C9.08466 6.1173 9.04838 6.18752 9.03388 6.2636C9.01937 6.33967 9.02725 6.41831 9.05657 6.48999C9.0859 6.56167 9.1354 6.62329 9.19906 6.66738C9.26273 6.71147 9.33782 6.73613 9.41523 6.73837H14.7691C14.9326 6.75315 15.0851 6.82684 15.1983 6.9457C15.3115 7.06457 15.3777 7.22052 15.3845 7.38453V8.61529Z" fill="#747474"/>
          </svg>
          <span className="slds-nav-vertical__action-text" style={{ flex: 1 }}>Collapse</span>
        </button>
      </div>
    </div>
  );
}
