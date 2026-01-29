"use client";

import { TrendingUp, CheckCircle2 } from "lucide-react";

interface AIReadyScoreProps {
  currentScore?: number;
  targetScore?: number;
  change?: number;
}

export function AIReadyScore({ 
  currentScore = 60, 
  targetScore = 100, 
  change = 1.3 
}: AIReadyScoreProps) {
  const percentage = (currentScore / targetScore) * 100;

  return (
    <div
      style={{
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        border: '1px solid var(--slds-g-color-border-1)',
        borderRadius: 'var(--slds-g-radius-border-2)',
        padding: 'var(--slds-g-spacing-4)',
        boxShadow: 'var(--slds-g-shadow-1)',
        marginBottom: 'var(--slds-g-spacing-6)'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--slds-g-spacing-4)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-2)'
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(46, 132, 74, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <CheckCircle2
              style={{
                width: '14px',
                height: '14px',
                color: 'var(--slds-g-color-success-base-50)'
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--slds-g-font-family)',
              fontSize: 'var(--slds-g-font-scale-base)', // 13px
              fontWeight: 'var(--slds-g-font-weight-medium)', // 500
              color: 'var(--slds-g-color-text-default)'
            }}
          >
            AI Ready Score
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-1)',
            fontSize: 'var(--slds-g-font-scale-neg-1)', // 12px
            fontWeight: 'var(--slds-g-font-weight-medium)', // 500
            color: 'var(--slds-g-color-success-base-50)' // Green for positive change
          }}
        >
          <TrendingUp
            style={{
              width: '14px',
              height: '14px',
              color: 'var(--slds-g-color-success-base-50)'
            }}
          />
          {change}%
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '8px',
          backgroundColor: '#C9E8E4', // Light teal background
          borderRadius: '9999px', // Fully rounded (pill shape)
          overflow: 'visible',
          marginBottom: 'var(--slds-g-spacing-2)',
          position: 'relative'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: 'var(--slds-g-color-success-base-50)', // Green fill
            borderRadius: '9999px',
            transition: 'width 1s ease'
          }}
        />
      </div>

      {/* Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontSize: 'var(--slds-g-font-scale-base)', // 13px
            fontWeight: 'var(--slds-g-font-weight-4)', // 400
            color: 'var(--slds-g-color-text-default)'
          }}
        >
          {currentScore}%
        </span>
        <span
          style={{
            fontSize: 'var(--slds-g-font-scale-base)', // 13px
            fontWeight: 'var(--slds-g-font-weight-4)', // 400
            color: 'var(--slds-g-color-text-default)'
          }}
        >
          {targetScore}%
        </span>
      </div>
    </div>
  );
}
