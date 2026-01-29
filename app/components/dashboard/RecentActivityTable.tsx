"use client";

import { SearchIcon, ChevronRightIcon } from "../../lib/slds-icons";

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

export function RecentActivityTable({ activities }: RecentActivityTableProps) {
  return (
    <div className="slds-card">
      <div className="slds-card__header slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
        <h3 className="slds-text-heading_section">Recent Activity</h3>
        <div className="slds-form-element" style={{ position: 'relative', width: '240px' }}>
          <div className="slds-form-element__control slds-input-has-icon_left">
            <SearchIcon 
              className="slds-input__icon slds-input__icon_left"
              size={14}
              color="var(--slds-g-color-text-weak)"
              style={{
                position: 'absolute',
                left: 'var(--slds-g-spacing-2)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              className="slds-input"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="slds-card__body" style={{ overflowX: 'auto' }}>
        <table className="slds-table slds-table_cell-buffer slds-table_bordered">
          <thead>
            <tr className="slds-line-height_reset">
              <th scope="col" style={{ width: '40px' }}>
                <div className="slds-truncate" title="#">#</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Action Type">Action Type</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Description">Description</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Actor">Actor</div>
              </th>
              <th scope="col">
                <div className="slds-truncate" title="Timestamp">Timestamp</div>
              </th>
              <th scope="col" style={{ width: '120px' }}>
                <div className="slds-truncate" title="Impact Score">Impact Score</div>
              </th>
              <th scope="col" style={{ width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id} className="slds-hint-parent">
                <td>
                  <div className="slds-truncate slds-text-body_small" title={String(index + 1)}>{index + 1}</div>
                </td>
                <td>
                  <div className="slds-truncate" title={activity.actionType}>{activity.actionType}</div>
                </td>
                <td>
                  <div className="slds-truncate" title={activity.description}>{activity.description}</div>
                </td>
                <td>
                  <div className="slds-truncate" title={activity.actor}>{activity.actor}</div>
                </td>
                <td>
                  <div className="slds-truncate slds-text-body_small" title={activity.timestamp}>{activity.timestamp}</div>
                </td>
                <td>
                  <div className="slds-truncate slds-text-body_semibold" title={activity.impactScore}>{activity.impactScore}</div>
                </td>
                <td>
                  <button className="slds-button slds-button_icon slds-button_icon-small" title="View Details">
                    <ChevronRightIcon size={12} />
                    <span className="slds-assistive-text">View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
