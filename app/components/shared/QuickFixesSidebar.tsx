"use client";

import { AlertTriangleIcon, ArchiveIcon, FileEditIcon } from "../../lib/slds-icons";

interface QuickFix {
  id: string;
  title: string;
  description: string;
  scoreImpact: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  iconBg: string;
  iconColor: string;
}

const QUICK_FIXES: QuickFix[] = [
  {
    id: "contradicting-refund",
    title: "Contradicting refund policies",
    description: "2 documents have conflicting information",
    scoreImpact: "+3% score",
    icon: AlertTriangleIcon,
    iconBg: "rgba(194, 57, 52, 0.1)",
    iconColor: "var(--slds-g-color-error-base-50)"
  },
  {
    id: "archive-stale",
    title: "Archive stale pricing guide",
    description: "Product Guide v2.1 is 8 months outdated",
    scoreImpact: "+2% score",
    icon: ArchiveIcon,
    iconBg: "rgba(254, 147, 57, 0.1)",
    iconColor: "var(--slds-g-color-warning-base-50)"
  }
];

export function QuickFixesSidebar() {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        padding: 'var(--slds-g-spacing-5)',
        overflowY: 'auto',
        height: '100%'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'var(--slds-g-spacing-4)' }}>
        <h3 
          style={{
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-3)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            lineHeight: '28px',
            color: 'var(--slds-g-color-on-surface-3)',
            marginBottom: '2px',
            marginTop: 0
          }}
        >
          Quick Fixes
        </h3>
        <p 
          style={{
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-1)',
            fontWeight: 'var(--slds-g-font-weight-4)',
            lineHeight: '19px',
            color: 'var(--slds-g-color-on-surface-1)',
            margin: 0
          }}
        >
          3 issues affecting your AI readiness score
        </p>
      </div>

      {/* Quick Fix Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-4)' }}>
        {QUICK_FIXES.map(({ id, title, description, scoreImpact, icon: Icon, iconBg, iconColor }) => (
          <div
            key={id}
            className="slds-card"
            style={{
              padding: 'var(--slds-g-spacing-4)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-2)',
              transition: 'all var(--slds-g-transition-base)',
              cursor: 'pointer',
              boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 0px 4px 0px rgba(0, 0, 0, 0.2), 0px 4px 4px 0px rgba(0, 0, 0, 0.2), 0px -1px 2px 0px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Icon and Score */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--slds-g-spacing-3)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--slds-g-radius-border-1)',
                  backgroundColor: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={16} color={iconColor} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-neg-1)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  lineHeight: '17px',
                  color: '#2E844A',
                  padding: '2px var(--slds-g-spacing-2)',
                  backgroundColor: 'transparent',
                  borderRadius: 'var(--slds-g-radius-border-1)'
                }}
              >
                {scoreImpact}
              </span>
            </div>

            {/* Title */}
            <h4
              style={{
                fontFamily: 'var(--slds-g-font-family)',
                fontSize: 'var(--slds-g-font-scale-1)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                lineHeight: '19px',
                color: 'var(--slds-g-color-on-surface-1)',
                marginBottom: 'var(--slds-g-spacing-1)',
                marginTop: 0
              }}
            >
              {title}
            </h4>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--slds-g-font-family)',
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                fontWeight: 'var(--slds-g-font-weight-4)',
                lineHeight: '17px',
                color: 'var(--slds-g-color-on-surface-1)',
                marginBottom: 'var(--slds-g-spacing-3)',
                marginTop: 0
              }}
            >
              {description}
            </p>

            {/* Action Button - SLDS Cosmos Button */}
            <button
              type="button"
              className="slds-button slds-button_brand"
              style={{
                width: '100%',
                padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-3)',
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                fontFamily: 'var(--slds-g-font-family)',
                lineHeight: '18px',
                borderRadius: 'var(--slds-g-radius-border-2)',
                transition: 'all var(--slds-g-transition-base)'
              }}
            >
              Resolve
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
