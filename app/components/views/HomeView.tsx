"use client";

import React from 'react';
import { ActivityIcon, SparklesIcon } from "../../lib/slds-icons";
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
      style={{
        padding: 0,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        width: '100%',
        minWidth: 0,
        overflowX: 'hidden',
      }}
    >
      {/* Left Column - Cards Stats (~63%) matching Figma 698/1110 */}
      <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Current State Card */}
        <article className="slds-card" style={{ margin: 0, boxSizing: 'border-box' }}>
          {/* Card Header */}
          <div 
            style={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            {/* Left: Icon + Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
              <div 
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#C9C9C9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ActivityIcon size={14} color="#747474" />
              </div>
              <h2 
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  color: '#03234d',
                  margin: 0,
                  fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                }}
              >
                Current State
              </h2>
            </div>
            
            {/* Right: Last Scan */}
            <span
              style={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '18px',
                color: '#5C5C5C',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
              }}
            >
              Last Scan {config.lastScanTime}
            </span>
          </div>

          {/* Card Body */}
          <div style={{ padding: '0 16px 16px 16px', boxSizing: 'border-box' }}>
            {/* Insight line - sparkle + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <SparklesIcon size={16} color="#747474" />
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '18px',
                  color: '#5C5C5C',
                  fontFamily: "var(--font-family-base, 'SF Pro', sans-serif)",
                }}
              >
                Your knowledge base AI-readiness overview
              </span>
            </div>

            {/* Dashboard cards */}
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

      {/* Right Column - Top Issues (~36%) matching Figma 396/1110 */}
      <div style={{ width: '396px', maxWidth: '396px', minWidth: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <TopIssuesCard issues={config.topIssues} />
      </div>
    </div>
  );
}
