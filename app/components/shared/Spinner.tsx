"use client";

import React from 'react';

export type SpinnerSize = 'x-small' | 'small' | 'medium' | 'large';
export type SpinnerVariant = 'brand' | 'inverse' | 'default';

interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
  'aria-label'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

/**
 * SLDS Spinner Component
 * Based on Salesforce Lightning Design System Spinner pattern
 * https://www.lightningdesignsystem.com/2e1ef8501/p/959d6d-spinners
 */
export function Spinner({
  size = 'medium',
  variant = 'default',
  className = '',
  'aria-label': ariaLabel = 'Loading',
  'aria-live': ariaLive = 'polite',
}: SpinnerProps) {
  const spinnerClasses = [
    'slds-spinner',
    `slds-spinner_${size}`,
    variant !== 'default' ? `slds-spinner_${variant}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={spinnerClasses}
      role="status"
      aria-label={ariaLabel}
      aria-live={ariaLive}
    >
      <span className="slds-spinner__dot-a"></span>
      <span className="slds-spinner__dot-b"></span>
      <span className="slds-spinner__dot-c"></span>
      <span className="slds-spinner__dot-d"></span>
      <span className="slds-spinner__dot-e"></span>
      <span className="slds-spinner__dot-f"></span>
      <span className="slds-assistive-text">{ariaLabel}</span>
    </div>
  );
}

/**
 * Spinner Container for inline spinners within components
 */
export function SpinnerContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`slds-spinner_container ${className}`}>
      {children}
    </div>
  );
}
