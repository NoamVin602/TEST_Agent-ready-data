"use client";

import { forwardRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IssueCategory } from "./HomeView";
import { SeverityBadge } from "../analysis/SeverityBadge";
import { DocumentPreviewModal } from "../shared/DocumentPreviewModal";
import { PIIBulkActionModal } from "../shared/PIIBulkActionModal";
import { AIIcon, ChevronDownIcon, FilterIcon } from "../../lib/slds-icons";
import { getStageConfig } from "../../lib/stage-config";

interface AnalysisViewProps {
  initialCategory?: IssueCategory;
}

type FilterType = "all" | "contradiction" | "duplicate" | "outdated" | "multi-topic" | "poor-feedback" | "draft-incomplete" | "sensitive-data";

const FILTER_TABS: { id: FilterType; label: string }[] = [
  { id: "all", label: "All Types" },
  { id: "contradiction", label: "Contradiction" },
  { id: "duplicate", label: "Duplicate" },
  { id: "outdated", label: "Outdated" },
  { id: "multi-topic", label: "Multi-topic" },
  { id: "poor-feedback", label: "Poor Feedback" },
  { id: "draft-incomplete", label: "Draft/Incomplete" },
  { id: "sensitive-data", label: "Sensitive Data" },
];

// Generate issues based on stage configuration
function generateIssuesFromConfig() {
  const config = getStageConfig();
  const issues: Array<{
    id: string;
    title: string;
    type: string;
    severity: "high" | "medium" | "low";
    docs: number;
    owner?: string;
    detected?: string;
    authoritative?: string;
    action?: string;
    scoreImpact?: number;
  }> = [];

  // Day Zero: Show critical issues - Prioritized by score impact
  if (config.stage === 'day0') {
    // PII Issues (Critical - 5 articles for drill-down scenario) - TOP PRIORITY (+20 points)
    if (config.issues.pii > 0) {
      issues.push({
        id: "pii-1",
        title: "PII Detected in 5 Articles",
        type: "Sensitive Data",
        severity: "high",
        docs: 5, // Show 5 articles for the scenario
        owner: "Privacy Team",
        action: "Archive documents or Mask",
        scoreImpact: 20,
        piiDetails: "Customer names and emails found in old Knowledge articles"
      });
    }

    // Contradictions - SECOND PRIORITY (+10 points)
    if (config.issues.contradictions > 0) {
      issues.push({
        id: "contradiction-1",
        title: "Conflicting Specifications: Compact Solar Panel Output",
        type: "Contradiction",
        severity: "high",
        docs: config.issues.contradictions,
        owner: "Engineering",
        detected: "Web Manual: 200W",
        authoritative: "Engineering PDF Spec: 150W",
        action: "Use 'Ask an Expert' to confirm correct specification.",
        scoreImpact: 10
      });
    }

    // Outdated - THIRD PRIORITY (+5 points)
    if (config.issues.outdated > 0) {
      issues.push({
        id: "outdated-1",
        title: "Deprecated API references",
        type: "Outdated",
        severity: "high",
        docs: config.issues.outdated,
        owner: "Mike Wilson",
        scoreImpact: 5
      });
    }

    // Duplicates - FOURTH PRIORITY (+3 points)
    if (config.issues.duplicates > 0) {
      issues.push({
        id: "duplicate-1",
        title: "Duplicate pricing information",
        type: "Duplicate",
        severity: "medium",
        docs: config.issues.duplicates,
        scoreImpact: 3
      });
    }

    // Drafts - FIFTH PRIORITY (+2 points)
    if (config.issues.drafts > 0) {
      issues.push({
        id: "draft-1",
        title: "[WIP] New Feature Documentation",
        type: "Draft/Incomplete",
        severity: "high",
        docs: config.issues.drafts,
        owner: "Dev Team",
        scoreImpact: 2
      });
    }

    // Sort issues by score impact (highest first) for prioritization
    issues.sort((a, b) => (b.scoreImpact || 0) - (a.scoreImpact || 0));
  } else if (config.stage === 'goal') {
    // Goal: Show resolved/minor issues
    if (config.issues.outdated > 0) {
      issues.push({
        id: "outdated-minor",
        title: "Minor: One outdated reference found",
        type: "Outdated",
        severity: "low",
        docs: config.issues.outdated,
        owner: "System",
      });
    }
  } else if (config.stage === 'continuous') {
    // Continuous: Show content gaps
    if (config.issues.contentGaps > 0) {
      issues.push({
        id: "gap-1",
        title: "Content Gap: Inverter Maintenance",
        type: "Content Gap",
        severity: "high",
        docs: 120, // Unanswered queries
        owner: "System",
        action: "Generate draft content based on 120 unanswered queries.",
      });
    }
  }

  return issues;
}

