"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  change: number;
  changeLabel: string;
  trend: "up" | "down";
  icon?: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  colorClass?: {
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
  const changeDisplay = change > 0 ? `▲${change}${typeof change === 'number' && change % 1 !== 0 ? '%' : ''}` : `${change}`;
  const changeColor = trend === 'down' ? '#056764' : '#056764'; // Success color for all trends

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      style={{
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        border: '1px solid var(--slds-g-color-brand-base-90)',
        borderRadius: 'var(--slds-g-radius-border-3)',
        padding: 'var(--slds-g-spacing-4)',
        height: '84px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
        width: '100%',
        cursor: isClickable ? 'pointer' : 'default',
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)',
        transition: 'all var(--slds-g-transition-base)'
      }}
      onMouseEnter={(e) => {
        if (isClickable) {
          e.currentTarget.style.boxShadow = '0px 0px 4px 0px rgba(0, 0, 0, 0.2), 0px 4px 4px 0px rgba(0, 0, 0, 0.2), 0px -1px 2px 0px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (isClickable) {
          e.currentTarget.style.boxShadow = '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)';
        }
      }}
    >
      <div className="slds-grid" style={{ gap: 'var(--slds-g-spacing-4)', alignItems: 'flex-start' }}>
        {/* Left: Title and Value */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-1)' }}>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-1)', height: '17px' }}>
            <span 
              className="slds-text-body_semibold" 
              style={{ 
                fontSize: 'var(--slds-g-font-scale-neg-1)', 
                lineHeight: '17px', 
                color: 'var(--slds-g-color-on-surface-1)',
                fontFamily: 'var(--slds-g-font-family)',
                fontWeight: 'var(--slds-g-font-weight-6)'
              }}
            >
              {title}
            </span>
          </div>
          <span 
            style={{ 
              fontSize: 'var(--slds-g-font-scale-4)', 
              lineHeight: '32px', 
              color: 'var(--slds-g-color-on-surface-2)',
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 'var(--slds-g-font-weight-6)'
            }}
          >
            {value}
          </span>
        </div>

        {/* Right: Change Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
          <span 
            style={{ 
              fontSize: 'var(--slds-g-font-scale-neg-1)', 
              lineHeight: '17px', 
              color: changeColor,
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 'var(--slds-g-font-weight-6)',
              textAlign: 'right'
            }}
          >
            {changeDisplay}
          </span>
          <span 
            style={{ 
              fontSize: 'var(--slds-g-font-scale-neg-1)', 
              lineHeight: '17px', 
              color: 'var(--slds-g-color-on-surface-1)',
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 'var(--slds-g-font-weight-4)',
              textAlign: 'right'
            }}
          >
            {changeLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
