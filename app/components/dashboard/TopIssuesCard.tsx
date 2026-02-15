"use client";

import React from "react";

interface TopIssue {
  id: string;
  category: string;
  healthScore: string;
  severity: "high" | "medium" | "low";
  description: string;
}

interface TopIssuesCardProps {
  issues: TopIssue[];
}

export function TopIssuesCard({ issues }: TopIssuesCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--slds-g-spacing-3, 12px)",
      }}
    >
      {/* Top Issues Header */}
      <h2
        style={{
          fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
          fontSize: "var(--slds-g-font-scale-3, 20px)",
          fontWeight: "var(--slds-g-font-weight-4, 400)",
          lineHeight: "28px",
          color: "var(--slds-g-color-on-surface-3, #03234d)",
          margin: 0,
        }}
      >
        Top Issues
      </h2>

      {/* Issue Cards */}
      {issues.map((issue) => (
            <div
              key={issue.id}
              style={{
                backgroundColor: "var(--color-neutral-100, white)",
                border: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
                borderRadius: "8px",
                padding: "var(--slds-g-spacing-4, 16px)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Title Row */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--slds-g-spacing-2, 8px)",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flex: "1 0 0",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                      fontSize: "var(--slds-g-font-scale-1, 14px)",
                      fontWeight: "var(--slds-g-font-weight-7, 700)",
                      lineHeight: "19px",
                      color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                    }}
                  >
                    {issue.category}
                  </span>
                  <span
                    className="slds-badge slds-theme_success"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      height: "25px",
                      padding: "var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-2, 8px)",
                      fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                      fontWeight: "var(--slds-g-font-weight-4, 400)",
                      lineHeight: "17px",
                      borderRadius: "4px",
                    }}
                  >
                    {issue.healthScore}
                  </span>
                </div>
                <span
                  className={`slds-badge ${
                    issue.severity === "high" ? "slds-theme_error" : "slds-theme_warning"
                  }`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    height: "25px",
                    padding: "var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-2, 8px)",
                    fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                    fontWeight: "var(--slds-g-font-weight-4, 400)",
                    lineHeight: "17px",
                    borderRadius: "4px",
                  }}
                >
                  {issue.severity === "high" ? "High" : "Medium"}
                </span>
              </div>

              {/* Description */}
              <div
                style={{
                  backgroundColor: "white",
                }}
              >
                <p
                  style={{
                    fontFamily: "'SF Pro', sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "19px",
                    color: "#444",
                    margin: 0,
                  }}
                >
                  {issue.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  className="slds-button slds-button_outline-brand"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--slds-g-spacing-1, 4px)",
                  }}
                >
                  Take action
                </button>
                <button
                  type="button"
                  className="slds-button"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--slds-g-spacing-1, 4px)",
                    color: "var(--slds-g-color-accent-2, #0250D9)",
                    background: "transparent",
                    border: "none",
                    padding: "1px var(--slds-g-spacing-4, 16px)",
                    height: "32px",
                  }}
                >
                  Dismiss
                </button>
              </div>
        </div>
      ))}
    </div>
  );
}
