"use client";

import { useState, useEffect, forwardRef } from "react";
import { Filter } from "lucide-react";
import { IssueCard } from "../analysis/IssueCard";
import type { IssueCategory } from "./HomeView";

// Filter tabs
const FILTER_TABS = [
  { id: "all", label: "All Types" },
  { id: "conflicting", label: "Contradiction" },
  { id: "duplicate", label: "Duplicate" },
  { id: "stale", label: "Outdated" },
  { id: "multitopic", label: "Multi-topic" },
  { id: "poorfeedback", label: "Poor Feedback" },
  { id: "draft", label: "Draft/Incomplete" },
  { id: "sensitive", label: "Sensitive Data" },
];

// Map category to filter
const CATEGORY_TO_FILTER: Record<IssueCategory, string> = {
  all: "all",
  contradictions: "conflicting",
  outdated: "stale",
  duplicates: "conflicting",
  drafts: "draft",
  "content-gaps": "all",
  enrichments: "all",
};

interface AnalysisViewProps {
  initialCategory?: IssueCategory;
}

export const AnalysisView = forwardRef<HTMLDivElement, AnalysisViewProps>(
  function AnalysisView({ initialCategory = "all" }, ref) {
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
      const filter = CATEGORY_TO_FILTER[initialCategory];
      setActiveFilter(filter);
    }, [initialCategory]);

    return (
      <div 
        ref={ref}
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
            50+ items • Sorted by Severity • Updated a few seconds ago
          </div>
          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-2)',
                padding: '6px var(--slds-g-spacing-4)',
                backgroundColor: 'var(--slds-g-color-brand-base-50)',
                border: 'none',
                borderRadius: 'var(--slds-g-radius-border-2)',
                color: 'var(--slds-g-color-neutral-base-100)',
                fontSize: 'var(--slds-g-font-scale-1)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                cursor: 'pointer',
                transition: 'background-color var(--slds-g-transition-base)',
                height: '32px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-60)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-brand-base-50)';
              }}
            >
              Auto-Fix All
            </button>
            <button
              type="button"
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--slds-g-color-neutral-base-100)',
                border: '1px solid var(--slds-g-color-border-1)',
                borderRadius: 'var(--slds-g-radius-border-2)',
                color: 'var(--slds-g-color-text-default)',
                cursor: 'pointer',
                transition: 'all var(--slds-g-transition-base)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)';
              }}
            >
              <Filter style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div 
          style={{
            display: 'flex',
            gap: 'var(--slds-g-spacing-2)',
            marginBottom: 'var(--slds-g-spacing-4)',
            overflowX: 'auto',
            paddingBottom: 'var(--slds-g-spacing-1)'
          }}
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '6px var(--slds-g-spacing-3)',
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
                transition: 'all var(--slds-g-transition-base)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
                  e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== tab.id) {
                  e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
                  e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)';
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Issue List */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--slds-g-spacing-3)'
          }}
        >
          <IssueCard
            id={1}
            title="Conflicting refund policy"
            type="Contradiction"
            docCount={2}
            owner="Sarah Chen"
            severity="high"
            detectedText="14-day window"
            authoritativeText="30-day guarantee"
            actionText="Update Customer Support FAQ and Q3 Sales Playbook to 30 days."
            onViewDocument={() => console.log('View document')}
            onMarkResolved={() => console.log('Mark resolved')}
          />
          <IssueCard
            id={2}
            title="Deprecated API references"
            type="Outdated"
            docCount={1}
            owner="Mike Wilson"
            severity="high"
          />
          <IssueCard
            id={3}
            title="[WIP] New Feature Documentation"
            type="Draft/Incomplete"
            docCount={1}
            owner="Dev Team"
            severity="high"
          />
          <IssueCard
            id={4}
            title="PII detected: Customer email addresses"
            type="Sensitive Data"
            docCount={1}
            owner="Privacy Team"
            severity="high"
          />
          <IssueCard
            id={5}
            title="Employee salary data in shared doc"
            type="Sensitive Data"
            docCount={1}
            owner="HR Team"
            severity="high"
          />
          <IssueCard
            id={6}
            title="API credentials exposed in documentation"
            type="Sensitive Data"
            docCount={1}
            owner="Security"
            severity="high"
          />
          <IssueCard
            id={7}
            title="Platform Guide needs splitting"
            type="Sensitive Data"
            docCount={1}
            owner="Content Team"
            severity="medium"
          />
        </div>
      </div>
    );
  }
);
