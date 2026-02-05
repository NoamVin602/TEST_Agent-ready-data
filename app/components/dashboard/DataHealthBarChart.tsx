"use client";

import React from "react";

interface DataHealthBarChartProps {
  percentage: number;
  totalIssues?: number;
  highSeverity?: number;
  mediumSeverity?: number;
  lowSeverity?: number;
  isLoading?: boolean;
}

export function DataHealthBarChart({ 
  percentage, 
  totalIssues = 0,
  highSeverity = 0,
  mediumSeverity = 0,
  lowSeverity = 0,
  isLoading = false 
}: DataHealthBarChartProps) {
  if (isLoading) {
    return (
      <div className="slds-grid slds-grid_vertical slds-grid_align-center slds-grid_vertical-align-center" style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Calculate the breakdown - percentage is the healthy portion
  const healthyPercentage = percentage;
  const needsImprovementPercentage = 100 - percentage;

  // Determine colors based on health score - using SLDS 2 design tokens
  const healthyColor = percentage >= 80 ? 'var(--slds-g-color-success-base-50, #06A59A)' : percentage >= 60 ? 'var(--slds-g-color-brand-base-50, #0176D3)' : percentage >= 40 ? 'var(--slds-g-color-warning-base-50, #FE9339)' : '#8a033e';
  const needsImprovementColor = '#939393';

  // Determine health indicator label
  const healthIndicatorLabel = percentage >= 80 ? 'High' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Low';
  const healthIndicatorTheme = percentage >= 80 ? 'slds-theme_success' : percentage >= 60 ? 'slds-theme_info' : percentage >= 40 ? 'slds-theme_warning' : 'slds-theme_error';

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-1, 4px)' }}>
      {/* Bar Chart */}
      <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', gap: '2px', height: '49px', alignItems: 'center', paddingTop: 'var(--slds-g-spacing-2, 8px)' }}>
          {/* Healthy portion */}
          {healthyPercentage > 0 && (
            <div
              style={{
                backgroundColor: healthyColor,
                height: '33px',
                flex: healthyPercentage / 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                borderRadius: healthyPercentage === 100 ? 'var(--slds-g-radius-border-1, 4px)' : 'var(--slds-g-radius-border-1, 4px) 0 0 var(--slds-g-radius-border-1, 4px)',
                minWidth: healthyPercentage > 5 ? '60px' : '0px'
              }}
            >
              {healthyPercentage > 5 && (
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                    lineHeight: '17px',
                    color: 'var(--slds-g-color-on-surface-inverse-1, #FFFFFF)',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 'var(--slds-g-font-weight-semibold, 590)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {healthyPercentage}%
                </span>
              )}
            </div>
          )}
          
          {/* Needs improvement portion */}
          {needsImprovementPercentage > 0 && (
            <div
              style={{
                backgroundColor: needsImprovementColor,
                height: '33px',
                flex: needsImprovementPercentage / 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: healthyPercentage === 0 ? 'var(--slds-g-radius-border-1, 4px)' : '0 var(--slds-g-radius-border-1, 4px) var(--slds-g-radius-border-1, 4px) 0',
                minWidth: needsImprovementPercentage > 5 ? '60px' : '0px'
              }}
            >
              {needsImprovementPercentage > 5 && (
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                    lineHeight: '17px',
                    color: 'var(--slds-g-color-on-surface-inverse-1, #FFFFFF)',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 'var(--slds-g-font-weight-semibold, 590)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {needsImprovementPercentage}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Health Indicators Card - SLDS Nested Card */}
      <article className="slds-card" style={{ margin: 0, borderRadius: 'var(--slds-g-radius-border-3, 12px)' }}>
        <div className="slds-card__body slds-card__body_inner" style={{ padding: 'var(--slds-g-spacing-3, 12px)' }}>
          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-5, 24px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Health Indicator */}
            <div style={{ flex: 1, display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center', minWidth: '200px' }}>
              <span
                style={{
                  fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                  lineHeight: '17px',
                  color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                  fontFamily: 'var(--slds-g-font-family)',
                  fontWeight: 'var(--slds-g-font-weight-semibold, 590)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Health indicator
              </span>
              <span className={`slds-badge ${healthIndicatorTheme}`}>
                {healthIndicatorLabel}
              </span>
            </div>

            {/* Issues Summary */}
            {totalIssues > 0 && (
              <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                    lineHeight: '17px',
                    color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 'var(--slds-g-font-weight-semibold, 590)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {totalIssues} Issues Detected
                </span>
                <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* Low Severity */}
                  {lowSeverity > 0 && (
                    <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center' }}>
                      <span className="slds-badge slds-badge_inverse">
                        {lowSeverity}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                          lineHeight: '17px',
                          color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: 'var(--slds-g-font-weight-4, 400)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Low Severity
                      </span>
                    </div>
                  )}
                  
                  {/* Medium Severity */}
                  {mediumSeverity > 0 && (
                    <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center' }}>
                      <span className="slds-badge slds-theme_warning">
                        {mediumSeverity}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                          lineHeight: '17px',
                          color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: 'var(--slds-g-font-weight-4, 400)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Medium Severity
                      </span>
                    </div>
                  )}

                  {/* High Severity */}
                  {highSeverity > 0 && (
                    <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2, 8px)', alignItems: 'center' }}>
                      <span className="slds-badge slds-theme_error">
                        {highSeverity}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                          lineHeight: '17px',
                          color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: 'var(--slds-g-font-weight-4, 400)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        High Severity
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
