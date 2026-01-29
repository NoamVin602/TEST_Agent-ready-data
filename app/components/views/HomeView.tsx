"use client";

import { AlertTriangleIcon, ClockIcon, CopyIcon, FileEditIcon, SearchIcon, SparklesIcon, ActivityIcon, ChevronDownIcon } from "../../lib/slds-icons";
import { DataHealthDonut } from "../dashboard/DataHealthDonut";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";
import { MetricCard } from "../dashboard/MetricCard";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";
import { AIReadyScore } from "../dashboard/AIReadyScore";
import { QuickFixesSidebar } from "../shared/QuickFixesSidebar";

export type IssueCategory = 
  | "all" 
  | "contradictions" 
  | "outdated" 
  | "duplicates" 
  | "drafts" 
  | "content-gaps" 
  | "enrichments";

interface HomeViewProps {
  onMetricClick?: (category: IssueCategory) => void;
}

// Sample data
const chartData = [
  { date: "2.20", value: 60 },
  { date: "2.27", value: 58 },
  { date: "3.06", value: 65 },
  { date: "3.13", value: 62 },
  { date: "3.20", value: 68 },
  { date: "3.27", value: 66 },
  { date: "4.03", value: 70 },
  { date: "4.10", value: 69 },
  { date: "4.17", value: 72 },
  { date: "4.20", value: 70 }
];

const metricsData = [
  {
    id: "contradictions",
    category: "contradictions" as IssueCategory,
    title: "Contradictions",
    value: 0,
    change: -4,
    changeLabel: "last 30 days",
    trend: "down" as const,
    icon: AlertTriangleIcon,
    colorClass: {
      background: "rgba(194, 57, 52, 0.1)",
      text: "var(--slds-g-color-error-base-50)"
    }
  },
  {
    id: "outdated",
    category: "outdated" as IssueCategory,
    title: "Outdated",
    value: 0,
    change: -4,
    changeLabel: "last 30 days",
    trend: "down" as const,
    icon: ClockIcon,
    colorClass: {
      background: "rgba(254, 147, 57, 0.1)",
      text: "var(--slds-g-color-warning-base-50)"
    }
  },
  {
    id: "duplicates",
    category: "duplicates" as IssueCategory,
    title: "Duplicates",
    value: 0,
    change: 1.3,
    changeLabel: "vs last 30 days",
    trend: "up" as const,
    icon: CopyIcon,
    colorClass: {
      background: "rgba(254, 147, 57, 0.1)",
      text: "var(--slds-g-color-warning-base-50)"
    }
  },
  {
    id: "drafts",
    category: "drafts" as IssueCategory,
    title: "Drafts/WIP",
    value: 0,
    change: 12.3,
    changeLabel: "vs last 30 days",
    trend: "up" as const,
    icon: FileEditIcon,
    colorClass: {
      background: "rgba(254, 147, 57, 0.1)",
      text: "var(--slds-g-color-warning-base-50)"
    }
  },
  {
    id: "content-gaps",
    category: "content-gaps" as IssueCategory,
    title: "Content Gaps",
    value: 3,
    change: 12.3,
    changeLabel: "vs last 30 days",
    trend: "up" as const,
    icon: SearchIcon,
    colorClass: {
      background: "rgba(254, 147, 57, 0.1)",
      text: "var(--slds-g-color-warning-base-50)"
    }
  },
  {
    id: "enrichments",
    category: "enrichments" as IssueCategory,
    title: "Enrichments",
    value: 3,
    change: 3,
    changeLabel: "vs last 30 days",
    trend: "up" as const,
    icon: SparklesIcon,
    colorClass: {
      background: "rgba(46, 132, 74, 0.1)",
      text: "var(--slds-g-color-success-base-50)"
    }
  }
];

const recentActivityData = [
  {
    id: 1,
    actionType: "Auto-fixed issues & notified owner",
    description: "6 fixed, 4 escalated",
    actor: "System",
    timestamp: "Nov 12 2025, 14:35",
    impactScore: "+5"
  },
  {
    id: 2,
    actionType: "Created new content...",
    description: "SSO with Okta Setup Guide",
    actor: "Sarah Chen",
    timestamp: "Nov 12 2025, 11:12",
    impactScore: "+3"
  },
  {
    id: 3,
    actionType: "Resolved contradiction",
    description: "Refund Policy",
    actor: "Sarah Chen",
    timestamp: "Nov 12 2025, 8:45",
    impactScore: "+18"
  },
  {
    id: 4,
    actionType: "Label",
    description: "Label",
    actor: "Label",
    timestamp: "Nov 11 2025, 19:55",
    impactScore: "+7"
  }
];

