"use client";

export type Severity = "high" | "medium" | "low";

interface SeverityBadgeProps {
  severity: Severity;
}

const severityConfig = {
  high: {
    label: "High",
    backgroundColor: "var(--slds-g-color-error-tint)",
    color: "var(--slds-g-color-error-base-50)"
  },
  medium: {
    label: "Medium",
    backgroundColor: "var(--slds-g-color-warning-tint)",
    color: "var(--slds-g-color-warning-base-50)"
  },
  low: {
    label: "Low",
    backgroundColor: "var(--slds-g-color-badge-action)",
    color: "var(--slds-g-color-badge-action-text)"
  }
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px var(--slds-g-spacing-2)',
        borderRadius: 'var(--slds-g-radius-border-1)',
        fontSize: 'var(--slds-g-font-scale-neg-1)',
        fontWeight: 'var(--slds-g-font-weight-6)',
        backgroundColor: config.backgroundColor,
        color: config.color,
        textTransform: 'capitalize'
      }}
    >
      {config.label}
    </span>
  );
}
