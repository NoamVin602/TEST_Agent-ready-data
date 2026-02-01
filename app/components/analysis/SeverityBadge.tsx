"use client";

export type Severity = "high" | "medium" | "low";

interface SeverityBadgeProps {
  severity: Severity;
}

const severityConfig = {
  high: {
    label: "High",
    className: "slds-badge slds-badge_error"
  },
  medium: {
    label: "Medium",
    className: "slds-badge slds-badge_warning"
  },
  low: {
    label: "Low",
    className: "slds-badge"
  }
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  return (
    <span className={config.className}>
      {config.label}
    </span>
  );
}
