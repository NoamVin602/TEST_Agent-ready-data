"use client";

import { TrendingUpIcon, CheckCircleIcon } from "../../lib/slds-icons";

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
    <div className="slds-card slds-m-bottom_large" style={{ margin: '1px 1px 1px 16px', boxSizing: 'border-box' }}>
      <div className="slds-card__body">
        {/* Header */}
        <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
          <div className="slds-grid slds-grid_vertical-align-center slds-gap_small">
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
            <CheckCircleIcon
              size={14}
              color="var(--slds-g-color-success-base-50)"
            />
          </div>
          <span className="slds-text-body_semibold">
            AI Ready Score
          </span>
          </div>
          <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-1)' }}>
          <TrendingUpIcon
            size={14}
            color="var(--slds-g-color-success-base-50)"
          />
          <span className="slds-text-body_small" style={{ color: 'var(--slds-g-color-success-base-50)' }}>
            {change}%
          </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="slds-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={targetScore} aria-valuenow={currentScore} style={{ height: '8px', backgroundColor: '#C9E8E4', borderRadius: '9999px', marginBottom: 'var(--slds-g-spacing-2)' }}>
          <div className="slds-progress-bar__value" style={{ width: `${percentage}%`, backgroundColor: 'var(--slds-g-color-success-base-50)', borderRadius: '9999px', transition: 'width 1s ease' }} />
        </div>

        {/* Labels */}
        <div className="slds-grid slds-grid_align-spread">
          <span className="slds-text-body">
            {currentScore}%
          </span>
          <span className="slds-text-body">
            {targetScore}%
          </span>
        </div>
      </div>
    </div>
  );
}
