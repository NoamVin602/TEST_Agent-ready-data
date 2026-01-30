"use client";

import { AlertTriangleIcon, ClockIcon, CopyIcon, FileEditIcon, SearchIcon, SparklesIcon, ActivityIcon, ChevronDownIcon } from "../../lib/slds-icons";
import { DataHealthDonut } from "../dashboard/DataHealthDonut";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";
import { MetricCard } from "../dashboard/MetricCard";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";
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
      style={{
        padding: 'var(--slds-g-spacing-4)',
        display: 'flex',
        gap: 'var(--slds-g-spacing-4)',
        height: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Left Column - Current State Dashboard (75%) */}
      <div style={{ flex: '0 0 75%', display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-4)', minWidth: 0 }}>
        {/* Main Card Container */}
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF', border: 'none', boxShadow: 'none' }}>
          {/* Card Header */}
          <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-4)', borderBottom: 'none' }}>
            <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
              <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-2)' }}>
                <ActivityIcon 
                  size={20}
                  color="var(--slds-g-color-on-surface-1)"
                  style={{ flexShrink: 0 }}
                />
                <div>
                  <h2 
                    className="slds-text-heading_section" 
                    style={{ 
                      margin: 0,
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-3)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      lineHeight: '28px',
                      color: 'var(--slds-g-color-on-surface-3)'
                    }}
                  >
                    Current State
                  </h2>
                  <p 
                    style={{
                      margin: 0,
                      marginTop: '2px',
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '19px',
                      color: 'var(--slds-g-color-on-surface-1)'
                    }}
                  >
                    Your knowledge base AI-readiness overview
                  </p>
                </div>
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
          <div className="slds-card__body" style={{ padding: '0 var(--slds-g-spacing-4) var(--slds-g-spacing-4)' }}>
            {/* Charts Section - Two nested cards side by side */}
            <div
              className="slds-grid"
              style={{
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--slds-g-spacing-4)',
                marginBottom: 'var(--slds-g-spacing-4)'
              }}
            >
              {/* Data Health Donut Chart */}
              <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-3)', backgroundColor: '#FFFFFF', border: '1px solid var(--slds-g-color-border-1)', boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)' }}>
                <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', borderBottom: 'none' }}>
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <h3
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-2)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '24px',
                        color: 'var(--slds-g-color-on-surface-3)',
                        margin: 0
                      }}
                    >
                      Data Health
                    </h3>
                    <button
                      type="button"
                      className="slds-button slds-button_icon slds-button_icon-small"
                      aria-label="More options"
                    >
                      <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-1)" />
                    </button>
                  </div>
                </div>
                <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
                  <DataHealthDonut percentage={70} />
                </div>
              </div>

              {/* Data Health Over Time Line Chart */}
              <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-3)', backgroundColor: '#FFFFFF', border: '1px solid var(--slds-g-color-border-1)', boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)' }}>
                <div className="slds-card__header" style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', borderBottom: 'none' }}>
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <h3
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-2)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '24px',
                        color: 'var(--slds-g-color-on-surface-3)',
                        margin: 0
                      }}
                    >
                      Data Health Over Time
                    </h3>
                    <button
                      type="button"
                      className="slds-button slds-button_icon slds-button_icon-small"
                      aria-label="More options"
                    >
                      <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-1)" />
                    </button>
                  </div>
                </div>
                <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
                  <DataHealthLineChart data={chartData} currentValue={70} />
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
        <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-3)', backgroundColor: '#FFFFFF', border: '1px solid var(--slds-g-color-border-1)', boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.18), 0px 2px 2px 0px rgba(0, 0, 0, 0.18), 0px -1px 2px 0px rgba(0, 0, 0, 0.1)' }}>
          <RecentActivityTable activities={recentActivityData} />
        </div>
      </div>

      {/* Right Column - Quick Fixes Panel (25%) */}
      <div style={{ flex: '0 0 25%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <QuickFixesSidebar />
      </div>
    </div>
  );
}
