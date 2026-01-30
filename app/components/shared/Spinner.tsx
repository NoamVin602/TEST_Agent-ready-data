"use client";

import React from 'react';

interface SpinnerProps {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'base' | 'brand' | 'inverse';
  inline?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function Spinner({
  size = 'medium',
  variant = 'base',
  inline = false,
  className = '',
  'aria-label': ariaLabel = 'Loading',
}: SpinnerProps) {
  const spinnerClasses = [
    'slds-spinner',
    `slds-spinner_${size}`,
    variant !== 'base' ? `slds-spinner_${variant}` : '',
    inline ? 'slds-spinner_inline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = inline
    ? ''
    : 'slds-spinner_container';

  const spinner = (
    <div className={spinnerClasses} role="status" aria-label={ariaLabel}>
      <span className="slds-assistive-text">{ariaLabel}</span>
      <div className="slds-spinner__dot-a"></div>
      <div className="slds-spinner__dot-b"></div>
      <div className="slds-spinner__dot-c"></div>
    </div>
  );

  if (inline) {
    return spinner;
  }

  return <div className={containerClasses}>{spinner}</div>;
}
