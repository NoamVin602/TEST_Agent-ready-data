"use client";

import { PlayIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from "../../lib/slds-icons";

interface RunLogItem {
  id: number;
  runId: string;
  status: "completed" | "failed" | "running";
  startTime: string;
  duration: string;
  issuesFound: number;
  autoFixed: number;
  contentGaps: number;
  progress: number;
  error?: string;
}

const RUN_LOG: RunLogItem[] = [
  {
    id: 1,
    runId: "RUN-2026-0128-001",
    status: "completed",
    startTime: "Jan 28, 2026 09:00 AM",
    duration: "3m 42s",
    issuesFound: 10,
    autoFixed: 6,
    contentGaps: 7,
    progress: 100,
  },
  {
    id: 2,
    runId: "RUN-2026-0127-002",
    status: "completed",
    startTime: "Jan 27, 2026 09:00 AM",
    duration: "4m 15s",
    issuesFound: 14,
    autoFixed: 8,
    contentGaps: 5,
    progress: 100,
  },
  {
    id: 3,
    runId: "RUN-2026-0126-001",
    status: "failed",
    startTime: "Jan 26, 2026 09:00 AM",
    duration: "1m 23s",
    issuesFound: 0,
    autoFixed: 0,
    contentGaps: 0,
    error: "Connection timeout to knowledge base",
    progress: 35,
  },
  {
    id: 4,
    runId: "RUN-2026-0125-001",
    status: "completed",
    startTime: "Jan 25, 2026 09:00 AM",
    duration: "3m 58s",
    issuesFound: 18,
    autoFixed: 12,
    contentGaps: 4,
    progress: 100,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircleIcon size={16} color="var(--slds-g-color-success-base-50)" />;
    case "failed":
      return <XCircleIcon size={16} color="var(--slds-g-color-error-base-50)" />;
    case "running":
      return <AlertTriangleIcon size={16} color="var(--slds-g-color-warning-base-50)" />;
    default:
      return <ClockIcon size={16} color="var(--slds-g-color-on-surface-2)" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <span
          className="slds-badge"
          style={{
            backgroundColor: 'var(--slds-g-color-success-tint)',
            color: 'var(--slds-g-color-success-base-50)',
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            lineHeight: '17px',
            padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
            borderRadius: 'var(--slds-g-radius-border-2)'
          }}
        >
          Completed
        </span>
      );
    case "failed":
      return (
        <span
          className="slds-badge"
          style={{
            backgroundColor: 'var(--slds-g-color-error-tint)',
            color: 'var(--slds-g-color-error-base-50)',
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            lineHeight: '17px',
            padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
            borderRadius: 'var(--slds-g-radius-border-2)'
          }}
        >
          Failed
        </span>
      );
    case "running":
      return (
        <span
          className="slds-badge"
          style={{
            backgroundColor: 'var(--slds-g-color-warning-tint)',
            color: 'var(--slds-g-color-warning-base-50)',
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            fontWeight: 'var(--slds-g-font-weight-6)',
            lineHeight: '17px',
            padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
            borderRadius: 'var(--slds-g-radius-border-2)'
          }}
        >
          Running
        </span>
      );
    default:
      return (
        <span
          className="slds-badge"
          style={{
            border: '1px solid var(--slds-g-color-border-2)',
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            color: 'var(--slds-g-color-on-surface-1)',
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            fontWeight: 'var(--slds-g-font-weight-4)',
            lineHeight: '17px',
            padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
            borderRadius: 'var(--slds-g-radius-border-2)'
          }}
        >
          Unknown
        </span>
      );
  }
};

