"use client";

import { useState } from "react";
import { TrendingUp, ChevronDown, ChevronRight } from "lucide-react";

const FILTER_TABS = [
  { id: "all", label: "All Gaps" },
  { id: "missing", label: "Missing Topics" },
  { id: "incomplete", label: "Incomplete Docs" },
  { id: "questions", label: "User Questions" },
];

const CONTENT_GAPS = [
  {
    id: 1,
    title: "SSO Configuration Guide for Okta",
    type: "Missing Topics",
    queryCount: 156,
    impact: "high",
    weeklyTrend: "+23%",
  },
  {
    id: 2,
    title: "API Rate Limiting Best Practices",
    type: "Missing Topics",
    queryCount: 89,
    impact: "high",
    weeklyTrend: "+15%",
  },
  {
    id: 3,
    title: "Multi-tenant Architecture Overview",
    type: "Missing Topics",
    queryCount: 67,
    impact: "medium",
    weeklyTrend: "+8%",
  },
  {
    id: 4,
    title: "Webhook Configuration Tutorial",
    type: "Incomplete Docs",
    queryCount: 45,
    impact: "medium",
    weeklyTrend: "+5%",
  },
  {
    id: 5,
    title: "Data Export Formats Documentation",
    type: "User Questions",
    queryCount: 34,
    impact: "low",
    weeklyTrend: "-2%",
  },
];

