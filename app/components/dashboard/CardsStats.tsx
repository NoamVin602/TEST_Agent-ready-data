"use client";

import React from "react";
import { DatabaseIcon, TrendingUpIcon, ChevronDownIcon, AlertTriangleIcon, AlertTriangleIcon as WarningIcon } from "../../lib/slds-icons";
import { DataHealthOverTimeChart } from "./DataHealthOverTimeChart";
import { GoogleDriveIcon, BookIcon, WorldIcon } from "../../lib/slds-icons";

// Mock data for sources - can be passed as props
const DEFAULT_SOURCES = [
  { name: "Engineering - Technical design specs", icon: GoogleDriveIcon },
  { name: "Support - How-to articles", icon: BookIcon },
  { name: "Technical Documentation - Product manuals", icon: WorldIcon },
];

interface CardsStatsProps {
  healthScore: number;
  issuesDetected: number;
  highSeverityCount: number;
  mediumSeverityCount: number;
  chartData: Array<{ date: string; value: number }>;
  sources?: Array<{ name: string; icon: React.ComponentType<any> }>;
  recentActivity: Array<{
    actionType: string;
    description: string;
    actor: string;
    timestamp: string;
    impactScore: number;
  }>;
}

export function CardsStats({
  healthScore,
  issuesDetected,
  highSeverityCount,
  mediumSeverityCount,
  chartData,
  sources = DEFAULT_SOURCES,
  recentActivity,
}: CardsStatsProps) {
  const orangePercentage = healthScore;
  const lightOrangePercentage = 100 - healthScore;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--slds-g-spacing-4, 16px)",
        width: "100%",
      }}
    >
      {/* Top Card - Data Health with Bar Chart */}
      <div
        style={{
          backgroundColor: "#ffddc7",
          border: "1px solid var(--slds-g-color-border-1, #c9c9c9)",
          borderRadius: "var(--slds-g-radius-border-3, 12px)",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Card Header */}
        <div className="slds-card__header slds-grid" style={{ padding: "var(--slds-g-spacing-4, 16px)" }}>
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__figure">
              <DatabaseIcon size={16} color="#181818" />
            </div>
            <div className="slds-media__body">
              <h2 className="slds-card__header-title">Data Health</h2>
            </div>
          </header>
          <div className="slds-no-flex">
            <button
              type="button"
              className="slds-button slds-button_icon slds-button_icon-small"
              aria-label="More options"
            >
              <ChevronDownIcon size={12} color="#747474" />
            </button>
          </div>
        </div>

        {/* Card Body with Bar Chart and Nested Card */}
        <div
          style={{
            backgroundColor: "#fedfd0",
            padding: "0 var(--slds-g-spacing-3, 12px) var(--slds-g-spacing-3, 12px)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--slds-g-spacing-2, 8px)",
          }}
        >
          {/* Horizontal Bar Chart */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              height: "49px",
              width: "100%",
            }}
          >
            {/* Orange Bar */}
            <div
              style={{
                backgroundColor: "#FE9339",
                height: "33px",
                width: `${orangePercentage}%`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--slds-g-radius-border-1, 4px) 0 0 var(--slds-g-radius-border-1, 4px)",
                minWidth: "60px",
              }}
            >
              <span
                style={{
                  fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                  fontWeight: "var(--slds-g-font-weight-6, 590)",
                  lineHeight: "17px",
                  color: "#FFFFFF",
                }}
              >
                {orangePercentage}%
              </span>
            </div>
            {/* Lighter Orange Bar */}
            <div
              style={{
                backgroundColor: "#FFC99C",
                height: "33px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0 var(--slds-g-radius-border-1, 4px) var(--slds-g-radius-border-1, 4px) 0",
                minWidth: "60px",
              }}
            >
              <span
                style={{
                  fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                  fontWeight: "var(--slds-g-font-weight-6, 590)",
                  lineHeight: "17px",
                  color: "var(--slds-g-color-on-surface-2, #2e2e2e)",
                }}
              >
                {lightOrangePercentage}%
              </span>
            </div>
          </div>

          {/* Nested Card - Health Indicators */}
          <div
            className="slds-card"
            style={{
              border: "1px solid var(--slds-g-color-border-1, #C9C9C9)",
              borderRadius: "var(--slds-g-radius-border-3, 12px)",
              backgroundColor: "var(--slds-g-color-neutral-base-100, #FFFFFF)",
              padding: "12px var(--slds-g-spacing-3, 12px)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* Health Indicator */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--slds-g-spacing-2, 8px)",
                  alignItems: "center",
                  flex: "1 0 0",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                    fontWeight: "var(--slds-g-font-weight-6, 590)",
                    lineHeight: "17px",
                    color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                  }}
                >
                  Health indicator
                </span>
                <span className="slds-badge slds-theme_warning">
                  <AlertTriangleIcon size={12} color="currentColor" />
                  Medium
                </span>
              </div>

              {/* Issues Detected */}
              <div
                style={{
                  display: "flex",
                  gap: "var(--slds-g-spacing-2, 8px)",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                    fontWeight: "var(--slds-g-font-weight-6, 590)",
                    lineHeight: "17px",
                    color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                  }}
                >
                  {issuesDetected} Issues Detected
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--slds-g-spacing-2, 8px)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--slds-g-spacing-2, 8px)",
                      alignItems: "center",
                    }}
                  >
                    <span className="slds-badge slds-theme_error">{highSeverityCount}</span>
                    <span
                      style={{
                        fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                        fontWeight: "var(--slds-g-font-weight-4, 400)",
                        lineHeight: "17px",
                        color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                      }}
                    >
                      High Severity
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--slds-g-spacing-2, 8px)",
                      alignItems: "center",
                    }}
                  >
                    <span className="slds-badge slds-theme_warning">{mediumSeverityCount}</span>
                    <span
                      style={{
                        fontSize: "var(--slds-g-font-scale-neg-1, 12px)",
                        fontWeight: "var(--slds-g-font-weight-4, 400)",
                        lineHeight: "17px",
                        color: "var(--slds-g-color-on-surface-1, #5c5c5c)",
                      }}
                    >
                      Medium Severity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Line Chart and Sources Side by Side */}
      <div
        style={{
          display: "flex",
          gap: "var(--slds-g-spacing-4, 16px)",
          height: "176px",
          width: "100%",
        }}
      >
        {/* Data Health Over Time Card */}
        <div
          className="slds-card"
          style={{
            flex: "1 0 0",
            height: "176px",
            borderRadius: "var(--slds-g-radius-border-3, 12px)",
          }}
        >
          <div className="slds-card__header slds-grid" style={{ padding: "var(--slds-g-spacing-4, 16px)" }}>
            <header className="slds-media slds-media_center slds-has-flexi-truncate">
              <div className="slds-media__figure">
                <TrendingUpIcon size={16} color="#181818" />
              </div>
              <div className="slds-media__body">
                <h2 className="slds-card__header-title">Data Health Over Time</h2>
              </div>
            </header>
            <div className="slds-no-flex">
              <button
                type="button"
                className="slds-button slds-button_icon slds-button_icon-small"
                aria-label="More options"
              >
                <ChevronDownIcon size={12} color="#747474" />
              </button>
            </div>
          </div>
          <div
            className="slds-card__body slds-card__body_inner"
            style={{
              display: "flex",
              padding: "var(--slds-g-spacing-0, 0px) var(--slds-g-spacing-3, 12px) var(--slds-g-spacing-3, 12px) var(--slds-g-spacing-3, 12px)",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--slds-g-spacing-2, 8px)",
              flex: "1 0 0",
              alignSelf: "stretch",
              background: "var(--slds-g-color-surface-container-1, #FFFFFF)",
            }}
          >
            <div style={{ height: "120px", width: "100%", display: "flex", alignItems: "center" }}>
              <DataHealthOverTimeChart data={chartData} currentValue={healthScore} />
            </div>
          </div>
        </div>

        {/* Sources Card */}
        <div
          style={{
            border: "1px solid #c9c9c9",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "var(--slds-g-spacing-3, 12px)",
            height: "100%",
            padding: "var(--slds-g-spacing-2, 8px) var(--slds-g-spacing-4, 16px)",
            width: "292px",
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              fontSize: "var(--slds-g-font-scale-3, 20px)",
              fontWeight: "var(--slds-g-font-weight-4, 400)",
              lineHeight: "28px",
              color: "var(--slds-g-color-on-surface-3, #03234d)",
              margin: 0,
            }}
          >
            Sources
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--slds-g-spacing-3, 12px)",
            }}
          >
            {sources.map((source, index) => {
              const IconComponent = source.icon;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "var(--slds-g-spacing-3, 12px)",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: "20px", height: "20px", flexShrink: 0 }}>
                    <IconComponent size={20} />
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "var(--slds-g-font-weight-4, 400)",
                      lineHeight: "20px",
                      color: "var(--slds-g-color-on-surface-2, #2e2e2e)",
                    }}
                  >
                    {source.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="slds-card" style={{ borderRadius: "var(--slds-g-radius-border-3, 12px)" }}>
        <div className="slds-card__body slds-card__body_inner" style={{ padding: "var(--slds-g-spacing-3, 12px)" }}>
          <div className="slds-table_header-fixed_container">
            <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_fixed-layout" role="grid">
              <thead>
                <tr className="slds-line-height_reset">
                  <th scope="col" style={{ width: "60px" }}>
                    <div className="slds-truncate slds-text-title_caps">#</div>
                  </th>
                  <th scope="col">
                    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                      <div className="slds-truncate slds-text-title_caps">Action Type</div>
                    </div>
                  </th>
                  <th scope="col" style={{ width: "25%" }}>
                    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                      <div className="slds-truncate slds-text-title_caps">Description</div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                      <div className="slds-truncate slds-text-title_caps">Actor</div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                      <div className="slds-truncate slds-text-title_caps">Timestamp</div>
                    </div>
                  </th>
                  <th scope="col" style={{ width: "120px" }}>
                    <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                      <div className="slds-truncate slds-text-title_caps">Impact Score</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="slds-hint-parent">
                    <td style={{ textAlign: "center" }}>
                      <div className="slds-truncate" style={{ fontSize: "0.8125rem", color: "#181818" }}>
                        {index + 1}
                      </div>
                    </td>
                    <td>
                      <div className="slds-truncate" style={{ fontSize: "0.8125rem", color: "#181818" }}>
                        {activity.actionType}
                      </div>
                    </td>
                    <td>
                      <div className="slds-truncate" style={{ fontSize: "0.8125rem", color: "#181818" }}>
                        {activity.description}
                      </div>
                    </td>
                    <td>
                      <div className="slds-truncate" style={{ fontSize: "0.8125rem", color: "#181818" }}>
                        {activity.actor}
                      </div>
                    </td>
                    <td>
                      <div className="slds-truncate" style={{ fontSize: "0.8125rem", color: "#181818" }}>
                        {activity.timestamp}
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="slds-badge">{activity.impactScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
