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
  const config = pillConfig[type];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--slds-g-spacing-1)',
        padding: '4px var(--slds-g-spacing-2)',
        borderRadius: 'var(--slds-g-radius-border-3)',
        backgroundColor: config.backgroundColor,
        fontSize: 'var(--slds-g-font-scale-neg-1)',
        fontWeight: 'var(--slds-g-font-weight-4)',
        lineHeight: 1.4
      }}
    >
      <span 
        style={{
          fontWeight: 'var(--slds-g-font-weight-6)',
          color: config.color
        }}
      >
        {label}
      </span>
      <span style={{ color: config.color }}>{content}</span>
    </div>
  );
}
