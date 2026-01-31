"use client";

import React, { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "../../lib/slds-icons";

interface QuickFixItem {
  id: string;
  title: string;
  description: string;
  scoreImpact: string;
  scoreColor: "yellow" | "green";
  actionButton: string;
  borderColor: string;
  iconBgColor: string;
  iconColor: string;
  iconType: "check" | "archive" | "email" | "note" | "task";
  onResolve?: () => void;
}

interface DockedComposerProps {
  title: string;
  items: QuickFixItem[];
  alertMessage?: string;
  resolvedCount?: number;
  totalIssues?: number;
  totalScorePotential?: number;
  footerButtonLabel?: string;
  onFooterButtonClick?: () => void;
}

/**
 * SLDS Docked Composer Component for Quick Fixes
 * Based on Salesforce Lightning Design System Docked Composer pattern
 * Uses only SLDS classes - no inline styles
 */
export function DockedComposer({
  title,
  items,
  alertMessage,
  resolvedCount = 0,
  totalIssues = 0,
  totalScorePotential = 0,
  footerButtonLabel = "Resolve All Recommendations",
  onFooterButtonClick,
}: DockedComposerProps) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(
    new Set(items.map((item) => item.id))
  );

  const handleResolve = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.onResolve) {
      item.onResolve();
    }
  };

  const visibleItemsList = items.filter((item) => visibleItems.has(item.id));

  const renderIcon = (iconType: QuickFixItem["iconType"], color: string) => {
    const iconSize = 20;
    switch (iconType) {
      case "check":
        return <CheckIcon size={iconSize} color={color} />;
      case "archive":
        return <ChevronDownIcon size={iconSize} color={color} />;
      default:
        return <CheckIcon size={iconSize} color={color} />;
    }
  };

  return (
    <div className="slds-docked-composer">
      {/* Body */}
      <div className="slds-docked-composer__body">
        {/* Title Section */}
        <div className="slds-grid slds-grid_vertical">
          <h2 className="slds-text-heading_section slds-m-bottom_medium">
            {title}
          </h2>
        </div>

        {/* Quick Fix Items */}
        <div className="slds-docked-composer__items">
          {visibleItemsList.map((item) => (
            <article key={item.id} className="slds-card slds-card_boundary" style={{ borderLeft: `4px solid ${item.borderColor}` }}>
              <div className="slds-card__body slds-card__body_inner">
                {/* Top: Badge */}
                <div className="slds-grid slds-grid_align-end slds-m-bottom_small" style={{ width: '100%' }}>
                  <span className={`slds-badge ${item.scoreColor === "yellow" ? "slds-badge_warning-light" : "slds-badge_success-light"}`}>
                    {item.scoreImpact}
                  </span>
                </div>

                {/* Middle: Title and Description */}
                <div className="slds-grid slds-grid_vertical slds-m-bottom_small" style={{ width: '100%' }}>
                  <h3 className="slds-text-heading_small slds-m-bottom_x-small" style={{ marginTop: 0 }}>
                    {item.title}
                  </h3>
                  <p className="slds-text-body_small slds-text-color_weak" style={{ marginBottom: 0 }}>
                    {item.description}
                  </p>
                </div>

                {/* Bottom: Action Button */}
                <div className="slds-grid slds-grid_align-end" style={{ width: '100%' }}>
                  <button
                    type="button"
                    className="slds-button slds-button_neutral"
                    onClick={() => handleResolve(item.id)}
                  >
                    {item.actionButton}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Resolution Summary */}
        {totalIssues > 0 && (
          <div className="slds-docked-composer__summary">
            <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ width: '100%', gap: 'var(--slds-g-spacing-4)' }}>
              {/* Left: Resolved Count and Progress Bar */}
              <div className="slds-grid slds-grid_vertical" style={{ flex: 1, minWidth: 0, gap: 'var(--slds-g-spacing-2)' }}>
                <span 
                  className="slds-text-body_small" 
                  style={{ 
                    whiteSpace: 'nowrap',
                    color: 'var(--slds-g-color-success-base-50, #2E844A)',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                    fontWeight: 'var(--slds-g-font-weight-4, 400)',
                    lineHeight: 'var(--slds-g-line-height-base, 1.5)'
                  }}
                >
                  {resolvedCount} of {totalIssues} resolved
                </span>
                {/* SLDS Progress Bar */}
                <div 
                  className="slds-progress-bar" 
                  role="progressbar" 
                  aria-valuemin={0} 
                  aria-valuemax={totalIssues} 
                  aria-valuenow={resolvedCount} 
                  aria-label={`${resolvedCount} of ${totalIssues} resolved`}
                >
                  <span 
                    className="slds-progress-bar__value" 
                    style={{ width: `${(resolvedCount / totalIssues) * 100}%` }}
                  ></span>
                </div>
              </div>

              {/* Right: Health Potential */}
              <span 
                className="slds-text-body_small" 
                style={{ 
                  whiteSpace: 'nowrap', 
                  flexShrink: 0,
                  color: 'var(--slds-g-color-text-weak, #747474)',
                  fontFamily: 'var(--slds-g-font-family)',
                  fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                  fontWeight: 'var(--slds-g-font-weight-semibold, 600)',
                  lineHeight: 'var(--slds-g-line-height-base, 1.5)'
                }}
              >
                +{totalScorePotential}% health potential
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="slds-docked-composer__footer">
        <button
          type="button"
          className="slds-button slds-button_neutral slds-button_full-width"
          onClick={onFooterButtonClick}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--slds-g-spacing-1)' }}
        >
          <CheckIcon size={16} color="var(--slds-g-color-text-default, #181818)" />
          <span>{footerButtonLabel}</span>
        </button>
      </div>
    </div>
  );
}

