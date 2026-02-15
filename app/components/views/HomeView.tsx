"use client";

import React from 'react';
import { ActivityIcon } from "../../lib/slds-icons";
import { getStageConfig } from "../../lib/stage-config";
import { CardsStats } from "../dashboard/CardsStats";
import { TopIssuesCard } from "../dashboard/TopIssuesCard";

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
  const config = React.useMemo(() => getStageConfig(), []);

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
        minWidth: 0,
        overflowX: 'hidden',
        backgroundColor: 'transparent'
      }}
    >
      {/* Left Column - Current State Dashboard (75%) */}
      <div className="slds-grid slds-grid_vertical" style={{ flex: '0 0 75%', minWidth: 0, gap: 'var(--slds-g-spacing-4)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
          </div>
        </article>
      </div>

      {/* Right Column - Top Issues (25%) */}
      <div style={{ flex: '0 0 25%', minWidth: 0, display: 'flex', flexDirection: 'column', alignSelf: 'stretch', height: '100%', gap: 'var(--slds-g-spacing-4)', overflow: 'hidden' }}>
        <TopIssuesCard issues={config.topIssues} />
      </div>
    </div>
  );
}