export const AnalysisView = forwardRef<HTMLDivElement, AnalysisViewProps>(
  ({ initialCategory }, ref) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const config = getStageConfig();
    const allIssues = useMemo(() => generateIssuesFromConfig(), []);
    const [expandedIssues, setExpandedIssues] = useState<string[]>([allIssues[0]?.id || ""]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPIIModalOpen, setIsPIIModalOpen] = useState(false);
    const [selectedPIIIssue, setSelectedPIIIssue] = useState<typeof allIssues[0] | null>(null);
    const [selectedDocument, setSelectedDocument] = useState<{
      title: string;
      content: string;
      type?: string;
      detectedText?: string;
      authoritativeText?: string;
    } | null>(null);

    const toggleIssue = (id: string) => {
      setExpandedIssues((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const filteredIssues = allIssues.filter((issue) => {
      if (activeFilter === "all") return true;
      const typeMap: Record<string, FilterType> = {
        "Contradiction": "contradiction",
        "Duplicate": "duplicate",
        "Outdated": "outdated",
        "Multi-topic": "multi-topic",
        "Poor Feedback": "poor-feedback",
        "Draft/Incomplete": "draft-incomplete",
        "Sensitive Data": "sensitive-data",
      };
      return typeMap[issue.type] === activeFilter;
    });

    const handleViewDocumentPreview = (issue: typeof allIssues[0]) => {
      setSelectedDocument({
        title: issue.title,
        content: `This is a preview of the document related to "${issue.title}".\n\n${issue.action || "No additional action details available."}\n\nDocument Type: ${issue.type}\nOwner: ${issue.owner || "Unassigned"}\nNumber of Documents: ${issue.docs}`,
        type: issue.type,
        detectedText: issue.detected,
        authoritativeText: issue.authoritative,
      });
      setIsModalOpen(true);
    };

    const handlePIIBulkAction = (issue: typeof allIssues[0]) => {
      setSelectedPIIIssue(issue);
      setIsPIIModalOpen(true);
    };

    const handleMaskPII = async () => {
      // Simulate masking process
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would update the backend and refresh the score
      console.log('PII masked successfully');
    };

    const handleArchivePII = async () => {
      // Simulate archiving process
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would update the backend
      console.log('Documents archived successfully');
    };

    return (
      <div
        ref={ref}
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 var(--slds-g-spacing-6)',
          width: '100%',
        }}
      >
        {/* Top Bar - Header above Analysis Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--slds-g-spacing-1, 4px)',
            height: '32px',
            marginTop: 'var(--slds-g-spacing-4)',
            marginBottom: 'var(--slds-g-spacing-2, 8px)',
            width: '100%',
          }}
        >
          {/* Left Section - Info Text */}
          <p
            style={{
              flex: '1 0 0',
              fontFamily: 'var(--slds-g-font-family)',
              fontSize: 'var(--slds-g-font-scale-base)', // 13px
              fontWeight: 'var(--slds-g-font-weight-4)', // 400 Regular
              lineHeight: '18px',
              color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {allIssues.length}+ items • Sorted by Severity • Updated {config.lastScanTime}
          </p>

          {/* Right Section - Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--slds-g-spacing-2, 8px)',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexShrink: 0,
            }}
          >
            {/* Auto-Fix All Button */}
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={() => {
                // TODO: Implement auto-fix all functionality
                console.log('Auto-Fix All clicked');
              }}
              style={{
                display: 'flex',
                height: '32px',
                padding: '1px var(--slds-g-spacing-4, 16px)',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--slds-g-spacing-2, 8px)',
                borderRadius: 'var(--slds-g-radius-border-circle, 9999px)',
                border: '1px solid var(--slds-g-color-border-2)',
                background: 'var(--slds-g-color-surface-container-1, #FFFFFF)',
                color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                fontFamily: 'var(--slds-g-font-family)',
                fontSize: 'var(--slds-g-font-scale-1)', // 14px
                fontWeight: 'var(--slds-g-font-weight-6)', // 590 Semibold
                lineHeight: 'var(--slds-g-line-height-body)', // 19px
                cursor: 'pointer',
                transition: 'all var(--slds-g-transition-fast)',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95, #F3F3F3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-surface-container-1, #FFFFFF)';
              }}
            >
              <AIIcon size={14} color="var(--slds-g-color-accent-2, #0250D9)" />
              <span>Auto-Fix All</span>
              <ChevronDownIcon size={14} color="var(--slds-g-color-accent-2, #0250D9)" />
            </button>

            {/* Filter Button */}
            <button
              type="button"
              className="slds-button slds-button_icon-border"
              onClick={() => {
                // TODO: Implement filter functionality
                console.log('Filter clicked');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: 'var(--slds-g-radius-border-3, 12px)',
                border: '1px solid var(--slds-g-color-border-1, #C9C9C9)',
                backgroundColor: 'var(--slds-g-color-neutral-base-100, #FFFFFF)',
                color: 'var(--slds-g-color-accent-2, #0250D9)',
                cursor: 'pointer',
                transition: 'all var(--slds-g-transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95, #F3F3F3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100, #FFFFFF)';
              }}
              aria-label="Filter"
              title="Filter"
            >
              <FilterIcon size={16} color="var(--slds-g-color-accent-2, #0250D9)" />
            </button>
          </div>
        </div>

        {/* Scoped Tabs Container - Exact Figma Design */}
        <div
          style={{
            border: '1px solid var(--slds-g-color-border-1)', // #C9C9C9
            borderRadius: 'var(--slds-g-radius-border-3)', // 12px from Figma
            backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
            overflow: 'hidden',
          }}
        >
          {/* Tabset - Scoped Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
              borderBottom: '1px solid var(--slds-g-color-border-1)', // #C9C9C9
            }}
          >
            {FILTER_TABS.map((tab, index) => {
              const isActive = activeFilter === tab.id;
              const isFirst = index === 0;
              const isLast = index === FILTER_TABS.length - 1;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  style={{
                    height: 'var(--slds-g-spacing-10, 48px)', // 48px - 8pt grid (was 40px)
                    maxWidth: '160px', // Exact Figma max-width
                    padding: `0 var(--slds-g-spacing-4)`, // 0 16px from Figma
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
                    border: 'none',
                    borderTop: isActive ? `1px solid var(--slds-g-color-border-1)` : 'none', // #C9C9C9
                    borderLeft: isActive && !isFirst ? `1px solid var(--slds-g-color-border-1)` : 'none',
                    borderRight: isActive && !isLast ? `1px solid var(--slds-g-color-border-1)` : 'none',
                    borderBottom: !isActive ? `1px solid var(--slds-g-color-border-1)` : 'none',
                    fontFamily: 'var(--slds-g-font-family)',
                    fontSize: 'var(--slds-g-font-scale-1)', // 14px from Figma
                    fontWeight: 'var(--slds-g-font-weight-6)', // 590 Semibold
                    lineHeight: 'var(--slds-g-line-height-body)', // 19px from Figma
                    color: isActive 
                      ? 'var(--slds-g-color-accent-2)' // #0250D9 from Figma (active)
                      : 'var(--slds-g-color-on-surface-1)', // #5C5C5C from Figma (inactive)
                    cursor: 'pointer',
                    transition: 'all var(--slds-g-transition-fast)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)'; // #F3F3F3
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)'; // #FFFFFF
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
            {/* Spacer - Takes remaining space */}
            <div
              style={{
                flex: '1 0 0',
                height: '40px',
                borderBottom: '1px solid var(--slds-g-color-border-1)', // #C9C9C9
              }}
            />
          </div>

          {/* Content Area - Exact Figma Design */}
          <div
            style={{
              backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
              padding: 'var(--slds-g-spacing-4)', // 16px from Figma
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--slds-g-spacing-1)', // 4px gap between items from Figma
            }}
          >
            {/* Issue Cards */}
            {filteredIssues.map((issue) => {
              const isExpanded = expandedIssues.includes(issue.id);

              return (
                <motion.div
                  key={issue.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                >
                  {/* Issue Card Header */}
                  <button
                    type="button"
                    onClick={() => toggleIssue(issue.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--slds-g-spacing-2, 8px) var(--slds-g-spacing-4, 16px)', // 8px 16px - 8pt grid
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: 'var(--slds-g-spacing-2, 8px)', // 8px - 8pt grid
                    }}
                  >
                    {/* Chevron Icon */}
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: 'var(--slds-g-color-on-surface-1)', // #5C5C5C
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform var(--slds-g-transition-fast)',
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 4L10 8L6 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Title and Meta */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--slds-g-font-family)',
                          fontSize: 'var(--slds-g-font-scale-1)', // 14px from Figma
                          fontWeight: 'var(--slds-g-font-weight-6)', // 590 Semibold
                          lineHeight: 'var(--slds-g-line-height-body)', // 19px from Figma
                          color: 'var(--slds-g-color-accent-2)', // #0250D9 from Figma
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {issue.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--slds-g-spacing-2)', flexWrap: 'wrap', marginTop: '2px' }}>
                        <p
                          style={{
                            fontFamily: 'var(--slds-g-font-family)',
                            fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
                            fontWeight: 'var(--slds-g-font-weight-4)', // 400 Regular
                            lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
                            color: 'var(--slds-g-color-on-surface-1)', // #5C5C5C
                            margin: 0,
                          }}
                        >
                          {issue.type} • {issue.docs} {issue.docs === 1 ? 'doc' : 'docs'} • Owner: {issue.owner || 'Unassigned'}
                        </p>
                        {issue.scoreImpact && (
                          <span
                            className="slds-badge"
                            style={{
                              backgroundColor: 'rgba(6, 165, 154, 0.1)',
                              color: '#06A59A',
                              fontSize: 'var(--slds-g-font-scale-neg-1, 12px)',
                              fontWeight: 'var(--slds-g-font-weight-6, 590)',
                              padding: '2px var(--slds-g-spacing-2, 8px)',
                              borderRadius: 'var(--slds-g-radius-border-1, 4px)',
                            }}
                          >
                            +{issue.scoreImpact} points
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Severity Badge */}
                    <SeverityBadge severity={issue.severity} />
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: `0 var(--slds-g-spacing-4) var(--slds-g-spacing-4) 44px`, // Left padding accounts for chevron + gap
                        overflow: 'hidden',
                      }}
                    >
                      {/* Detected vs Authoritative */}
                      {issue.detected && issue.authoritative && (
                        <div style={{ marginBottom: 'var(--slds-g-spacing-3)' }}>
                          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', alignItems: 'center', marginBottom: 'var(--slds-g-spacing-1)' }}>
                            <span className="slds-badge slds-badge_detected">
                              Detected
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--slds-g-font-family)',
                                fontSize: 'var(--slds-g-font-scale-base)', // 13px
                                fontWeight: 'var(--slds-g-font-weight-4)', // 400
                                lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
                                color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E
                              }}
                            >
                              {issue.detected}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', alignItems: 'center' }}>
                            <span className="slds-badge slds-badge_authoritative">
                              Authoritative
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--slds-g-font-family)',
                                fontSize: 'var(--slds-g-font-scale-base)', // 13px
                                fontWeight: 'var(--slds-g-font-weight-4)', // 400
                                lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
                                color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E
                              }}
                            >
                              {issue.authoritative}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* PII Details - Show when drilling down */}
                      {(issue.type === "Sensitive Data" && (issue as any).piiDetails) && (
                        <div style={{ marginBottom: 'var(--slds-g-spacing-3)', padding: 'var(--slds-g-spacing-3)', backgroundColor: 'rgba(194, 57, 52, 0.05)', borderRadius: 'var(--slds-g-radius-border-2)' }}>
                          <p
                            style={{
                              fontFamily: 'var(--slds-g-font-family)',
                              fontSize: 'var(--slds-g-font-scale-base)',
                              fontWeight: 'var(--slds-g-font-weight-4)',
                              lineHeight: 'var(--slds-g-line-height-body-base)',
                              color: 'var(--slds-g-color-on-surface-2)',
                              margin: 0,
                            }}
                          >
                            {(issue as any).piiDetails}
                          </p>
                        </div>
                      )}

                      {/* Action Text */}
                      {issue.action && (
                        <div style={{ marginBottom: 'var(--slds-g-spacing-3)' }}>
                          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', alignItems: 'flex-start' }}>
                            <span className="slds-badge slds-badge_action">
                              Action
                            </span>
                            <span
                              style={{
                                fontFamily: 'var(--slds-g-font-family)',
                                fontSize: 'var(--slds-g-font-scale-base)', // 13px
                                fontWeight: 'var(--slds-g-font-weight-4)', // 400
                                lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
                                color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E
                              }}
                            >
                              {issue.action}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', justifyContent: 'flex-end', marginTop: 'var(--slds-g-spacing-3)' }}>
                        {issue.type === "Sensitive Data" ? (
                          <>
                            <button
                              type="button"
                              className="slds-button slds-button_neutral"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDocumentPreview(issue);
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                              }}
                            >
                              View Document Preview
                            </button>
                            <button
                              type="button"
                              className="slds-button slds-button_brand"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePIIBulkAction(issue);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              Archive documents or Mask
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="slds-button slds-button_neutral"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDocumentPreview(issue);
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                              }}
                            >
                              View Document Preview
                            </button>
                            <button
                              type="button"
                              className="slds-button slds-button_brand"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              Mark Resolved
                            </button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Document Preview Modal */}
        {selectedDocument && (
          <DocumentPreviewModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedDocument(null);
            }}
            document={selectedDocument}
          />
        )}

        {/* PII Bulk Action Modal */}
        {selectedPIIIssue && (
          <PIIBulkActionModal
            isOpen={isPIIModalOpen}
            onClose={() => {
              setIsPIIModalOpen(false);
              setSelectedPIIIssue(null);
            }}
            issueCount={selectedPIIIssue.docs}
            onMask={handleMaskPII}
            onArchive={handleArchivePII}
          />
        )}
      </div>
    );
  }
);

AnalysisView.displayName = "AnalysisView";
