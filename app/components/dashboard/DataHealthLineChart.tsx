"use client";

import React, { useState } from "react";
import { Spinner, SpinnerContainer } from "../shared/Spinner";

interface DataPoint {
  date: string;
  value: number;
}

interface DataHealthLineChartProps {
  data: DataPoint[];
  currentValue: number;
  isLoading?: boolean;
}

export function DataHealthLineChart({ data, currentValue, isLoading = false }: DataHealthLineChartProps) {
  const [isHovered, setIsHovered] = useState(false);
  if (isLoading) {
    return (
      <div className="slds-grid slds-grid_vertical slds-grid_align-center slds-grid_vertical-align-center" style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}>
        <SpinnerContainer>
          <Spinner size="medium" variant="brand" aria-label="Loading chart data" />
        </SpinnerContainer>
      </div>
    );
  }

  const width = 600;
  const height = 300; // Increased height for better visibility
  const padding = { top: 20, right: 40, bottom: 50, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(...data.map(d => d.value), 100);
  const minValue = Math.min(...data.map(d => d.value), 0);
  const valueRange = maxValue - minValue;

  // Generate path for the line
  const points = data.map((point, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    return { x, y, value: point.value };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Calculate trend information
  const firstValue = data[0]?.value || 0;
  const lastValue = data[data.length - 1]?.value || 0;
  const trendChange = lastValue - firstValue;
  const trendPercentage = firstValue > 0 ? ((trendChange / firstValue) * 100).toFixed(1) : '0';
  const trendDirection = trendChange > 0 ? 'increasing' : trendChange < 0 ? 'decreasing' : 'stable';
  const dateRange = data.length > 0 ? `${data[0].date} - ${data[data.length - 1].date}` : 'N/A';

  return (
    <div 
      className="slds-tooltip-trigger"
      style={{ width: '100%', height: '100%', flex: 1, minHeight: 0, position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="slds-grid slds-grid_vertical" style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}>
      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <svg width="100%" style={{ flex: 1, minHeight: 0, display: 'block' }} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
          return (
            <g key={value}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="var(--slds-g-color-border-2)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            </g>
          );
        })}

        {/* Line Path */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--slds-g-color-chart-blue-2)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="var(--slds-g-color-neutral-base-100)"
            stroke="var(--slds-g-color-chart-blue-2)"
            strokeWidth="2"
          />
        ))}

        {/* Current Value Indicator */}
        <g>
          <text
            x={points[points.length - 1].x + 10}
            y={points[points.length - 1].y}
            fill="var(--slds-g-color-chart-blue-2)"
            fontSize="var(--slds-g-font-scale-2)"
            fontWeight="var(--slds-g-font-weight-semibold)"
            dominantBaseline="middle"
          >
            {currentValue}%
          </text>
        </g>

        {/* X-Axis Labels */}
        {data.length > 1 && (
          <>
            <text
              x={padding.left}
              y={height - 10}
              fill="var(--slds-g-color-text-weak)"
              fontSize="var(--slds-g-font-scale-neg-1)"
              textAnchor="start"
            >
              {data[0].date}
            </text>
            <text
              x={width - padding.right}
              y={height - 10}
              fill="var(--slds-g-color-text-weak)"
              fontSize="var(--slds-g-font-scale-neg-1)"
              textAnchor="end"
            >
              {data[data.length - 1].date}
            </text>
          </>
        )}
        </svg>
      </div>

      {/* Legend */}
      <div 
        style={{
          display: 'flex',
          gap: 'var(--slds-g-spacing-6)',
          justifyContent: 'center',
          marginTop: 'var(--slds-g-spacing-4)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', color: 'var(--slds-g-color-text-weak)' }}>
            Overall Health
          </div>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--slds-g-spacing-1)',
              padding: '2px var(--slds-g-spacing-2)',
              borderRadius: 'var(--slds-g-radius-border-1)',
              backgroundColor: 'var(--slds-g-color-success-tint)',
              color: 'var(--slds-g-color-success-base-50)',
              fontSize: 'var(--slds-g-font-scale-neg-1)',
              fontWeight: 'var(--slds-g-font-weight-6)',
              marginTop: 'var(--slds-g-spacing-1)'
            }}
          >
            +4%
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', color: 'var(--slds-g-color-text-weak)' }}>
            Overall Increase
          </div>
          <div 
            style={{
              fontSize: 'var(--slds-g-font-scale-2)',
              fontWeight: 'var(--slds-g-font-weight-semibold)',
              color: 'var(--slds-g-color-text-default)',
              marginTop: 'var(--slds-g-spacing-1)'
            }}
          >
            {currentValue}%
          </div>
        </div>
      </div>
      </div>
      
      {/* SLDS Tooltip */}
      {isHovered && (
        <div 
          className="slds-popover slds-popover_tooltip slds-popover_bottom"
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'normal',
            maxWidth: '200px'
          }}
        >
          <div className="slds-popover__body">
            <div className="slds-text-body_small">
              <strong>{currentValue}%</strong> {trendDirection === 'increasing' ? '↗' : trendDirection === 'decreasing' ? '↘' : '→'} {trendChange > 0 ? '+' : ''}{trendChange.toFixed(1)}%
            </div>
            <div className="slds-text-body_small" style={{ marginTop: 'var(--slds-g-spacing-1)' }}>
              {dateRange}
            </div>
            <div className="slds-text-body_small" style={{ marginTop: 'var(--slds-g-spacing-1)', opacity: 0.8 }}>
              Health trend over time
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
