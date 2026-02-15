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
    const el = chartRef.current;
    if (!el) return;
    const update = () => setDimensions({ width: el.clientWidth, height: 98 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const chartHeight = 120;
  const padding = { top: 10, right: 30, bottom: 22, left: 0 };
  const yAxisWidth = 60;

  // Use first and last points for two-point chart (Figma)
  const firstPoint = Array.isArray(data) && data.length > 0 ? data[0] : { date: "02/10/26", value: 30 };
  const lastPoint = Array.isArray(data) && data.length > 0 ? data[data.length - 1] : { date: "03/10/26", value: currentValue || 45 };
  const safeData = [firstPoint, lastPoint];

  // Dynamic scale for visible trend (Figma)
  const dataMin = Math.min(firstPoint.value, lastPoint.value);
  const dataMax = Math.max(firstPoint.value, lastPoint.value);
  const dataRange = dataMax - dataMin || 10;
  const minValue = Math.max(0, dataMin - dataRange * 0.5);
  const maxValue = dataMax + dataRange * 0.3;
  const valueRange = maxValue - minValue;

  const { width, height } = dimensions;
  const points = safeData.map((point, index) => {
    const x = padding.right + (index / (safeData.length - 1 || 1)) * (width - padding.right - 20);
    const y = padding.top + (1 - (point.value - minValue) / valueRange) * (height - padding.top);
    return { x, y, value: point.value };
  });

  // Bézier curve: flatter start, steeper end (Figma)
  const cp1 = { x: points[0].x + (points[1].x - points[0].x) * 0.5, y: points[0].y - (points[0].y - points[1].y) * 0.1 };
  const cp2 = { x: points[0].x + (points[1].x - points[0].x) * 0.85, y: points[1].y + (points[0].y - points[1].y) * 0.2 };
  const pathData = `M ${points[0].x} ${points[0].y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${points[1].x} ${points[1].y}`;

  const areaPath = pathData + ` L ${points[1].x} ${height} L ${points[0].x} ${height} Z`;
  const endPoint = points[1];

  const firstDate = "02/10/26";
  const lastDate = "03/10/26";

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
              {/* Shaded area - rgba(73,146,254,0.15) per Figma */}
              <path
                d={areaPath}
                fill="rgba(73, 146, 254, 0.15)"
              />

              {/* Line - #4992FE, 2.5px per Figma */}
              <path
                d={pathData}
                fill="none"
                stroke="#4992FE"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* End point - blue dot with white stroke per Figma */}
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="4"
                fill="#4992FE"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />

              {/* Percentage label */}
              <text
                x={endPoint.x + 10}
                y={endPoint.y + 1}
                fill="#2e2e2e"
                fontSize="10px"
                fontWeight="400"
                fontFamily="var(--font-family-base, 'SF Pro', sans-serif)"
                dominantBaseline="middle"
              >
                {String(currentValue || endPoint.value) + "%"}
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
