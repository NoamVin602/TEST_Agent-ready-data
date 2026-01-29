"use client";

import { useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

type SortOption = "recent" | "oldest" | "type";

interface ArchivedItem {
  id: string;
  title: string;
  type: "Auto-Fixed" | "Manually Resolved";
  resolvedDate: string;
  originalSeverity: "High" | "Medium" | "Low";
  category: string;
  docs: number;
  owner: string;
  resolution?: string;
}

const MOCK_ARCHIVED: ArchivedItem[] = [
  {
    id: "1",
    title: "Outdated product pricing in FAQ",
    type: "Auto-Fixed",
    resolvedDate: "Nov 15 2025, 14:22",
    originalSeverity: "High",
    category: "Outdated",
    docs: 1,
    owner: "System",
    resolution: "Updated pricing to match current Product Catalog (v4.2)",
  },
  {
    id: "2",
    title: "Duplicate onboarding guide",
    type: "Manually Resolved",
    resolvedDate: "Nov 14 2025, 09:15",
    originalSeverity: "Medium",
    category: "Duplicate",
    docs: 2,
    owner: "Sarah Chen",
    resolution: "Merged into canonical Getting Started guide",
  },
  {
    id: "3",
    title: "Broken API endpoint references",
    type: "Auto-Fixed",
    resolvedDate: "Nov 13 2025, 16:45",
    originalSeverity: "High",
    category: "Outdated",
    docs: 3,
    owner: "System",
    resolution: "Updated all references to v3 API endpoints",
  },
  {
    id: "4",
    title: "Contradicting support email address",
    type: "Manually Resolved",
    resolvedDate: "Nov 12 2025, 11:30",
    originalSeverity: "Medium",
    category: "Contradiction",
    docs: 2,
    owner: "Mike Wilson",
    resolution: "Standardized to support@company.com across all docs",
  },
  {
    id: "5",
    title: "Legacy feature documentation",
    type: "Manually Resolved",
    resolvedDate: "Nov 11 2025, 13:20",
    originalSeverity: "Low",
    category: "Outdated",
    docs: 1,
    owner: "Dev Team",
    resolution: "Archived and marked as deprecated",
  },
];

export function ArchivedView() {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sortedItems = [...MOCK_ARCHIVED].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.resolvedDate).getTime() - new Date(a.resolvedDate).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.resolvedDate).getTime() - new Date(b.resolvedDate).getTime();
    } else {
      return a.type.localeCompare(b.type);
    }
  });

  return (
    <div
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
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '20px',
              fontWeight: 590,
              lineHeight: '28px',
              color: '#03234D',
              margin: '0 0 4px 0',
            }}
          >
            Archived Items
          </h2>
          <p
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: '18px',
              color: '#5C5C5C',
              margin: 0,
            }}
          >
            5 resolved items • Last 30 days
          </p>
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label
            htmlFor="sort-select"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#5C5C5C',
            }}
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid #C9C9C9',
              backgroundColor: '#FFFFFF',
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#03234D',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="type">Resolution Type</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs */}
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
        {['All Resolved', 'Auto-Fixed', 'Manually Resolved'].map((filter) => {
          const isActive = filter === 'All Resolved';
          return (
            <button
              key={filter}
              type="button"
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
              {filter} {filter === 'All Resolved' && `5`} {filter === 'Auto-Fixed' && `3`} {filter === 'Manually Resolved' && `2`}
            </button>
          );
        })}
      </div>

      {/* Archived Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sortedItems.map((item) => {
          const isExpanded = expandedItems.includes(item.id);
          const severityColor =
            item.originalSeverity === 'High'
              ? '#C23934'
              : item.originalSeverity === 'Medium'
              ? '#FE9339'
              : '#0176D3';
          const severityBg =
            item.originalSeverity === 'High'
              ? '#FDECEC'
              : item.originalSeverity === 'Medium'
              ? '#FEF4E6'
              : '#E8F4FF';
          const typeColor = item.type === 'Auto-Fixed' ? '#2E844A' : '#0176D3';
          const typeBg = item.type === 'Auto-Fixed' ? '#E8F5EC' : '#E8F4FF';

          return (
            <div
              key={item.id}
              style={{
                border: '1px solid #E5E5E5',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                transition: 'all 0.15s ease-in-out',
              }}
            >
              {/* Item Header */}
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
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
                        color: '#03234D',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.title}
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
                      {item.category} • {item.docs} {item.docs === 1 ? 'doc' : 'docs'} • Resolved by {item.owner} • {item.resolvedDate}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0, marginLeft: '12px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: typeBg,
                      border: `1px solid ${typeColor}`,
                      color: typeColor,
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: '11px',
                      fontWeight: 590,
                      lineHeight: '17px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.type}
                  </span>
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.originalSeverity}
                  </span>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ padding: '0 16px 16px 44px' }}>
                  {item.resolution && (
                    <div style={{ marginBottom: '12px' }}>
                      <p
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: '13px',
                          fontWeight: 400,
                          lineHeight: '18px',
                          color: '#03234D',
                          margin: '0 0 8px 0',
                        }}
                      >
                        <strong style={{ fontWeight: 590 }}>Resolution:</strong> {item.resolution}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 16px',
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
                      <RotateCcw style={{ width: '14px', height: '14px' }} />
                      Restore
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
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State (if no items) */}
      {sortedItems.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 16px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              backgroundColor: '#F3F3F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RotateCcw style={{ width: '32px', height: '32px', color: '#C9C9C9' }} />
          </div>
          <h3
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '18px',
              fontWeight: 590,
              color: '#03234D',
              margin: '0 0 8px 0',
            }}
          >
            No archived items
          </h3>
          <p
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#5C5C5C',
              margin: 0,
            }}
          >
            Your resolution history will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
