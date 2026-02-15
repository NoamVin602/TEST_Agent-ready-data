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
  const [chartWidth, setChartWidth] = React.useState(0);

  React.useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const update = () => setChartWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Data
  const firstPoint = Array.isArray(data) && data.length > 0 ? data[0] : { date: "02/10/26", value: 30 };
  const lastPoint = Array.isArray(data) && data.length > 0 ? data[data.length - 1] : { date: "03/10/26", value: currentValue || 45 };

  // Tableau Next "Incline" scale — line spans from ~65% to ~10% from top
  // matching the Figma Tableau Next Visualization Toolkit proportions
  const dataMin = firstPoint.value;
  const dataMax = lastPoint.value;
  const dataRange = Math.max(dataMax - dataMin, 1);
  const yMin = dataMin - dataRange * 0.63;   // small padding below
  const yMax = dataMax + dataRange * 0.18;   // small padding above
  const yRange = yMax - yMin;

  // SVG dimensions
  const svgH = 80;
  const padL = 4;
  const padR = 36;  // room for "45%" label

  const plotW = Math.max(0, chartWidth - padL - padR);

  // Map value to Y pixel
  const x0 = padL;
  const x1 = padL + plotW;
  const toY = (v: number) => svgH - ((v - yMin) / yRange) * svgH;
  const y0 = toY(firstPoint.value);   // ~65% from top
  const y1 = toY(lastPoint.value);    // ~10% from top

  // Tableau Next Incline curve: flat start, accelerating upward (like a parabola)
  const cp1x = x0 + plotW * 0.45;
  const cp1y = y0;                        // completely horizontal departure
  const cp2x = x0 + plotW * 0.78;
  const cp2y = y1 + (y0 - y1) * 0.12;    // steep arrival, still rising fast

  const linePath = `M ${x0} ${y0} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
  const areaPath = `${linePath} L ${x1} ${svgH} L ${x0} ${svgH} Z`;

  const firstDate = "02/10/26";
  const lastDate = "03/10/26";

  return (
    <div style={{ display: "flex", width: "100%", gap: 0 }}>
      {/* Y-axis label */}
      <div
        style={{
          width: "48px",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "8px",
          paddingBottom: "28px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "17px",
            color: "#5c5c5c",
            fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
          }}
        >
          Health
        </span>
      </div>

      {/* Chart + X-axis */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Plot area with L-shaped border */}
        <div
          ref={chartRef}
          style={{
            borderLeft: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            borderBottom: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
            position: "relative",
            height: `${svgH}px`,
            width: "100%",
          }}
        >
          {chartWidth > 0 && (
            <svg
              width={chartWidth}
              height={svgH}
              style={{ display: "block", overflow: "visible" }}
            >
              {/* Shaded area - Tableau #EDF4FF */}
              <path d={areaPath} fill="#EDF4FF" />

              {/* Line - #4992FE */}
              <path
                d={linePath}
                fill="none"
                stroke="#4992FE"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* End dot */}
              <circle cx={x1} cy={y1} r="4" fill="#4992FE" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Percentage label */}
              <text
                x={x1 + 8}
                y={y1}
                fill="#2e2e2e"
                fontSize="11px"
                fontWeight="400"
                fontFamily="var(--font-family-base, 'SF Pro', sans-serif)"
                dominantBaseline="middle"
              >
                {String(currentValue || lastPoint.value) + "%"}
              </text>
            </svg>
          )}
        </div>

        {/* X-axis dates */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "6px",
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: "400", lineHeight: "18px", color: "#2e2e2e", fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)" }}>
            {firstDate}
          </span>
          <span style={{ fontSize: "13px", fontWeight: "400", lineHeight: "18px", color: "#2e2e2e", fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)" }}>
            {lastDate}
          </span>
        </div>
      </div>
    </div>
  );
}