export function HomeView({ onMetricClick }: HomeViewProps) {
  return (
    <div 
      className="slds-container"
      style={{
        padding: 'var(--slds-g-spacing-4)',
        display: 'flex',
        gap: 'var(--slds-g-spacing-4)',
        height: '100%'
      }}
    >
      {/* Left Column - Current State Dashboard (75%) */}
      <div style={{ flex: '0 0 75%', display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-4)', minWidth: 0 }}>
        {/* Main Card Container */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)' }}>
          {/* Card Header */}
          <div className="slds-card__header">
            <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
              <div className="slds-grid slds-grid_vertical-align-center slds-gap_small">
                <ActivityIcon 
                  size={20}
                  color="var(--slds-g-color-on-surface-1)"
                  style={{ flexShrink: 0 }}
                />
                <h2 className="slds-text-heading_section" style={{ margin: 0 }}>
                  Current State
                </h2>
              </div>
              <button
                type="button"
                className="slds-button slds-button_icon slds-button_icon-small"
                aria-label="More options"
              >
                <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-1)" />
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="slds-card__body">
            {/* Subtitle */}
            <p 
              className="slds-text-body"
              style={{
                fontSize: 'var(--slds-g-font-scale-1)',
                lineHeight: '19px',
                color: 'var(--slds-g-color-on-surface-1)',
                marginBottom: 'var(--slds-g-spacing-4)',
                marginTop: 0
              }}
            >
              Your knowledge base AI-readiness overview
            </p>

            {/* AI Ready Score - Compact Metric Style */}
            <div
              style={{
                backgroundColor: '#DEF9F3',
                border: '1px solid var(--slds-g-color-brand-base-90)',
                borderRadius: 'var(--slds-g-radius-border-3)',
                padding: 'var(--slds-g-spacing-4)',
                marginBottom: 'var(--slds-g-spacing-4)',
                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="slds-grid slds-grid_vertical-align-center slds-gap_small" style={{ marginBottom: 'var(--slds-g-spacing-1)' }}>
                <AlertTriangleIcon size={16} color="#01C3B3" />
                <div className="slds-grid slds-grid_vertical-align-center" style={{ flex: 1, gap: 'var(--slds-g-spacing-1)' }}>
                  <span className="slds-text-body_semibold" style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', lineHeight: '17px', color: 'var(--slds-g-color-on-surface-1)' }}>
                    AI Ready Score
                  </span>
                  <span className="slds-text-body_semibold" style={{ fontSize: 'var(--slds-g-font-scale-neg-1)', lineHeight: '17px', color: '#2E844A' }}>
                    ▲ 1.3%
                  </span>
                </div>
              </div>
              <div style={{ marginBottom: 'var(--slds-g-spacing-1)' }}>
                <div
                  style={{
                    height: '8px',
                    backgroundColor: 'var(--slds-g-color-surface-container-3)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '60%',
                      backgroundColor: '#04E1CB',
                      borderRadius: '9999px',
                      transition: 'width 1s ease'
                    }}
                  />
                </div>
                <div className="slds-grid slds-grid_align-spread" style={{ marginTop: '2px' }}>
                  <span className="slds-text-body_semibold" style={{ fontSize: 'var(--slds-g-font-scale-neg-2)', lineHeight: '14px', color: 'var(--slds-g-color-on-surface-2)' }}>
                    60%
                  </span>
                  <span className="slds-text-body" style={{ fontSize: 'var(--slds-g-font-scale-neg-2)', lineHeight: '14px', color: 'var(--slds-g-color-on-surface-1)', textAlign: 'right' }}>
                    100%
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid - 2 rows of 3 cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--slds-g-spacing-4)',
                marginBottom: 'var(--slds-g-spacing-4)'
              }}
            >
              {metricsData.map((metric) => (
                <MetricCard
                  key={metric.id}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeLabel={metric.changeLabel}
                  trend={metric.trend}
                  icon={metric.icon}
                  colorClass={metric.colorClass}
                  onClick={onMetricClick ? () => onMetricClick(metric.category) : undefined}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity - Nested Card */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-3)' }}>
          <RecentActivityTable activities={recentActivityData} />
        </div>
      </div>

      {/* Right Column - Quick Fixes Panel (25%) */}
      <div style={{ flex: '0 0 25%', minWidth: 0 }}>
        <QuickFixesSidebar />
      </div>
    </div>
  );
}
