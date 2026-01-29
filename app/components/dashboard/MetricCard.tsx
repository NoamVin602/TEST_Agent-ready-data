"use client";

import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  change: number;
  changeLabel: string;
  trend: "up" | "down";
  icon: LucideIcon;
  colorClass: {
    background: string;
    text: string;
  };
  onClick?: () => void;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  trend, 
  icon: Icon, 
  colorClass,
  onClick 
}: MetricCardProps) {
  const isClickable = !!onClick;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--slds-g-spacing-4)',
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        border: '1px solid var(--slds-g-color-border-1)',
        borderRadius: 'var(--slds-g-radius-border-2)',
        boxShadow: 'var(--slds-g-shadow-1)',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all var(--slds-g-transition-base)',
        textAlign: 'left',
        width: '100%',
        minHeight: '140px'
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.boxShadow = 'var(--slds-g-shadow-3)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.boxShadow = 'var(--slds-g-shadow-1)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Icon */}
      <div 
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--slds-g-radius-border-1)',
          backgroundColor: colorClass.background,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--slds-g-spacing-3)',
          flexShrink: 0
        }}
      >
        <Icon 
          style={{
            width: '16px',
            height: '16px',
            color: colorClass.text,
            strokeWidth: 2
          }}
        />
      </div>

      {/* Value */}
      <div 
        style={{
          fontSize: '32px',
          fontWeight: 'var(--slds-g-font-weight-semibold)',
          color: 'var(--slds-g-color-text-default)',
          lineHeight: 1.2,
          marginBottom: 'var(--slds-g-spacing-2)'
        }}
      >
        {value}
      </div>

      {/* Title */}
      <div 
        style={{
          fontSize: 'var(--slds-g-font-scale-2)',
          fontWeight: 'var(--slds-g-font-weight-4)',
          color: 'var(--slds-g-color-text-default)',
          marginBottom: 'var(--slds-g-spacing-3)',
          lineHeight: 1.5
        }}
      >
        {title}
      </div>

      {/* Change Indicator */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--slds-g-spacing-1)',
          marginTop: 'auto'
        }}
      >
        <span
          style={{
            fontSize: 'var(--slds-g-font-scale-1)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            color: trend === 'down' ? 'var(--slds-g-color-success-base-50)' : 'var(--slds-g-color-text-weak)'
          }}
        >
          {change > 0 ? '+' : ''}{change}{typeof change === 'number' && change % 1 !== 0 ? '%' : ''}
        </span>
        <span
          style={{
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            color: 'var(--slds-g-color-text-weak)'
          }}
        >
          {changeLabel}
        </span>
      </div>
    </button>
  );
}
