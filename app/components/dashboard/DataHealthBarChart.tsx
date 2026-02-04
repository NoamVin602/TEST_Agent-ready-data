"use client";

import React from "react";

interface DataHealthBarChartProps {
  percentage: number;
  totalIssues?: number;
  highSeverity?: number;
  mediumSeverity?: number;
  isLoading?: boolean;
}

export function DataHealthBarChart({ 
  percentage, 
  totalIssues = 0,
  highSeverity = 0,
  mediumSeverity = 0,
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

  // Determine colors based on health score
  const healthyColor = percentage >= 80 ? '#06A59A' : percentage >= 60 ? '#0176D3' : percentage >= 40 ? '#FE9339' : '#8a033e';
  const needsImprovementColor = '#939393';

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Bar Chart */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', gap: '2px', height: '49px', alignItems: 'center', paddingTop: '8px' }}>
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
                borderRadius: healthyPercentage === 100 ? '4px' : '4px 0 0 4px',
                minWidth: healthyPercentage > 5 ? '60px' : '0px'
              }}
            >
              {healthyPercentage > 5 && (
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '17px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 590,
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
                borderRadius: healthyPercentage === 0 ? '4px' : '0 4px 4px 0',
                minWidth: needsImprovementPercentage > 5 ? '60px' : '0px'
              }}
            >
              {needsImprovementPercentage > 5 && (
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '17px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 590,
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

      {/* Health Indicators Card */}
      <article className="slds-card" style={{ margin: 0, borderRadius: '12px' }}>
        <div className="slds-card__body slds-card__body_inner" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Health Indicator */}
            <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center', minWidth: '200px' }}>
              <span
                style={{
                  fontSize: '12px',
                  lineHeight: '17px',
                  color: '#5c5c5c',
                  fontFamily: 'var(--slds-g-font-family)',
                  fontWeight: 590,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                Health indicator
              </span>
              <span className={`slds-badge ${percentage >= 80 ? 'slds-theme_success' : percentage >= 60 ? 'slds-theme_info' : percentage >= 40 ? 'slds-theme_warning' : 'slds-theme_error'}`}>
                {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Low'}
              </span>
            </div>

            {/* Issues Summary */}
            {totalIssues > 0 && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: '17px',
                    color: '#5c5c5c',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontWeight: 590,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {totalIssues} Issues Detected
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {/* High Severity */}
                  {highSeverity > 0 && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="slds-badge slds-theme_error">
                        {highSeverity}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '17px',
                          color: '#5c5c5c',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: 400,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        High Severity
                      </span>
                    </div>
                  )}
                  
                  {/* Medium Severity */}
                  {mediumSeverity > 0 && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className="slds-badge slds-theme_warning">
                        {mediumSeverity}
                      </span>
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '17px',
                          color: '#5c5c5c',
                          fontFamily: 'var(--slds-g-font-family)',
                          fontWeight: 400,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Medium Severity
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
