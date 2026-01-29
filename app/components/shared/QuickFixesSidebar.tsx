"use client";

import { AlertTriangle, Archive, FileEdit } from "lucide-react";

interface QuickFix {
  id: string;
  title: string;
  description: string;
  scoreImpact: string;
  icon: any;
  iconBg: string;
  iconColor: string;
}

const QUICK_FIXES: QuickFix[] = [
  {
    id: "contradicting-refund",
    title: "Contradicting refund policies",
    description: "2 documents have conflicting information",
    scoreImpact: "+3% score",
    icon: AlertTriangle,
    iconBg: "rgba(194, 57, 52, 0.1)",
    iconColor: "var(--slds-g-color-error-base-50)"
  },
  {
    id: "archive-stale",
    title: "Archive stale pricing guide",
    description: "Product Guide v2.1 is 8 months outdated",
    scoreImpact: "+2% score",
    icon: Archive,
    iconBg: "rgba(254, 147, 57, 0.1)",
    iconColor: "var(--slds-g-color-warning-base-50)"
  },
  {
    id: "review-drafts",
    title: "Review 3 draft articles",
    description: "Articles contain [TODO] markers",
    scoreImpact: "+1% score",
    icon: FileEdit,
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
            fontSize: 'var(--slds-g-font-scale-2)',
            fontWeight: 'var(--slds-g-font-weight-semibold)',
            color: 'var(--slds-g-color-text-default)',
            marginBottom: 'var(--slds-g-spacing-1)'
          }}
        >
          Quick Fixes
        </h3>
        <p 
          style={{
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            color: 'var(--slds-g-color-text-weak)'
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
            style={{
              padding: 'var(--slds-g-spacing-4)',
              backgroundColor: 'var(--slds-g-color-neutral-base-100)',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-2)',
              transition: 'all var(--slds-g-transition-base)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--slds-g-shadow-2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
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
                <Icon style={{ width: '16px', height: '16px', color: iconColor }} />
              </div>
              <span
                style={{
                  fontSize: 'var(--slds-g-font-scale-neg-1)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  color: 'var(--slds-g-color-success-base-50)',
                  padding: '2px var(--slds-g-spacing-2)',
                  backgroundColor: 'var(--slds-g-color-success-tint)',
                  borderRadius: 'var(--slds-g-radius-border-1)'
                }}
              >
                {scoreImpact}
              </span>
            </div>

            {/* Title */}
            <h4
              style={{
                fontSize: 'var(--slds-g-font-scale-1)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                color: 'var(--slds-g-color-text-default)',
                marginBottom: 'var(--slds-g-spacing-1)',
                lineHeight: 1.4
              }}
            >
              {title}
            </h4>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                color: 'var(--slds-g-color-text-weak)',
                marginBottom: 'var(--slds-g-spacing-3)',
                lineHeight: 1.5
              }}
            >
              {description}
            </p>

            {/* Action Button */}
            <button
              type="button"
              style={{
                width: '100%',
                padding: '6px var(--slds-g-spacing-3)',
                backgroundColor: 'var(--slds-g-color-brand-base-50)',
                border: 'none',
                borderRadius: 'var(--slds-g-radius-border-2)',
                color: 'var(--slds-g-color-neutral-base-100)',
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                cursor: 'pointer',
                transition: 'background-color var(--slds-g-transition-base)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-60)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-50)';
              }}
            >
              Resolve
            </button>
          </div>
        ))}
      </div>

      {/* Progress Footer */}
      <div
        style={{
          marginTop: 'var(--slds-g-spacing-5)',
          padding: 'var(--slds-g-spacing-4)',
          backgroundColor: 'var(--slds-g-color-neutral-base-95)',
          borderRadius: 'var(--slds-g-radius-border-2)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--slds-g-spacing-2)' }}>
          <span style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', color: 'var(--slds-g-color-text-weak)' }}>
            <strong style={{ color: 'var(--slds-g-color-text-default)' }}>1</strong> of <strong style={{ color: 'var(--slds-g-color-text-default)' }}>3</strong> resolved
          </span>
          <span style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-success-base-50)' }}>
            +5% health potential
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            borderRadius: 'var(--slds-g-radius-border-3)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: '33%',
              height: '100%',
              backgroundColor: 'var(--slds-g-color-brand-base-50)',
              transition: 'width var(--slds-g-transition-slow)'
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <button
        type="button"
        style={{
          width: '100%',
          marginTop: 'var(--slds-g-spacing-4)',
          padding: '8px var(--slds-g-spacing-4)',
          backgroundColor: 'var(--slds-g-color-brand-base-50)',
          border: 'none',
          borderRadius: 'var(--slds-g-radius-border-2)',
          color: 'var(--slds-g-color-neutral-base-100)',
          fontSize: 'var(--slds-g-font-scale-1)',
          fontWeight: 'var(--slds-g-font-weight-6)',
          cursor: 'pointer',
          transition: 'background-color var(--slds-g-transition-base)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-60)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-50)';
        }}
      >
        Resolve All Recommendations
      </button>
    </div>
  );
}
