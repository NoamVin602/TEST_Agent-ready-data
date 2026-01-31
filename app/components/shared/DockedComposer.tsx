"use client";

import React, { useState } from "react";
import { CheckIcon, EmailIcon, TaskIcon, NoteIcon, XIcon, AlertTriangleIcon, ChevronDownIcon } from "../../lib/slds-icons";

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
 * https://sds-site-docs-1fea39e7763a.herokuapp.com/index.html?path=/docs/components-docked-composer--documentation
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
      case "email":
        return <EmailIcon size={iconSize} color={color} />;
      case "note":
        return <NoteIcon size={iconSize} color={color} />;
      case "task":
        return <TaskIcon size={iconSize} color={color} />;
      default:
        return <TaskIcon size={iconSize} color={color} />;
    }
  };

  return (
    <div
      className="slds-docked-composer"
      style={{
        backgroundColor: "var(--slds-g-color-surface-container-1, #FFFFFF)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "hidden",
        position: "relative",
        borderRadius: "var(--slds-g-radius-border-4, 20px) var(--slds-g-radius-border-4, 20px) 0 0",
        boxShadow:
          "0px 0px 7px 0px rgba(0, 0, 0, 0.14), 0px -5px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Body */}
      <div
        style={{
          backgroundColor: "var(--slds-g-color-surface-container-1, #FFFFFF)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          overflow: "hidden",
          padding: "var(--slds-g-spacing-4, 16px)",
          position: "relative",
          flexShrink: 0,
          width: "100%",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Title Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--slds-g-spacing-4, 16px)",
            position: "relative",
            flexShrink: 0,
            width: "100%",
          }}
        >
          <h2
            className="slds-text-heading_section"
            style={{
              fontFamily: "var(--slds-g-font-family)",
              fontSize: "var(--slds-g-font-scale-4, 24px)",
              fontWeight: "var(--slds-g-font-weight-4, 400)",
              lineHeight: "32px",
              color: "var(--slds-g-color-on-surface-2, #2E2E2E)",
              margin: 0,
            }}
          >
            {title}
          </h2>

          {/* Alert Banner */}
          {alertMessage && (
            <div
              style={{
                backgroundColor: "#FEF4E6",
                borderRadius: "var(--slds-g-radius-border-2, 8px)",
                padding: "var(--slds-g-spacing-3, 12px)",
                display: "flex",
                alignItems: "center",
                gap: "var(--slds-g-spacing-2, 8px)",
              }}
            >
              <AlertTriangleIcon size={20} color="#5C4033" />
              <span
                style={{
                  fontFamily: "var(--slds-g-font-family)",
                  fontSize: "var(--slds-g-font-scale-1, 14px)",
                  fontWeight: "var(--slds-g-font-weight-4, 400)",
                  lineHeight: "19px",
                  color: "#181818",
                }}
              >
                {alertMessage}
              </span>
            </div>
          )}
        </div>

        {/* Quick Fix Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--slds-g-spacing-3, 12px)",
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
            marginTop: "var(--slds-g-spacing-4, 16px)",
          }}
        >
          {visibleItemsList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--slds-g-radius-border-2, 8px)",
                border: "1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))",
                borderLeft: `4px solid ${item.borderColor}`,
                padding: "var(--slds-g-spacing-4, 16px)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--slds-g-spacing-3, 12px)",
              }}
            >
              {/* Card Content Row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--slds-g-spacing-3, 12px)" }}>
                {/* Icon */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--slds-g-radius-border-1, 4px)",
                    backgroundColor: item.iconBgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {renderIcon(item.iconType, item.iconColor)}
                </div>

                {/* Title and Description */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: "var(--slds-g-font-family)",
                      fontSize: "var(--slds-g-font-scale-1, 14px)",
                      fontWeight: "var(--slds-g-font-weight-6, 590)",
                      lineHeight: "19px",
                      color: "#181818",
                      marginBottom: "var(--slds-g-spacing-1, 4px)",
                      marginTop: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--slds-g-font-family)",
                      fontSize: "var(--slds-g-font-scale-1, 14px)",
                      fontWeight: "var(--slds-g-font-weight-4, 400)",
                      lineHeight: "19px",
                      color: "#747474",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Score Badge */}
                <span
                  style={{
                    backgroundColor: item.scoreColor === "yellow" ? "#FEF4E6" : "#E8F5EC",
                    color: item.scoreColor === "yellow" ? "#5C4033" : "#0B5D1E",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                    fontWeight: "var(--slds-g-font-weight-6, 590)",
                    fontFamily: "var(--slds-g-font-family)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {item.scoreImpact}
                </span>
              </div>

              {/* Action Button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="slds-button slds-button_neutral"
                  onClick={() => handleResolve(item.id)}
                  style={{
                    borderColor: "rgba(2, 80, 217, 1)",
                    color: "rgba(2, 80, 217, 1)",
                  }}
                >
                  {item.actionButton}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resolution Summary */}
        {totalIssues > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--slds-g-spacing-3, 12px)",
              backgroundColor: "#F3F3F3",
              borderRadius: "var(--slds-g-radius-border-2, 8px)",
              marginTop: "var(--slds-g-spacing-4, 16px)",
              flexShrink: 0,
            }}
          >
            {/* Left: Resolved Count */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--slds-g-spacing-2, 8px)" }}>
              <span
                style={{
                  fontFamily: "var(--slds-g-font-family)",
                  fontSize: "var(--slds-g-font-scale-1, 14px)",
                  fontWeight: "var(--slds-g-font-weight-4, 400)",
                  color: "#2E844A",
                }}
              >
                {resolvedCount} of {totalIssues} resolved
              </span>
              {/* Progress Bar */}
              <div
                style={{
                  width: "120px",
                  height: "8px",
                  backgroundColor: "#E5E5E5",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(resolvedCount / totalIssues) * 100}%`,
                    height: "100%",
                    backgroundColor: "#2E844A",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            {/* Right: Health Potential */}
            <span
              style={{
                fontFamily: "var(--slds-g-font-family)",
                fontSize: "var(--slds-g-font-scale-1, 14px)",
                fontWeight: "var(--slds-g-font-weight-6, 590)",
                color: "#181818",
              }}
            >
              +{totalScorePotential}% health potential
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "var(--slds-g-color-surface-container-1, #FFFFFF)",
          borderTop: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
          display: "flex",
          gap: "10px",
          height: "56px",
          alignItems: "center",
          justifyContent: "flex-end",
          overflow: "hidden",
          paddingLeft: "var(--slds-g-spacing-2, 8px)",
          paddingRight: "var(--slds-g-spacing-2, 8px)",
          paddingTop: "var(--slds-g-spacing-3, 12px)",
          paddingBottom: "var(--slds-g-spacing-3, 12px)",
          position: "relative",
          flexShrink: 0,
          width: "100%",
        }}
      >
        <button
          type="button"
          onClick={onFooterButtonClick}
          style={{
            width: "100%",
            padding: "var(--slds-g-spacing-3, 12px) var(--slds-g-spacing-4, 16px)",
            backgroundColor: "#F3F3F3",
            border: "1px solid #747474",
            borderRadius: "var(--slds-g-radius-border-2, 8px)",
            color: "#181818",
            fontFamily: "var(--slds-g-font-family)",
            fontSize: "var(--slds-g-font-scale-1, 14px)",
            fontWeight: "var(--slds-g-font-weight-6, 590)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--slds-g-spacing-2, 8px)",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E5E5E5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F3F3F3";
          }}
        >
          <CheckIcon size={16} color="#181818" />
          <span>{footerButtonLabel}</span>
        </button>
      </div>
    </div>
  );
}
