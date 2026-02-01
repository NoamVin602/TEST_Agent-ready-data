"use client";

import React from 'react';
import { AlertTriangleIcon, ClockIcon, CopyIcon, FileEditIcon, SearchIcon, SparklesIcon, ActivityIcon, ChevronDownIcon, DatabaseIcon, TrendingUpIcon } from "../../lib/slds-icons";
import { DataHealthDonut } from "../dashboard/DataHealthDonut";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";
import { MetricCard } from "../dashboard/MetricCard";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";
import { QuickFixesSidebar } from "../shared/QuickFixesSidebar";
import { Spinner } from "../shared/Spinner";

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
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <div 
      className="slds-grid"
      style={{
        padding: 0,
        display: 'flex',
        gap: 'var(--slds-g-spacing-4)',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
      }}
    >
      {/* Left Column - Current State Dashboard (75%) */}
      <div className="slds-grid slds-grid_vertical" style={{ flex: '0 0 75%', minWidth: 0, gap: 'var(--slds-g-spacing-4)' }}>
        {/* Current State Card Header - SLDS Cosmos Pattern */}
        <article className="slds-card" style={{ margin: '1px 1px 1px 16px', boxSizing: 'border-box' }}>
          <div className="slds-card__header">
            <header className="slds-media slds-media_center slds-has-flexi-truncate">
              {/* Icon */}
              <div className="slds-media__figure">
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--slds-g-radius-border-2, 8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/feed.svg"
                    alt="Feed icon"
                    style={{
                      width: '32px',
                      height: '32px',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
              
              {/* Title and Subtitle */}
              <div className="slds-media__body">
                <h2 className="slds-card__header-title">
                  Current State
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-1, 14px)',
                    fontWeight: 'var(--slds-g-font-weight-4, 400)',
                    lineHeight: 'var(--slds-g-line-height-body, 19px)',
                    color: 'var(--slds-g-color-on-surface-1, #5C5C5C)',
                    marginTop: 'var(--slds-g-spacing-1, 4px)',
                    marginBottom: 0,
                  }}
                >
                  Your knowledge base AI-readiness overview
                </p>
              </div>
              
              {/* Refresh Button */}
              <div className="slds-no-flex">
                <button
                  type="button"
                  className="slds-button slds-button_neutral"
                  aria-label="Refresh"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--slds-g-spacing-2)',
                  }}
                >
                  {isRefreshing ? (
                    <>
                      <Spinner size="x-small" variant="default" aria-label="Refreshing" />
                      <span>Refreshing...</span>
                    </>
                  ) : (
                    <span>Refresh</span>
                  )}
                </button>
              </div>
            </header>
          </div>

          {/* Card Body */}
          <div className="slds-card__body slds-card__body_inner" style={{ padding: '12px', boxSizing: 'border-box' }}>
            {/* Charts Section - Two nested cards side by side */}
            <div className="slds-grid slds-grid_1-of-2 slds-gutters slds-m-bottom_medium" style={{ minHeight: '400px', alignItems: 'stretch' }}>
              {/* Data Health Donut Chart */}
              <div className="slds-col slds-size_1-of-2">
                <article className="slds-card slds-card_full-height" style={{ margin: '1px 1px 1px 16px', boxSizing: 'border-box' }}>
                  <div className="slds-card__header slds-grid">
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
                  <div className="slds-card__body slds-card__body_inner slds-card__body_full-height">
                    <DataHealthDonut percentage={70} />
                  </div>
                </article>
              </div>

              {/* Data Health Over Time Line Chart */}
              <div className="slds-col slds-size_1-of-2">
                <article className="slds-card slds-card_full-height" style={{ margin: '1px 1px 1px 16px', boxSizing: 'border-box' }}>
                  <div className="slds-card__header slds-grid">
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
                  <div className="slds-card__body slds-card__body_inner slds-card__body_full-height">
                    <DataHealthLineChart data={chartData} currentValue={70} />
                  </div>
                </article>
              </div>
            </div>

            {/* Metrics Grid - 2 rows of 3 cards */}
            <div className="slds-grid slds-grid_wrap" style={{ gap: 'var(--slds-g-spacing-4)', marginBottom: 'var(--slds-g-spacing-4)' }}>
              {metricsData.map((metric) => (
                <div key={metric.id} style={{ flex: '1 1 calc(33.333% - var(--slds-g-spacing-4))', minWidth: '200px' }}>
                  <MetricCard
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    changeLabel={metric.changeLabel}
                    trend={metric.trend}
                    icon={metric.icon}
                    colorClass={metric.colorClass}
                    onClick={onMetricClick ? () => onMetricClick(metric.category) : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Recent Activity - Already wrapped in SLDS Card by RecentActivityTable */}
        <RecentActivityTable activities={recentActivityData} />
      </div>

      {/* Right Column - Quick Fixes Panel (25%) */}
      <div style={{ flex: '0 0 25%', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <QuickFixesSidebar />
      </div>
    </div>
  );
}
