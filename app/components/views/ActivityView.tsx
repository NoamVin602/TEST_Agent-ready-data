"use client";

import { ActivityIcon, ClockIcon, UserIcon, FileTextIcon, CheckCircleIcon } from "../../lib/slds-icons";

interface ActivityItem {
  id: number;
  type: string;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  iconColor: string;
}

const ACTIVITY_LOG: ActivityItem[] = [
  {
    id: 1,
    type: "scan_complete",
    title: "Knowledge base scan completed",
    description: "Found 10 issues, 7 content gaps",
    actor: "System",
    timestamp: "2 minutes ago",
    icon: ActivityIcon,
    iconColor: "rgba(2, 80, 217, 1)",
  },
  {
    id: 2,
    type: "issue_resolved",
    title: "Issue auto-resolved",
    description: "Duplicate product descriptions merged",
    actor: "System",
    timestamp: "15 minutes ago",
    icon: CheckCircleIcon,
    iconColor: "var(--slds-g-color-success-base-50)",
  },
  {
    id: 3,
    type: "content_created",
    title: "New content created",
    description: "SSO with Okta Setup Guide",
    actor: "Sarah Chen",
    timestamp: "1 hour ago",
    icon: FileTextIcon,
    iconColor: "rgba(2, 80, 217, 1)",
  },
  {
    id: 4,
    type: "issue_resolved",
    title: "Issue manually resolved",
    description: "Conflicting refund policy information",
    actor: "Sarah Chen",
    timestamp: "2 hours ago",
    icon: CheckCircleIcon,
    iconColor: "var(--slds-g-color-success-base-50)",
  },
  {
    id: 5,
    type: "scan_scheduled",
    title: "Scheduled scan started",
    description: "Daily knowledge base audit",
    actor: "System",
    timestamp: "6 hours ago",
    icon: ClockIcon,
    iconColor: "var(--slds-g-color-warning-base-50)",
  },
];

export function ActivityView() {
  return (
    <div 
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'var(--slds-g-spacing-4)',
        width: '100%'
      }}
    >
      {/* Header */}
      <div 
        className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center"
        style={{ marginBottom: 'var(--slds-g-spacing-4)' }}
      >
        <h2 
          style={{
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-3)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            lineHeight: '28px',
            color: 'var(--slds-g-color-on-surface-3)',
            margin: 0
          }}
        >
          Activity Log
        </h2>
        <span className="slds-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <ClockIcon size={12} color="currentColor" />
          <span>Last 24 hours</span>
        </span>
      </div>

      {/* Activity List */}
      <div className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF', margin: '1px 1px 1px 16px', boxSizing: 'border-box' }}>
        <div className="slds-card__body" style={{ padding: '12px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ACTIVITY_LOG.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="slds-card"
                  style={{
                    margin: '1px 1px 1px 16px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--slds-g-spacing-4)',
                    padding: 'var(--slds-g-spacing-4)',
                    borderBottom: index < ACTIVITY_LOG.length - 1 ? '1px solid var(--slds-g-color-border-2)' : 'none',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 0,
                    transition: 'background-color var(--slds-g-transition-fast)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: 'var(--slds-g-spacing-10, 48px)',
                      height: 'var(--slds-g-spacing-10, 48px)',
                      borderRadius: 'var(--slds-g-radius-border-circle)',
                      backgroundColor: 'var(--slds-g-color-neutral-base-95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} color={activity.iconColor} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '19px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        marginBottom: 'var(--slds-g-spacing-1)',
                        marginTop: 0
                      }}
                    >
                      {activity.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-1)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '17px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        marginBottom: 'var(--slds-g-spacing-1)',
                        marginTop: 0
                      }}
                    >
                      {activity.description}
                    </p>
                    <div
                      className="slds-grid slds-grid_vertical-align-center"
                      style={{
                        gap: 'var(--slds-g-spacing-1)',
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-2)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '14px',
                        color: 'var(--slds-g-color-on-surface-2)'
                      }}
                    >
                      <UserIcon size={12} color="var(--slds-g-color-on-surface-2)" />
                      <span>{activity.actor}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
