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
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 98 });
  
  React.useEffect(() => {
    if (chartRef.current) {
      const width = chartRef.current.clientWidth;
      setDimensions({ width, height: 98 });
    }
  }, []);

  const chartHeight = 120;
  const padding = { top: 10, right: 30, bottom: 22, left: 0 };
  const yAxisWidth = 60;

  // Ensure data array exists and has at least one item
  const safeData = Array.isArray(data) && data.length > 0 ? data : [
    { date: "02/10/26", value: 30 },
    { date: "03/10/26", value: currentValue || 45 }
  ];
  
  // Calculate scales
  const dataMax = Math.max(...safeData.map(d => d.value));
  const dataMin = Math.min(...safeData.map(d => d.value));
  const dataRange = dataMax - dataMin || 1;
  
  const maxValue = dataMax + (dataRange * 0.2);
  const minValue = Math.max(0, dataMin - (dataRange * 0.2));
  const valueRange = maxValue - minValue || 1;

  // Generate SVG path
  const { width, height } = dimensions;
  const points = safeData.map((point, index) => {
    const x = padding.right + (index / (safeData.length - 1 || 1)) * (width - padding.right);
    const y = padding.top + (1 - (point.value - minValue) / valueRange) * (height - padding.top);
    return { x, y, value: point.value };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  const areaPath = pathData + 
    ` L ${points[points.length - 1].x} ${height}` +
    ` L ${points[0].x} ${height} Z`;

  const lastPoint = points[points.length - 1] || points[0];
  
  // Format date from "2.20" to "02/10/26" format
  function formatDateForChart(dateStr: string): string {
    if (!dateStr) return "";
    if (dateStr.includes('/') && dateStr.length > 5) return dateStr;
    
    const parts = dateStr.split('.');
    if (parts.length === 2) {
      const month = parts[0].padStart(2, '0');
      const day = parts[1].padStart(2, '0');
      return `${month}/${day}/26`;
    }
    return dateStr;
  }
  
  const firstDate = formatDateForChart(safeData[0]?.date || "02/10/26");
  const lastDate = formatDateForChart(safeData[safeData.length - 1]?.date || "03/10/26");

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
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "17px",
              color: "#5c5c5c",
              fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
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
          ref={chartRef}
          style={{
            borderLeft: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            borderBottom: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            flex: "1 0 0",
            width: "100%",
            position: "relative",
            minHeight: 0,
          }}
        >
          {width > 0 && (
            <svg
              width={width}
              height={height}
              style={{ display: "block", position: "absolute", top: 0, left: 0 }}
            >
              {/* Shaded Area under the line */}
              <path
                d={areaPath}
                fill="#EDF4FF"
              />

              {/* Line Path */}
              <path
                d={pathData}
                fill="none"
                stroke="#4992FE"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Highlighted Data Point - Blue circle at the end */}
              <circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r="4"
                fill="#4992FE"
              />
              
              {/* Percentage label */}
              <text
                x={lastPoint.x + 8}
                y={lastPoint.y}
                fill="#2e2e2e"
                fontSize="10px"
                fontWeight="400"
                fontFamily="var(--font-family-base, 'SF Pro', sans-serif)"
                dominantBaseline="middle"
              >
                {currentValue || lastPoint.value}%
              </text>
            </svg>
          )}
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
              fontWeight: "400",
              lineHeight: "18px",
              color: "#2e2e2e",
              fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              textAlign: "left",
            }}
          >
            {firstDate}
          </div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              lineHeight: "18px",
              color: "#2e2e2e",
              fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              textAlign: "right",
            }}
          >
            {lastDate}
          </div>
        </div>
      </div>
    </div>
  );
}
