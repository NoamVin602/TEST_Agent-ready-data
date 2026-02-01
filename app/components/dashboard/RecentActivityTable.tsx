"use client";

import { SearchIcon, ChevronDownIcon, MoreIcon } from "../../lib/slds-icons";

interface ActivityItem {
  id: number;
  actionType: string;
  description: string;
  actor: string;
  timestamp: string;
  impactScore: string;
}

interface RecentActivityTableProps {
  activities: ActivityItem[];
}

// Format timestamp: "Nov 12 2025, 14:35" -> "Nov 12, 2025, 14:35"
function formatTimestamp(timestamp: string): string {
  // If already formatted, return as is
  if (timestamp.includes(',')) {
    return timestamp;
  }
  // Otherwise, add comma after day if missing
  return timestamp.replace(/(\d{1,2})\s+(\d{4})/, '$1, $2');
}

// Parse impact score to determine badge theme
function getImpactScoreBadgeTheme(score: string): string {
  const numScore = parseInt(score.replace(/[^0-9-]/g, ''));
  if (numScore > 0) {
    return "slds-badge slds-theme_success";
  }
  return "slds-badge";
}

export function RecentActivityTable({ activities }: RecentActivityTableProps) {
  return (
    <article className="slds-card">
      {/* Card Header */}
      <div className="slds-card__header slds-grid">
        <h2 className="slds-card__header-title" style={{ flex: 1, margin: 0 }}>
          Recent Activity
        </h2>
        <div className="slds-no-flex">
          <div className="slds-form-element" style={{ width: '275px' }}>
            <div className="slds-form-element__control slds-input-has-icon_left">
              <SearchIcon 
                className="slds-input__icon slds-input__icon_left"
                size={16}
                color="#747474"
              />
              <input
                type="text"
                className="slds-input"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="slds-card__body slds-card__body_inner">
        <div className="slds-table_header-fixed_container">
          <table 
            className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_fixed-layout" 
            role="grid"
          >
            <thead>
              <tr className="slds-line-height_reset">
                <th scope="col" style={{ width: '60px' }}>
                  <div className="slds-truncate slds-text-title_caps" title="#">#</div>
                </th>
                <th scope="col">
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <div className="slds-truncate slds-text-title_caps" title="Action Type">Action Type</div>
                    <button 
                      className="slds-button slds-button_icon slds-button_icon-small" 
                      aria-label="Sort"
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <ChevronDownIcon size={12} color="#747474" />
                    </button>
                  </div>
                </th>
                <th scope="col" style={{ width: '25%' }}>
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <div className="slds-truncate slds-text-title_caps" title="Description">Description</div>
                    <button 
                      className="slds-button slds-button_icon slds-button_icon-small" 
                      aria-label="Sort"
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <ChevronDownIcon size={12} color="#747474" />
                    </button>
                  </div>
                </th>
                <th scope="col">
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <div className="slds-truncate slds-text-title_caps" title="Actor">Actor</div>
                    <button 
                      className="slds-button slds-button_icon slds-button_icon-small" 
                      aria-label="Sort"
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <ChevronDownIcon size={12} color="#747474" />
                    </button>
                  </div>
                </th>
                <th scope="col">
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <div className="slds-truncate slds-text-title_caps" title="Timestamp">Timestamp</div>
                    <button 
                      className="slds-button slds-button_icon slds-button_icon-small" 
                      aria-label="Sort"
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <ChevronDownIcon size={12} color="#747474" />
                    </button>
                  </div>
                </th>
                <th scope="col" style={{ width: '120px' }}>
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                    <div className="slds-truncate slds-text-title_caps" title="Impact Score">Impact Score</div>
                    <button 
                      className="slds-button slds-button_icon slds-button_icon-small" 
                      aria-label="Sort"
                      style={{ marginLeft: '0.25rem' }}
                    >
                      <ChevronDownIcon size={12} color="#747474" />
                    </button>
                  </div>
                </th>
                <th scope="col" style={{ width: '80px' }}></th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className="slds-hint-parent">
                  <td style={{ textAlign: 'center' }}>
                    <div className="slds-truncate" title={String(index + 1)} style={{ 
                      fontSize: '0.8125rem', 
                      color: '#181818',
                      fontFamily: 'var(--slds-g-font-family)'
                    }}>
                      {index + 1}
                    </div>
                  </td>
                  <td>
                    <div className="slds-truncate" title={activity.actionType} style={{ 
                      fontSize: '0.8125rem', 
                      color: '#181818',
                      fontFamily: 'var(--slds-g-font-family)'
                    }}>
                      {activity.actionType}
                    </div>
                  </td>
                  <td>
                    <div className="slds-truncate" title={activity.description} style={{ 
                      fontSize: '0.8125rem', 
                      color: '#181818',
                      fontFamily: 'var(--slds-g-font-family)'
                    }}>
                      {activity.description}
                    </div>
                  </td>
                  <td>
                    <div className="slds-truncate" title={activity.actor} style={{ 
                      fontSize: '0.8125rem', 
                      color: '#181818',
                      fontFamily: 'var(--slds-g-font-family)'
                    }}>
                      {activity.actor}
                    </div>
                  </td>
                  <td>
                    <div className="slds-truncate" title={formatTimestamp(activity.timestamp)} style={{ 
                      fontSize: '0.8125rem', 
                      color: '#181818',
                      fontFamily: 'var(--slds-g-font-family)'
                    }}>
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={getImpactScoreBadgeTheme(activity.impactScore)}>
                      {activity.impactScore}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="slds-button_icon-border-filled"
                      aria-label="More actions"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle actions click
                      }}
                    >
                      <MoreIcon size={14} color="#747474" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
