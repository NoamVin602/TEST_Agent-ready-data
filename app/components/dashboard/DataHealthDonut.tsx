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
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: '300px'
        }}
      >
        <SpinnerContainer>
          <Spinner size="medium" variant="brand" aria-label="Loading chart data" />
        </SpinnerContainer>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        minHeight: '300px'
      }}
    >
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
      
      {/* Center Text - Positioned absolutely within the relative container */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
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
  );
}
