"use client";

import { AlertTriangle, Clock, Copy, FileEdit, Search, Sparkles, HelpCircle } from "lucide-react";
import { DataHealthDonut } from "../dashboard/DataHealthDonut";
import { DataHealthLineChart } from "../dashboard/DataHealthLineChart";
import { MetricCard } from "../dashboard/MetricCard";
import { RecentActivityTable } from "../dashboard/RecentActivityTable";

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
    icon: AlertTriangle,
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
    icon: Clock,
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
    icon: Copy,
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
    icon: FileEdit,
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
    icon: Search,
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
    icon: Sparkles,
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
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--slds-g-spacing-6) var(--slds-g-spacing-4)'
      }}
    >
      {/* Current State Section Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--slds-g-spacing-2)',
          marginBottom: 'var(--slds-g-spacing-4)'
        }}
      >
        <span 
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'var(--slds-g-color-neutral-base-80)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <HelpCircle 
            style={{
              width: '14px',
              height: '14px',
              color: 'var(--slds-g-color-neutral-base-50)'
            }}
          />
        </span>
        <h2 className="slds-text-heading_section">Current State</h2>
      </div>

      <p 
        className="slds-text-body_small" 
        style={{ marginBottom: 'var(--slds-g-spacing-6)' }}
      >
        Your knowledge base AI-readiness overview
      </p>

      {/* Charts Section */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 'var(--slds-g-spacing-6)',
          marginBottom: 'var(--slds-g-spacing-6)'
        }}
      >
        {/* Data Health Donut */}
        <div 
          style={{
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            border: '1px solid var(--slds-g-color-border-1)',
            borderRadius: 'var(--slds-g-radius-border-2)',
            padding: 'var(--slds-g-spacing-5)',
            boxShadow: 'var(--slds-g-shadow-1)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--slds-g-spacing-4)'
            }}
          >
            <h3 className="slds-text-heading_card">Data Health</h3>
            <button
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '1px solid var(--slds-g-color-border-1)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--slds-g-color-text-weak)'
              }}
            >
              ⋮
            </button>
          </div>
          <DataHealthDonut percentage={70} />
        </div>

        {/* Data Health Over Time */}
        <div 
          style={{
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            border: '1px solid var(--slds-g-color-border-1)',
            borderRadius: 'var(--slds-g-radius-border-2)',
            padding: 'var(--slds-g-spacing-5)',
            boxShadow: 'var(--slds-g-shadow-1)'
          }}
        >
          <h3 className="slds-text-heading_card" style={{ marginBottom: 'var(--slds-g-spacing-4)' }}>
            Data Health Over Time
          </h3>
          <DataHealthLineChart data={chartData} currentValue={70} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--slds-g-spacing-4)',
          marginBottom: 'var(--slds-g-spacing-6)'
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

      {/* Recent Activity Table */}
      <RecentActivityTable activities={recentActivityData} />
    </div>
  );
}
