"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  change: number;
  changeLabel: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
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
      className={`slds-card ${isClickable ? 'slds-card_interactive' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        minHeight: '140px'
      }}
    >
      <div className="slds-card__body">
        {/* Icon */}
        <div 
          className="slds-icon_container slds-icon_container_circle"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--slds-g-radius-border-1)',
            backgroundColor: colorClass.background,
            marginBottom: 'var(--slds-g-spacing-3)',
            flexShrink: 0
          }}
        >
          <Icon 
            size={16}
            color={colorClass.text}
          />
        </div>

        {/* Value */}
        <div className="slds-text-heading_large" style={{ marginBottom: 'var(--slds-g-spacing-2)' }}>
          {value}
        </div>

        {/* Title */}
        <div className="slds-text-body" style={{ marginBottom: 'var(--slds-g-spacing-3)' }}>
          {title}
        </div>

        {/* Change Indicator */}
        <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-1)', marginTop: 'auto' }}>
          <span className="slds-text-body_semibold" style={{ color: trend === 'down' ? 'var(--slds-g-color-success-base-50)' : 'var(--slds-g-color-text-weak)' }}>
            {change > 0 ? '+' : ''}{change}{typeof change === 'number' && change % 1 !== 0 ? '%' : ''}
          </span>
          <span className="slds-text-body_small">
            {changeLabel}
          </span>
        </div>
      </div>
    </button>
  );
}
