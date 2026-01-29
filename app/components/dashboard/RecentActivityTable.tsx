"use client";

import { SearchIcon, ChevronRightIcon, ChevronDownIcon, MoreIcon } from "../../lib/slds-icons";

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
    <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-3)' }}>
      {/* Nested Card Header */}
      <div 
        className="slds-card__header"
        style={{
          padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--slds-g-spacing-2)'
        }}
      >
        <h3 
          style={{
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-3)',
            fontWeight: 'var(--slds-g-font-weight-4)',
            lineHeight: '28px',
            color: 'var(--slds-g-color-on-surface-3)',
            margin: 0,
            flex: 1
          }}
        >
          Recent Activity
        </h3>
        <div className="slds-form-element" style={{ position: 'relative', width: '275px', flexShrink: 0 }}>
          <div className="slds-form-element__control slds-input-has-icon_left">
            <SearchIcon 
              className="slds-input__icon slds-input__icon_left"
              size={16}
              color="var(--slds-g-color-on-surface-1)"
              style={{
                position: 'absolute',
                left: 'var(--slds-g-spacing-2)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                padding: '2px'
              }}
            />
            <input
              type="text"
              className="slds-input"
              placeholder="Search..."
              style={{
                height: '32px',
                paddingLeft: '32px',
                paddingRight: 'var(--slds-g-spacing-2)',
                border: '1px solid var(--slds-g-color-border-2)',
                borderRadius: 'var(--slds-g-radius-border-2)',
                fontSize: 'var(--slds-g-font-size-base)',
                fontFamily: 'var(--slds-g-font-family)',
                fontWeight: 'var(--slds-g-font-weight-4)',
                lineHeight: '18px',
                color: 'var(--slds-g-color-on-surface-1)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Nested Card Body */}
      <div 
        className="slds-card__body"
        style={{
          padding: 'var(--slds-g-spacing-0) var(--slds-g-spacing-3) var(--slds-g-spacing-3)',
          overflowX: 'auto'
        }}
      >
        <table className="slds-table slds-table_cell-buffer slds-table_bordered" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr className="slds-line-height_reset" style={{ backgroundColor: '#F3F3F3' }}>
              <th scope="col" style={{ width: '60px', backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-truncate slds-text-body_semibold" title="#" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>#</div>
              </th>
              <th scope="col" style={{ backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ padding: '0' }}>
                  <div className="slds-truncate slds-text-body_semibold" title="Action Type" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>Action Type</div>
                  <button className="slds-button slds-button_icon slds-button_icon-small" style={{ width: '14px', height: '14px', marginLeft: 'var(--slds-g-spacing-1)' }} aria-label="Sort">
                    <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-3)" />
                  </button>
                </div>
              </th>
              <th scope="col" style={{ backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ padding: '0' }}>
                  <div className="slds-truncate slds-text-body_semibold" title="Description" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>Description</div>
                  <button className="slds-button slds-button_icon slds-button_icon-small" style={{ width: '14px', height: '14px', marginLeft: 'var(--slds-g-spacing-1)' }} aria-label="Sort">
                    <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-3)" />
                  </button>
                </div>
              </th>
              <th scope="col" style={{ backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ padding: '0' }}>
                  <div className="slds-truncate slds-text-body_semibold" title="Actor" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>Actor</div>
                  <button className="slds-button slds-button_icon slds-button_icon-small" style={{ width: '14px', height: '14px', marginLeft: 'var(--slds-g-spacing-1)' }} aria-label="Sort">
                    <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-3)" />
                  </button>
                </div>
              </th>
              <th scope="col" style={{ backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ padding: '0' }}>
                  <div className="slds-truncate slds-text-body_semibold" title="Timestamp" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>Timestamp</div>
                  <button className="slds-button slds-button_icon slds-button_icon-small" style={{ width: '14px', height: '14px', marginLeft: 'var(--slds-g-spacing-1)' }} aria-label="Sort">
                    <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-3)" />
                  </button>
                </div>
              </th>
              <th scope="col" style={{ width: '120px', backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}>
                <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center" style={{ padding: '0' }}>
                  <div className="slds-truncate slds-text-body_semibold" title="Impact Score" style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-on-surface-1)' }}>Impact Score</div>
                  <button className="slds-button slds-button_icon slds-button_icon-small" style={{ width: '14px', height: '14px', marginLeft: 'var(--slds-g-spacing-1)' }} aria-label="Sort">
                    <ChevronDownIcon size={12} color="var(--slds-g-color-on-surface-3)" />
                  </button>
                </div>
              </th>
              <th scope="col" style={{ width: '120px', backgroundColor: '#F3F3F3', padding: 'var(--slds-g-spacing-2)', borderBottom: '1px solid #E5E5E5' }}></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={activity.id} className="slds-hint-parent" style={{ height: 'auto', minHeight: '36px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E5' }}>
                <td style={{ width: '60px', padding: 'var(--slds-g-spacing-2)', textAlign: 'center' }}>
                  <div className="slds-truncate slds-text-body" title={String(index + 1)} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{index + 1}</div>
                </td>
                <td style={{ padding: 'var(--slds-g-spacing-2)' }}>
                  <div className="slds-truncate slds-text-body" title={activity.actionType} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{activity.actionType}</div>
                </td>
                <td style={{ padding: 'var(--slds-g-spacing-2)' }}>
                  <div className="slds-truncate slds-text-body" title={activity.description} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{activity.description}</div>
                </td>
                <td style={{ padding: 'var(--slds-g-spacing-2)' }}>
                  <div className="slds-truncate slds-text-body" title={activity.actor} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{activity.actor}</div>
                </td>
                <td style={{ padding: 'var(--slds-g-spacing-2)' }}>
                  <div className="slds-truncate slds-text-body" title={activity.timestamp} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{activity.timestamp}</div>
                </td>
                <td style={{ padding: 'var(--slds-g-spacing-2)', width: '120px' }}>
                  <div className="slds-truncate slds-text-body" title={activity.impactScore} style={{ fontFamily: 'var(--slds-g-font-family)', fontSize: 'var(--slds-g-font-scale-base)', lineHeight: '18px', fontWeight: 'var(--slds-g-font-weight-4)', color: 'var(--slds-g-color-on-surface-1)' }}>{activity.impactScore}</div>
                </td>
                <td style={{ width: '120px', padding: 'var(--slds-g-spacing-2)', textAlign: 'right' }}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle view details click
                    }}
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-base)',
                      lineHeight: '18px',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      color: 'rgba(2, 80, 217, 1)',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
