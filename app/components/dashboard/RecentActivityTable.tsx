"use client";

import { Search } from "lucide-react";

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
    <div 
      style={{
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        border: '1px solid var(--slds-g-color-border-1)',
        borderRadius: 'var(--slds-g-radius-border-2)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--slds-g-spacing-4)',
          borderBottom: '1px solid var(--slds-g-color-border-2)'
        }}
      >
        <h3 className="slds-text-heading_section">Recent Activity</h3>
        <div style={{ position: 'relative', width: '240px' }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '6px var(--slds-g-spacing-3)',
              paddingLeft: 'var(--slds-g-spacing-8)',
              border: '1px solid var(--slds-g-color-border-1)',
              borderRadius: 'var(--slds-g-radius-border-2)',
              fontSize: 'var(--slds-g-font-scale-1)',
              outline: 'none',
              transition: 'border-color var(--slds-g-transition-base)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
            }}
          />
          <Search 
            style={{
              position: 'absolute',
              left: 'var(--slds-g-spacing-2)',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '14px',
              height: '14px',
              color: 'var(--slds-g-color-text-weak)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table 
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--slds-g-font-scale-1)'
          }}
        >
          <thead>
            <tr 
              style={{
                backgroundColor: 'var(--slds-g-color-neutral-base-95)',
                borderBottom: '1px solid var(--slds-g-color-border-2)'
              }}
            >
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)', width: '40px' }}>#</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)' }}>Action Type</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)' }}>Description</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)' }}>Actor</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)' }}>Timestamp</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'left', fontWeight: 'var(--slds-g-font-weight-6)', color: 'var(--slds-g-color-text-default)', width: '120px' }}>Impact Score</th>
              <th style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'center', width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr 
                key={activity.id}
                style={{
                  borderBottom: '1px solid var(--slds-g-color-border-2)',
                  transition: 'background-color var(--slds-g-transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-weak)' }}>{index + 1}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-default)' }}>{activity.actionType}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-default)' }}>{activity.description}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-default)' }}>{activity.actor}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-weak)', fontSize: 'var(--slds-g-font-scale-neg-1)' }}>{activity.timestamp}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', color: 'var(--slds-g-color-text-default)', fontWeight: 'var(--slds-g-font-weight-6)' }}>{activity.impactScore}</td>
                <td style={{ padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)', textAlign: 'center' }}>
                  <button
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid var(--slds-g-color-border-1)',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--slds-g-color-text-weak)',
                      transition: 'all var(--slds-g-transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                      e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)';
                    }}
                  >
                    →
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
