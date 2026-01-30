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
  const changeDisplay = change > 0 ? `+${change}${typeof change === 'number' && change % 1 !== 0 ? '' : '%'}` : `${change}${typeof change === 'number' && change % 1 !== 0 ? '' : '%'}`;
  // Use SLDS semantic colors: green for positive, red for negative
  const changeColor = trend === 'up' || change > 0 ? '#2E844A' : '#C23934';

  const cardContent = (
    <div className="slds-card__body slds-card__body_inner" style={{ padding: '0.75rem 1rem', height: '84px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="slds-grid" style={{ gap: '1rem', alignItems: 'flex-start' }}>
        {/* Left: Title and Value */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ height: '17px' }}>
            <span 
              style={{ 
                fontSize: '0.75rem', 
                lineHeight: '17px', 
                color: '#444444',
                fontFamily: 'var(--slds-g-font-family)',
                fontWeight: 600
              }}
            >
              {title}
            </span>
          </div>
          <span 
            style={{ 
              fontSize: '1.5rem', 
              lineHeight: '1.5', 
              color: '#181818',
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 600
            }}
          >
            {value}
          </span>
        </div>

        {/* Right: Change Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0, flexShrink: 0 }}>
          <span 
            style={{ 
              fontSize: '0.75rem', 
              lineHeight: '17px', 
              color: changeColor,
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 600,
              textAlign: 'right'
            }}
          >
            {changeDisplay}
          </span>
          <span 
            style={{ 
              fontSize: '0.75rem', 
              lineHeight: '17px', 
              color: '#444444',
              fontFamily: 'var(--slds-g-font-family)',
              fontWeight: 400,
              textAlign: 'right'
            }}
          >
            {changeLabel}
          </span>
        </div>
      </div>
    </div>
  );

  if (isClickable) {
    return (
      <article 
        className="slds-card" 
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <article className="slds-card">
      {cardContent}
    </article>
  );
}
