"use client";

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
  if (isLoading) {
    return (
      <div 
        style={{
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

  const width = 600;
  const height = 200;
  const padding = { top: 20, right: 40, bottom: 40, left: 40 };
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

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '300px'
      }}
    >
      {/* Chart */}
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
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
  );
}
