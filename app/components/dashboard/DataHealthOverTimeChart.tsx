"use client";

import React from "react";

interface DataPoint {
  date: string;
  value: number;
}

interface DataHealthOverTimeChartProps {
  data: DataPoint[];
  currentValue: number;
}

export function DataHealthOverTimeChart({ data, currentValue }: DataHealthOverTimeChartProps) {
  const chartHeight = 120;
  const padding = { top: 0, right: 0, bottom: 22, left: 0 };
  const yAxisWidth = 60;
  const chartAreaHeight = chartHeight - padding.bottom;
  
  // Use actual pixel dimensions for SVG
  const svgWidth = 500; // Approximate width
  const svgHeight = chartHeight;

  // Ensure data array exists and has at least one item
  const safeData = Array.isArray(data) && data.length > 0 ? data : [
    { date: "2.20", value: 0 },
    { date: "4.20", value: currentValue || 45 }
  ];
  
  // Calculate scales
  const maxValue = Math.max(...safeData.map(d => d.value), 100);
  const minValue = Math.min(...safeData.map(d => d.value), 0);
  const valueRange = maxValue - minValue || 1;

  // Generate path for the line
  const points = safeData.map((point, index) => {
    const x = (index / (safeData.length - 1 || 1)) * svgWidth;
    const y = svgHeight - padding.bottom - ((point.value - minValue) / valueRange) * chartAreaHeight;
    return { x, y, value: point.value };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  // Create area path (for shaded area under the line)
  const areaPath = pathData + 
    ` L ${points[points.length - 1].x} ${svgHeight - padding.bottom}` +
    ` L ${points[0].x} ${svgHeight - padding.bottom} Z`;

  // Get the last point for highlighting
  const lastPoint = points[points.length - 1] || points[0];
  
  // Format dates
  const firstDate = safeData[0]?.date || "02/10/26";
  const lastDate = safeData.length > 0 ? safeData[safeData.length - 1]?.date || "03/10/26" : "03/10/26";
  
  // Format date from "2.20" or "2/20" to "02/10/26" format
  function formatDateForChart(dateStr: string): string {
    // If already in MM/DD/YY format, return as is
    if (dateStr.includes('/')) {
      return dateStr;
    }
    // Convert "2.20" format to "02/10/26" format
    const parts = dateStr.split('.');
    if (parts.length === 2) {
      const month = parts[0].padStart(2, '0');
      const day = parts[1].padStart(2, '0');
      return `${month}/${day}/26`;
    }
    return dateStr;
  }

  return (
    <div
      style={{
        display: "flex",
        height: `${chartHeight}px`,
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* Left Y-Axis */}
      <div
        style={{
          display: "flex",
          height: `${chartHeight}px`,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: `${padding.bottom}px`,
          paddingRight: "var(--slds-g-spacing-2, 8px)",
          width: `${yAxisWidth}px`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingBottom: "8px",
          }}
        >
          <div
            style={{
              fontSize: "var(--slds-g-font-scale-base, 12px)",
              fontWeight: "var(--slds-g-font-weight-4, 400)",
              lineHeight: "17px",
              color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
            }}
          >
            Health
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div
        style={{
          flex: "1 0 0",
          height: `${chartHeight}px`,
          position: "relative",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Chart Container with Borders */}
        <div
          style={{
            borderLeft: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            borderBottom: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            flex: "1 0 0",
            width: "100%",
            position: "relative",
            minHeight: 0,
          }}
        >
          <svg
            width="100%"
            height="100%"
            style={{ display: "block" }}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
          >
            {/* Shaded Area under the line */}
            <path
              d={areaPath}
              fill="rgba(27, 150, 255, 0.15)"
            />

            {/* Line Path */}
            <path
              d={pathData}
              fill="none"
              stroke="var(--slds-g-color-chart-blue-2, #0176D3)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Highlighted Data Point - Blue circle at the end */}
            <g>
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r="4"
                fill="var(--slds-g-color-chart-blue-2, #0176D3)"
              />
              {/* Percentage label */}
              <g transform={`translate(${lastPoint.x + 8}, ${lastPoint.y})`}>
                <text
                  x="0"
                  y="0"
                  fill="var(--slds-g-color-on-surface-2, #2e2e2e)"
                  fontSize="10px"
                  fontWeight="var(--slds-g-font-weight-4, 400)"
                  dominantBaseline="middle"
                >
                  {currentValue || lastPoint.value}%
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: "var(--slds-g-spacing-3, 12px)",
            width: "100%",
            height: `${padding.bottom}px`,
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: "var(--slds-g-font-weight-4, 400)",
              lineHeight: "18px",
              color: "var(--slds-g-color-on-surface-2, #2e2e2e)",
              textAlign: "left",
            }}
          >
            {formatDateForChart(firstDate)}
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "var(--slds-g-font-weight-4, 400)",
              lineHeight: "18px",
              color: "var(--slds-g-color-on-surface-2, #2e2e2e)",
              textAlign: "right",
            }}
          >
            {formatDateForChart(lastDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
