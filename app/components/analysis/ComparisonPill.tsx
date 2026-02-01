"use client";

export type PillType = "detected" | "authoritative" | "action";

interface ComparisonPillProps {
  type: PillType;
  label: string;
  content: string;
}

const pillConfig = {
  detected: {
    backgroundColor: "var(--slds-g-color-badge-detected)",
    color: "var(--slds-g-color-badge-detected-text)"
  },
  authoritative: {
    backgroundColor: "var(--slds-g-color-badge-authoritative)",
    color: "var(--slds-g-color-badge-authoritative-text)"
  },
  action: {
    backgroundColor: "var(--slds-g-color-badge-action)",
    color: "var(--slds-g-color-badge-action-text)"
  }
};

export function ComparisonPill({ type, label, content }: ComparisonPillProps) {
  const badgeClass = `slds-badge slds-badge_${type}`;

  return (
    <span className={badgeClass}>
      {label}: {content}
    </span>
  );
}
