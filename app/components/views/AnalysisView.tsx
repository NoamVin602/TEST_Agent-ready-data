"use client";

import { forwardRef, useState } from "react";
import { ChevronRight, Filter } from "lucide-react";
import { IssueCategory } from "./HomeView";

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
    severity: "High" as const,
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
    severity: "High" as const,
    docs: 1,
    owner: "Mike Wilson",
  },
  {
    id: "3",
    title: "[WIP] New Feature Documentation",
    type: "Draft/Incomplete",
    severity: "High" as const,
    docs: 1,
    owner: "Dev Team",
  },
  {
    id: "4",
    title: "PII detected: Customer email addresses",
    type: "Sensitive Data",
    severity: "High" as const,
    docs: 1,
    owner: "Privacy Team",
  },
  {
    id: "5",
    title: "Employee salary data in shared doc",
    type: "Sensitive Data",
    severity: "High" as const,
    docs: 1,
    owner: "HR Team",
  },
  {
    id: "6",
    title: "API credentials exposed in documentation",
    type: "Sensitive Data",
    severity: "High" as const,
    docs: 1,
    owner: "Security",
  },
  {
    id: "7",
    title: "Platform Guide needs splitting",
    type: "Draft/Incomplete",
    severity: "Medium" as const,
    docs: 1,
  },
];

export const AnalysisView = forwardRef<HTMLDivElement, AnalysisViewProps>(
  ({ initialCategory }, ref) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [expandedIssues, setExpandedIssues] = useState<string[]>(["1"]);

    const toggleIssue = (id: string) => {
      setExpandedIssues((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '16px',
          borderRadius: '20px',
          margin: '16px',
          maxWidth: '1440px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Meta Text Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4px',
            height: '32px',
            marginBottom: '8px',
          }}
        >
          <p
            style={{
              flex: '1 0 0',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              color: '#5C5C5C',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            50+ items • Sorted by Severity • Updated a few seconds ago
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #C9C9C9',
                backgroundColor: '#FFFFFF',
                color: '#0176D3',
                fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '13px',
                fontWeight: 590,
                lineHeight: '19px',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F3F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Auto-Fix All
            </button>

            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border: '1px solid #C9C9C9',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F3F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <Filter style={{ width: '14px', height: '14px', color: '#5C5C5C' }} />
            </button>
          </div>
        </div>

        {/* Filter Tabs (Scoped Tabs) */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '0 0 16px 0',
            borderBottom: '1px solid #E5E5E5',
            marginBottom: '16px',
            overflowX: 'auto',
          }}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: isActive ? '1px solid #0176D3' : '1px solid #C9C9C9',
                  backgroundColor: isActive ? '#E8F4FF' : '#FFFFFF',
                  color: isActive ? '#0176D3' : '#5C5C5C',
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 590 : 400,
                  lineHeight: '19px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease-in-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#0176D3';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#C9C9C9';
                  }
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Issue Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MOCK_ISSUES.map((issue) => {
            const isExpanded = expandedIssues.includes(issue.id);
            const severityColor = issue.severity === 'High' ? '#C23934' : issue.severity === 'Medium' ? '#FE9339' : '#0176D3';
            const severityBg = issue.severity === 'High' ? '#FDECEC' : issue.severity === 'Medium' ? '#FEF4E6' : '#E8F4FF';

            return (
              <div
                key={issue.id}
                style={{
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease-in-out',
                }}
              >
                {/* Issue Header - Always Visible */}
                <button
                  type="button"
                  onClick={() => toggleIssue(issue.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <ChevronRight
                      style={{
                        width: '16px',
                        height: '16px',
                        color: '#5C5C5C',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease-in-out',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '14px',
                          fontWeight: 590,
                          lineHeight: '19px',
                          color: '#0176D3',
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
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: '#5C5C5C',
                          margin: '2px 0 0 0',
                        }}
                      >
                        {issue.type} • {issue.docs} {issue.docs === 1 ? 'doc' : 'docs'} • Owner: {issue.owner}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: severityBg,
                      border: `1px solid ${severityColor}`,
                      color: severityColor,
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: '11px',
                      fontWeight: 590,
                      lineHeight: '17px',
                      textTransform: 'capitalize',
                      flexShrink: 0,
                      marginLeft: '12px',
                    }}
                  >
                    {issue.severity}
                  </span>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '0 16px 16px 44px' }}>
                    {issue.detected && issue.authoritative && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                          <span
                            style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              backgroundColor: '#FFE5E5',
                              color: '#8B0000',
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '11px',
                              fontWeight: 590,
                            }}
                          >
                            Detected
                          </span>
                          <span
                            style={{
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '13px',
                              color: '#03234D',
                            }}
                          >
                            {issue.detected}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span
                            style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              backgroundColor: '#D4F4DD',
                              color: '#0B5D1E',
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '11px',
                              fontWeight: 590,
                            }}
                          >
                            Authoritative
                          </span>
                          <span
                            style={{
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '13px',
                              color: '#03234D',
                            }}
                          >
                            {issue.authoritative}
                          </span>
                        </div>
                      </div>
                    )}

                    {issue.action && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              backgroundColor: '#E8F4FF',
                              color: '#014486',
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '11px',
                              fontWeight: 590,
                              flexShrink: 0,
                            }}
                          >
                            Action
                          </span>
                          <span
                            style={{
                              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                              fontSize: '13px',
                              color: '#03234D',
                              lineHeight: '18px',
                            }}
                          >
                            {issue.action}
                          </span>
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        style={{
                          padding: '6px 16px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: '#0176D3',
                          color: '#FFFFFF',
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '13px',
                          fontWeight: 590,
                          lineHeight: '19px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#014486';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0176D3';
                        }}
                      >
                        Mark Resolved(?)
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: '6px 16px',
                          borderRadius: '4px',
                          border: '1px solid #C9C9C9',
                          backgroundColor: '#FFFFFF',
                          color: '#5C5C5C',
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '13px',
                          fontWeight: 590,
                          lineHeight: '19px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F3F3F3';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        View Document Preview
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
);

AnalysisView.displayName = "AnalysisView";
