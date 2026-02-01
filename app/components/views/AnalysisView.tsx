"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { IssueCategory } from "./HomeView";
import { SeverityBadge } from "../analysis/SeverityBadge";
import { DocumentPreviewModal } from "../shared/DocumentPreviewModal";
import { AIIcon, ChevronDownIcon, FilterIcon } from "../../lib/slds-icons";

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

const MOCK_ISSUES = [
  {
    id: "1",
    title: "Conflicting refund policy",
    type: "Contradiction",
    severity: "high" as const,
    docs: 2,
    owner: "Sarah Chen",
    detected: "14-day window",
    authoritative: "30-day guarantee",
    action: "Update Customer Support FAQ and Q3 Sales Playbook to 30 days.",
  },
  {
    id: "2",
    title: "Deprecated API references",
    type: "Outdated",
    severity: "high" as const,
    docs: 1,
    owner: "Mike Wilson",
  },
  {
    id: "3",
    title: "[WIP] New Feature Documentation",
    type: "Draft/Incomplete",
    severity: "high" as const,
    docs: 1,
    owner: "Dev Team",
  },
  {
    id: "4",
    title: "PII detected: Customer email addresses",
    type: "Sensitive Data",
    severity: "high" as const,
    docs: 1,
    owner: "Privacy Team",
  },
  {
    id: "5",
    title: "Employee salary data in shared doc",
    type: "Sensitive Data",
    severity: "high" as const,
    docs: 1,
    owner: "HR Team",
  },
  {
    id: "6",
    title: "API credentials exposed in documentation",
    type: "Sensitive Data",
    severity: "high" as const,
    docs: 1,
    owner: "Security",
  },
  {
    id: "7",
    title: "Platform Guide needs splitting",
    type: "Draft/Incomplete",
    severity: "medium" as const,
    docs: 1,
  },
];

export const AnalysisView = forwardRef<HTMLDivElement, AnalysisViewProps>(
  ({ initialCategory }, ref) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [expandedIssues, setExpandedIssues] = useState<string[]>(["1"]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const filteredIssues = MOCK_ISSUES.filter((issue) => {
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

    const handleViewDocumentPreview = (issue: typeof MOCK_ISSUES[0]) => {
      setSelectedDocument({
        title: issue.title,
        content: `This is a preview of the document related to "${issue.title}".\n\n${issue.action || "No additional action details available."}\n\nDocument Type: ${issue.type}\nOwner: ${issue.owner || "Unassigned"}\nNumber of Documents: ${issue.docs}`,
        type: issue.type,
        detectedText: issue.detected,
        authoritativeText: issue.authoritative,
      });
      setIsModalOpen(true);
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
            50+ items • Sorted by Severity • Updated a few seconds ago
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
                      <p
                        style={{
                          fontFamily: 'var(--slds-g-font-family)',
                          fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
                          fontWeight: 'var(--slds-g-font-weight-4)', // 400 Regular
                          lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
                          color: 'var(--slds-g-color-on-surface-1)', // #5C5C5C
                          margin: '2px 0 0 0',
                        }}
                      >
                        {issue.type} • {issue.docs} {issue.docs === 1 ? 'doc' : 'docs'} • Owner: {issue.owner || 'Unassigned'}
                      </p>
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
      </div>
    );
  }
);

AnalysisView.displayName = "AnalysisView";
