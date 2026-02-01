"use client";

import React, { useState } from "react";
import { Spinner, SpinnerContainer } from "../shared/Spinner";

interface DataHealthDonutProps {
  percentage: number;
  isLoading?: boolean;
}

export function DataHealthDonut({ percentage, isLoading = false }: DataHealthDonutProps) {
  const [isHovered, setIsHovered] = useState(false);
  // Calculate the stroke dash array for the donut
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (isLoading) {
    return (
      <div className="slds-grid slds-grid_vertical slds-grid_align-center slds-grid_vertical-align-center" style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}>
        <SpinnerContainer>
          <Spinner size="medium" variant="brand" aria-label="Loading chart data" />
        </SpinnerContainer>
      </div>
    );
  }

  const healthStatus = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Needs Improvement';
  const healthColor = percentage >= 80 ? '#2E844A' : percentage >= 60 ? '#0176D3' : percentage >= 40 ? '#FE9339' : '#C23934';

  return (
    <div 
      className="slds-tooltip-trigger"
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--slds-g-spacing-4)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', width: '200px', height: '200px', flexShrink: 0 }}>
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--slds-g-color-neutral-base-95)"
            strokeWidth="20"
          />
          {/* Progress Circle - Teal Gradient */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="var(--slds-g-color-chart-teal-1)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1s ease'
            }}
          />
        </svg>
        
        {/* Center Text - Positioned absolutely centered */}
        <div 
          className="slds-grid slds-grid_vertical slds-grid_align-center"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              fontSize: '48px',
              fontWeight: 'var(--slds-g-font-weight-semibold)',
              color: 'var(--slds-g-color-text-default)',
              lineHeight: 1,
              textAlign: 'center'
            }}
          >
            {percentage}%
          </div>
          <div 
            style={{
              fontSize: 'var(--slds-g-font-scale-1)',
              color: 'var(--slds-g-color-text-weak)',
              marginTop: 'var(--slds-g-spacing-1)',
              textAlign: 'center'
            }}
          >
            Overall Health
          </div>
        </div>
        
        {/* SLDS Tooltip */}
        {isHovered && (
          <div 
            className="slds-popover slds-popover_tooltip slds-popover_bottom"
            role="tooltip"
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'normal',
              maxWidth: '200px'
            }}
          >
            <div className="slds-popover__body">
              <div className="slds-text-body_small">
                <strong>{percentage}%</strong> - {healthStatus}
              </div>
              <div className="slds-text-body_small" style={{ marginTop: 'var(--slds-g-spacing-1)', opacity: 0.8 }}>
                Overall knowledge base health
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