export function RunLogView() {
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
          Scan Run History
        </h2>
        <div
          className="slds-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-1)',
            padding: 'var(--slds-g-spacing-1) var(--slds-g-spacing-2)',
            border: '1px solid var(--slds-g-color-border-2)',
            borderRadius: 'var(--slds-g-radius-border-2)',
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            fontFamily: 'var(--slds-g-font-family)',
            fontSize: 'var(--slds-g-font-scale-neg-1)',
            fontWeight: 'var(--slds-g-font-weight-4)',
            lineHeight: '17px',
            color: 'var(--slds-g-color-on-surface-1)'
          }}
        >
          <PlayIcon size={12} color="var(--slds-g-color-on-surface-1)" />
          <span>Last 7 days</span>
        </div>
      </div>

      {/* Run Log List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-3)' }}>
        {RUN_LOG.map((run) => (
          <div key={run.id} className="slds-card" style={{ borderRadius: 'var(--slds-g-radius-border-4)', backgroundColor: '#FFFFFF' }}>
            <div className="slds-card__body" style={{ padding: 'var(--slds-g-spacing-4)' }}>
              {/* Header Row */}
              <div
                className="slds-grid slds-grid_align-spread slds-grid_vertical-align-start"
                style={{ marginBottom: 'var(--slds-g-spacing-3)' }}
              >
                <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: 'var(--slds-g-spacing-3)' }}>
                  {getStatusIcon(run.status)}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-1)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '17px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        marginBottom: '2px',
                        marginTop: 0,
                        fontFeatureSettings: '"tnum"'
                      }}
                    >
                      {run.runId}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-2)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '14px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        margin: 0
                      }}
                    >
                      {run.startTime} • Duration: {run.duration}
                    </p>
                  </div>
                </div>
                {getStatusBadge(run.status)}
              </div>

              {/* Completed Stats */}
              {run.status === "completed" && (
                <div
                  className="slds-grid"
                  style={{
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'var(--slds-g-spacing-4)',
                    paddingTop: 'var(--slds-g-spacing-3)',
                    borderTop: '1px solid var(--slds-g-color-border-2)'
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-4)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '32px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        marginBottom: '2px',
                        marginTop: 0
                      }}
                    >
                      {run.issuesFound}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-2)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '14px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        margin: 0
                      }}
                    >
                      Issues Found
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-4)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '32px',
                        color: 'var(--slds-g-color-success-base-50)',
                        marginBottom: '2px',
                        marginTop: 0
                      }}
                    >
                      {run.autoFixed}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-2)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '14px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        margin: 0
                      }}
                    >
                      Auto-Fixed
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-4)',
                        fontWeight: 'var(--slds-g-font-weight-6)',
                        lineHeight: '32px',
                        color: 'var(--slds-g-color-warning-base-50)',
                        marginBottom: '2px',
                        marginTop: 0
                      }}
                    >
                      {run.contentGaps}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--slds-g-font-family)',
                        fontSize: 'var(--slds-g-font-scale-neg-2)',
                        fontWeight: 'var(--slds-g-font-weight-4)',
                        lineHeight: '14px',
                        color: 'var(--slds-g-color-on-surface-1)',
                        margin: 0
                      }}
                    >
                      Content Gaps
                    </p>
                  </div>
                </div>
              )}

              {/* Failed Error */}
              {run.status === "failed" && run.error && (
                <div
                  style={{
                    paddingTop: 'var(--slds-g-spacing-3)',
                    borderTop: '1px solid var(--slds-g-color-border-2)'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-1)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '17px',
                      color: 'var(--slds-g-color-error-base-50)',
                      marginBottom: 'var(--slds-g-spacing-2)',
                      marginTop: 0
                    }}
                  >
                    Error: {run.error}
                  </p>
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'var(--slds-g-color-surface-container-3)',
                      borderRadius: 'var(--slds-g-radius-border-3)',
                      overflow: 'hidden',
                      marginBottom: '4px'
                    }}
                  >
                    <div
                      style={{
                        width: `${run.progress}%`,
                        height: '100%',
                        backgroundColor: 'var(--slds-g-color-error-base-50)',
                        transition: 'width var(--slds-g-transition-base)'
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--slds-g-font-family)',
                      fontSize: 'var(--slds-g-font-scale-neg-2)',
                      fontWeight: 'var(--slds-g-font-weight-4)',
                      lineHeight: '14px',
                      color: 'var(--slds-g-color-on-surface-2)',
                      margin: 0
                    }}
                  >
                    Failed at {run.progress}%
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
