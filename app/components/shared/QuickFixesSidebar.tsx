"use client";

import { useState } from "react";
import { AlertTriangleIcon, ArchiveIcon, ChevronDownIcon, CheckIcon } from "../../lib/slds-icons";

interface QuickFix {
  id: string;
  title: string;
  description: string;
  scoreImpact: string;
  stepTitle: string;
  stepDescription: string;
  badgeType: "warning" | "error" | "info";
}

const QUICK_FIXES: QuickFix[] = [
  {
    id: "contradicting-refund",
    title: "Contradicting content",
    description: "2 documents have conflicting information",
    scoreImpact: "+3% score",
    stepTitle: "Create Unstructured Data Model Object(s)",
    stepDescription: "Create an Unstructured Data Lake Object from your external source, which will automatically map to an Unstructured Data Model Object you can use for agent grounding.",
    badgeType: "warning"
  },
  {
    id: "archive-stale",
    title: "Archive stale pricing guide",
    description: "Product Guide v2.1 is 8 months outdated",
    scoreImpact: "+2% score",
    stepTitle: "Archive Outdated Content",
    stepDescription: "Archive the outdated pricing guide to improve data quality and prevent confusion.",
    badgeType: "warning"
  }
];

export function QuickFixesSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getBadgeClassName = (badgeType: string) => {
    switch (badgeType) {
      case "warning":
        return "slds-badge slds-theme_warning";
      case "error":
        return "slds-badge slds-theme_error";
      default:
        return "slds-badge";
    }
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        padding: 'var(--slds-g-spacing-4)',
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

      {/* Quick Fix Cards with PUDA Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-3)' }}>
        {QUICK_FIXES.map(({ id, title, description, scoreImpact, stepTitle, stepDescription, badgeType }) => {
          const isExpanded = expandedItems.includes(id);
          // Badge className is now handled directly in the JSX

          return (
            <div
              key={id}
              className="slds-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--slds-g-radius-border-4)',
                padding: 'var(--slds-g-spacing-4)',
                border: '1px solid var(--slds-g-color-border-1)',
                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Header - Chevron + Title + Badge */}
              <div
                className="slds-grid slds-grid_vertical-align-center"
                style={{
                  gap: 'var(--slds-g-spacing-2)',
                  marginBottom: isExpanded ? 'var(--slds-g-spacing-3)' : 0,
                  cursor: 'pointer'
                }}
                onClick={() => toggleItem(id)}
              >
                {/* Chevron */}
                <div
                  style={{
                    padding: 'var(--slds-g-spacing-1) 6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ChevronDownIcon
                    size={16}
                    color="var(--slds-g-color-on-surface-1)"
                    style={{
                      transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                      transition: 'transform var(--slds-g-transition-base)'
                    }}
                  />
                </div>

                {/* Title */}
                <div style={{ flex: 1, minWidth: 0 }}>
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
                    {title}
                  </p>
                </div>

                {/* Badge */}
                <span className={getBadgeClassName(badgeType)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertTriangleIcon size={12} color="currentColor" />
                  <span>Warning</span>
                </span>
              </div>

              {/* PUDA Steps Content - Expanded */}
              {isExpanded && (
                <div
                  className="slds-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--slds-g-radius-border-3)',
                    padding: 0,
                    marginTop: 'var(--slds-g-spacing-3)'
                  }}
                >
                  <div style={{ padding: 'var(--slds-g-spacing-2)' }}>
                    {/* Step with Checkbox */}
                    <div className="slds-grid" style={{ gap: 'var(--slds-g-spacing-2)' }}>
                      {/* Status Column - Checkbox with Line */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: '26px',
                          flexShrink: 0
                        }}
                      >
                        {/* Top Line (hidden for first step) */}
                        <div
                          style={{
                            width: '2px',
                            height: '4px',
                            backgroundColor: 'var(--slds-g-color-border-1)',
                            opacity: 0
                          }}
                        />
                        {/* Checkbox Button */}
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: 'var(--slds-g-radius-border-1)',
                            backgroundColor: '#056764',
                            border: '1px solid #056764',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <CheckIcon size={16} color="#FFFFFF" />
                        </div>
                        {/* Bottom Line */}
                        <div
                          style={{
                            width: '2px',
                            flex: 1,
                            minHeight: '4px',
                            backgroundColor: 'var(--slds-g-color-border-1)',
                            opacity: 0
                          }}
                        />
                      </div>

                      {/* Step Detail */}
                      <div style={{ flex: 1, minWidth: 0, paddingBottom: 'var(--slds-g-spacing-2)' }}>
                        <div
                          className="slds-grid slds-grid_align-spread slds-grid_vertical-align-start"
                          style={{
                            gap: 'var(--slds-g-spacing-6)',
                            alignItems: 'flex-start'
                          }}
                        >
                          {/* Title and Description */}
                          <div style={{ flex: 1, minWidth: 0, paddingTop: 'var(--slds-g-spacing-1)' }}>
                            <h4
                              style={{
                                fontFamily: 'var(--slds-g-font-family)',
                                fontSize: 'var(--slds-g-font-scale-2)',
                                fontWeight: 'var(--slds-g-font-weight-6)',
                                lineHeight: '22px',
                                color: '#444444',
                                marginBottom: 'var(--slds-g-spacing-1)',
                                marginTop: 0
                              }}
                            >
                              {stepTitle}
                            </h4>
                            <p
                              style={{
                                fontFamily: 'var(--slds-g-font-family)',
                                fontSize: 'var(--slds-g-font-scale-1)',
                                fontWeight: 'var(--slds-g-font-weight-4)',
                                lineHeight: '19px',
                                color: '#444444',
                                margin: 0
                              }}
                            >
                              {stepDescription}
                            </p>
                          </div>

                          {/* Quick Fix Button */}
                          <div style={{ flexShrink: 0 }}>
                            <button
                              type="button"
                              className="slds-button slds-button_neutral"
                            >
                              Quick Fix
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
