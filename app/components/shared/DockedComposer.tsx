"use client";

import React, { useState } from "react";
import { CheckIcon, AlertTriangleIcon, ChevronDownIcon } from "../../lib/slds-icons";

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
        <div className="slds-grid slds-grid_vertical slds-gutters">
          <h2 className="slds-text-heading_section slds-m-bottom_none">
            {title}
          </h2>

          {/* Alert Banner */}
          {alertMessage && (
            <div className="slds-alert slds-alert_warning" role="alert">
              <span className="slds-assistive-text">Warning</span>
              <div className="slds-media">
                <div className="slds-media__figure">
                  <AlertTriangleIcon size={20} color="var(--slds-g-color-warning-base-40, #5C4033)" />
                </div>
                <div className="slds-media__body">
                  <p className="slds-text-body_small">{alertMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Fix Items */}
        <div className="slds-docked-composer__items">
          {visibleItemsList.map((item) => (
            <article key={item.id} className="slds-card slds-card_boundary" style={{ borderLeft: `4px solid ${item.borderColor}` }}>
              <div className="slds-card__body slds-card__body_inner">
                {/* Card Content Row */}
                <div className="slds-grid slds-grid_align-start slds-gutters_small">
                  {/* Icon */}
                  <div className="slds-docked-composer__item-icon" style={{ backgroundColor: item.iconBgColor }}>
                    {renderIcon(item.iconType, item.iconColor)}
                  </div>

                  {/* Title and Description */}
                  <div className="slds-grid slds-grid_vertical slds-col slds-grow">
                    <h3 className="slds-text-heading_small slds-m-bottom_x-small">
                      {item.title}
                    </h3>
                    <p className="slds-text-body_small slds-text-color_weak">
                      {item.description}
                    </p>
                  </div>

                  {/* Score Badge */}
                  <span className={`slds-badge ${item.scoreColor === "yellow" ? "slds-badge_warning-light" : "slds-badge_success-light"}`}>
                    {item.scoreImpact}
                  </span>
                </div>

                {/* Action Button */}
                <div className="slds-grid slds-grid_align-end slds-m-top_small">
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
            <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
              {/* Left: Resolved Count */}
              <div className="slds-grid slds-grid_vertical-align-center slds-gutters_small">
                <span className="slds-text-body_small slds-text-color_success">
                  {resolvedCount} of {totalIssues} resolved
                </span>
                {/* Progress Bar */}
                <div className="slds-progress">
                  <div className="slds-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={(resolvedCount / totalIssues) * 100} aria-label={`${resolvedCount} of ${totalIssues} resolved`}>
                    <span className="slds-progress__value" style={{ width: `${(resolvedCount / totalIssues) * 100}%` }}></span>
                  </div>
                </div>
              </div>

              {/* Right: Health Potential */}
              <span className="slds-text-body_small slds-text-heading_small">
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
        >
          <CheckIcon size={16} color="var(--slds-g-color-text-default, #181818)" />
          <span className="slds-m-left_x-small">{footerButtonLabel}</span>
        </button>
      </div>
    </div>
  );
}

