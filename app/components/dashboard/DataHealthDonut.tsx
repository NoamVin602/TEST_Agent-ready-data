"use client";

import { Spinner, SpinnerContainer } from "../shared/Spinner";

interface DataHealthDonutProps {
  percentage: number;
  isLoading?: boolean;
}

export function DataHealthDonut({ percentage, isLoading = false }: DataHealthDonutProps) {
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

  return (
    <div className="slds-grid slds-grid_vertical slds-grid_align-center slds-grid_vertical-align-center" style={{ width: '100%', height: '100%', flex: 1, minHeight: 0, padding: 'var(--slds-g-spacing-4)' }}>
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
      </div>
    </div>
  );
}
