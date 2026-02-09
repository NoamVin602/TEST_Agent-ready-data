"use client";

import React from 'react';
import { AlertTriangleIcon, ClockIcon, CopyIcon, FileEditIcon, SearchIcon, SparklesIcon, ActivityIcon, ChevronDownIcon, DatabaseIcon, TrendingUpIcon } from "../../lib/slds-icons";
import { DataHealthDonut } from "../dashboard/DataHealthDonut";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";
import { MetricCard } from "../dashboard/MetricCard";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";
import { QuickFixesSidebar } from "../shared/QuickFixesSidebar";
import { Spinner } from "../shared/Spinner";
import { getStageConfig } from "../../lib/stage-config";
import { CardsStats } from "../dashboard/CardsStats";

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

// Get stage configuration
const stageConfig = getStageConfig();

export function HomeView({ onMetricClick }: HomeViewProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const config = React.useMemo(() => getStageConfig(), []);

  // Build metrics data from stage config
  const metricsData = React.useMemo(() => [
    {
      id: "contradictions",
      category: "contradictions" as IssueCategory,
      title: "Contradictions",
      value: config.issues.contradictions,
      change: config.stage === 'day0' ? 0 : -4,
      changeLabel: config.stage === 'day0' ? "found" : "last 30 days",
      trend: config.stage === 'day0' ? "neutral" as const : "down" as const,
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
      value: config.issues.outdated,
      change: config.stage === 'day0' ? 0 : -4,
      changeLabel: config.stage === 'day0' ? "found" : "last 30 days",
      trend: config.stage === 'day0' ? "neutral" as const : "down" as const,
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
      value: config.issues.duplicates,
      change: config.stage === 'day0' ? 0 : 1.3,
      changeLabel: config.stage === 'day0' ? "found" : "vs last 30 days",
      trend: config.stage === 'day0' ? "neutral" as const : "up" as const,
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
      value: config.issues.drafts,
      change: config.stage === 'day0' ? 0 : 12.3,
      changeLabel: config.stage === 'day0' ? "found" : "vs last 30 days",
      trend: config.stage === 'day0' ? "neutral" as const : "up" as const,
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
      value: config.issues.contentGaps,
      change: config.stage === 'day0' ? 0 : 12.3,
      changeLabel: config.stage === 'day0' ? "found" : "vs last 30 days",
      trend: config.stage === 'day0' ? "neutral" as const : "up" as const,
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
      value: config.stage === 'continuous' ? 3 : 0,
      change: config.stage === 'continuous' ? 3 : 0,
      changeLabel: "vs last 30 days",
      trend: "up" as const,
      icon: SparklesIcon,
      colorClass: {
        background: "rgba(46, 132, 74, 0.1)",
        text: "var(--slds-g-color-success-base-50)"
      }
    }
  ], [config]);

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
        alignItems: 'stretch',
        gap: 'var(--slds-g-spacing-4)',
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent'
      }}
    >
      {/* Left Column - Current State Dashboard (75%) */}
      <div className="slds-grid slds-grid_vertical" style={{ flex: '0 0 75%', minWidth: 0, gap: 'var(--slds-g-spacing-4)', display: 'flex', flexDirection: 'column' }}>
        {/* Current State Card Header - Matching Figma */}
        <article className="slds-card" style={{ margin: '0 1px 1px 16px', boxSizing: 'border-box' }}>
          <div 
            className="slds-card__header"
            style={{
              height: '75px',
              padding: 'var(--slds-g-spacing-4, 16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            {/* Left Section - Icon, Title, Subtitle */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-3, 12px)',
                flex: '1 0 0',
                minWidth: 0,
              }}
            >
              {/* Icon */}
              <div 
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--slds-g-color-neutral-base-80, #C9C9C9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ActivityIcon
                  size={14}
                  color="var(--slds-g-color-neutral-base-50, #747474)"
                />
              </div>
              
              {/* Title and Subtitle */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--slds-g-spacing-1, 4px)',
                  minWidth: 0,
                }}
              >
                <h2 
                  style={{
                    fontSize: 'var(--slds-g-font-scale-3, 20px)',
                    fontWeight: 'var(--slds-g-font-weight-4, 400)',
                    lineHeight: '28px',
                    color: 'var(--slds-g-color-on-surface-3, #03234d)',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Current State
                </h2>
                <p
                  style={{
                    fontSize: 'var(--slds-g-font-scale-base, 13px)',
                    fontWeight: 'var(--slds-g-font-weight-4, 400)',
                    lineHeight: '18px',
                    color: 'var(--slds-g-color-on-surface-1, #5C5C5C)',
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Your knowledge base AI-readiness overview
                </p>
              </div>
            </div>
            
            {/* Right Section - Last Scan Time */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                marginLeft: 'var(--slds-g-spacing-4, 16px)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--slds-g-font-scale-base, 13px)',
                  fontWeight: 'var(--slds-g-font-weight-4, 400)',
                  lineHeight: '18px',
                  color: 'var(--slds-g-color-on-surface-1, #5C5C5C)',
                  whiteSpace: 'nowrap',
                }}
              >
                Last Scan {config.lastScanTime}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="slds-card__body slds-card__body_inner" style={{ padding: '12px', boxSizing: 'border-box' }}>
            {/* Cards Stats Component */}
            <CardsStats
              healthScore={config.healthScore}
              issuesDetected={config.issues.contradictions + config.issues.outdated + config.issues.duplicates + config.issues.drafts}
              highSeverityCount={6}
              mediumSeverityCount={8}
              chartData={config.chartData}
              recentActivity={config.recentActivity.map((activity) => ({
                actionType: activity.actionType,
                description: activity.description,
                actor: activity.actor,
                timestamp: activity.timestamp,
                impactScore: parseInt(activity.impactScore) || 0,
              }))}
            />

            {/* Metrics Grid - 2 rows of 3 cards */}
            <div className="slds-grid slds-grid_wrap" style={{ gap: 'var(--slds-g-spacing-4)', marginTop: 'var(--slds-g-spacing-4)', marginBottom: 'var(--slds-g-spacing-4)' }}>
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
      </div>

      {/* Right Column - Quick Fixes Panel (25%) */}
      <div style={{ flex: '0 0 25%', minWidth: 0, display: 'flex', flexDirection: 'column', alignSelf: 'stretch', height: '100%' }}>
        <QuickFixesSidebar />
      </div>
    </div>
  );
}