export function ContentGapsView() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return {
          bg: "var(--slds-g-color-error-tint)",
          text: "var(--slds-g-color-error-base-50)"
        };
      case "medium":
        return {
          bg: "var(--slds-g-color-warning-tint)",
          text: "var(--slds-g-color-warning-base-50)"
        };
      case "low":
        return {
          bg: "var(--slds-g-color-badge-action)",
          text: "var(--slds-g-color-badge-action-text)"
        };
      default:
        return {
          bg: "var(--slds-g-color-neutral-base-95)",
          text: "var(--slds-g-color-text-default)"
        };
    }
  };

  return (
    <div 
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--slds-g-spacing-4)'
      }}
    >
      {/* Top Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--slds-g-spacing-4)'
        }}
      >
        <div className="slds-text-body_small">
          7 content gaps identified • Sorted by query volume
        </div>
        <button
          type="button"
          style={{
            padding: 'var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-4, 16px)',
            backgroundColor: 'var(--slds-g-color-brand-base-50)',
            border: 'none',
            borderRadius: 'var(--slds-g-radius-border-2)',
            color: 'var(--slds-g-color-neutral-base-100)',
            fontSize: 'var(--slds-g-font-scale-1)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            cursor: 'pointer',
            height: '32px'
          }}
        >
          Create Missing Docs
        </button>
      </div>

      {/* Filter Tabs */}
      <div 
        style={{
          display: 'flex',
          gap: 'var(--slds-g-spacing-2)',
          marginBottom: 'var(--slds-g-spacing-4)',
          overflowX: 'auto'
        }}
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            style={{
              padding: 'var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-2, 8px)',
              backgroundColor: activeFilter === tab.id 
                ? 'var(--slds-g-color-brand-base-50)' 
                : 'var(--slds-g-color-neutral-base-100)',
              border: `1px solid ${activeFilter === tab.id 
                ? 'var(--slds-g-color-brand-base-50)' 
                : 'var(--slds-g-color-border-1)'}`,
              borderRadius: 'var(--slds-g-radius-border-3)',
              color: activeFilter === tab.id 
                ? 'var(--slds-g-color-neutral-base-100)' 
                : 'var(--slds-g-color-text-default)',
              fontSize: 'var(--slds-g-font-scale-1)',
              fontWeight: activeFilter === tab.id 
                ? 'var(--slds-g-font-weight-6)' 
                : 'var(--slds-g-font-weight-4)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gap Cards */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--slds-g-spacing-3)'
        }}
      >
        {CONTENT_GAPS.map((gap) => {
          const impactColors = getImpactColor(gap.impact);
          const isExpanded = expandedId === gap.id;

          return (
            <div
              key={gap.id}
              style={{
                backgroundColor: 'var(--slds-g-color-neutral-base-100)',
                border: '1px solid var(--slds-g-color-border-1)',
                borderRadius: 'var(--slds-g-radius-border-2)',
                padding: 'var(--slds-g-spacing-4)',
                cursor: 'pointer',
                transition: 'all var(--slds-g-transition-base)'
              }}
              onClick={() => setExpandedId(isExpanded ? null : gap.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--slds-g-spacing-3)' }}>
                {isExpanded ? (
                  <ChevronDown style={{ width: '16px', height: '16px', color: 'var(--slds-g-color-brand-base-50)', flexShrink: 0, marginTop: '4px' }} />
                ) : (
                  <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--slds-g-color-brand-base-50)', flexShrink: 0, marginTop: '4px' }} />
                )}
                <div style={{ flex: 1 }}>
                  <h3 
                    style={{
                      fontSize: 'var(--slds-g-font-scale-2)',
                      fontWeight: 'var(--slds-g-font-weight-semibold)',
                      color: 'var(--slds-g-color-text-default)',
                      marginBottom: 'var(--slds-g-spacing-2)'
                    }}
                  >
                    {gap.title}
                  </h3>
                  <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span 
                      style={{
                        padding: '2px var(--slds-g-spacing-2)',
                        borderRadius: 'var(--slds-g-radius-border-1)',
                        fontSize: 'var(--slds-g-font-scale-neg-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        backgroundColor: 'var(--slds-g-color-neutral-base-95)',
                        color: 'var(--slds-g-color-text-default)'
                      }}
                    >
                      {gap.type}
                    </span>
                    <span className="slds-text-body_small">
                      {gap.queryCount} queries
                    </span>
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: 'var(--slds-g-font-scale-neg-1)',
                        color: 'var(--slds-g-color-success-base-50)',
                        fontWeight: 'var(--slds-g-font-weight-6)'
                      }}
                    >
                      <TrendingUp style={{ width: '12px', height: '12px' }} />
                      {gap.weeklyTrend}
                    </span>
                    <span 
                      style={{
                        padding: '2px var(--slds-g-spacing-2)',
                        borderRadius: 'var(--slds-g-radius-border-1)',
                        fontSize: 'var(--slds-g-font-scale-neg-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        backgroundColor: impactColors.bg,
                        color: impactColors.text,
                        textTransform: 'capitalize'
                      }}
                    >
                      {gap.impact} Impact
                    </span>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div 
                  style={{
                    marginTop: 'var(--slds-g-spacing-4)',
                    paddingTop: 'var(--slds-g-spacing-4)',
                    borderTop: '1px solid var(--slds-g-color-border-2)'
                  }}
                >
                  <div className="slds-text-body_small" style={{ marginBottom: 'var(--slds-g-spacing-2)' }}>
                    Sample queries needing this content...
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', marginTop: 'var(--slds-g-spacing-3)' }}>
                    <button
                      style={{
                        padding: 'var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-4, 16px)',
                        backgroundColor: 'var(--slds-g-color-brand-base-50)',
                        border: 'none',
                        borderRadius: 'var(--slds-g-radius-border-2)',
                        color: 'var(--slds-g-color-neutral-base-100)',
                        fontSize: 'var(--slds-g-font-scale-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Create Doc
                    </button>
                    <button
                      style={{
                        padding: 'var(--slds-g-spacing-1, 4px) var(--slds-g-spacing-4, 16px)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--slds-g-color-border-1)',
                        borderRadius: 'var(--slds-g-radius-border-2)',
                        color: 'var(--slds-g-color-text-default)',
                        fontSize: 'var(--slds-g-font-scale-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Queries
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
