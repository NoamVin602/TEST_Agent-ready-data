"use client";

import { useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import { SeverityBadge, Severity } from "./SeverityBadge";
import { ComparisonPill } from "./ComparisonPill";

interface IssueCardProps {
  id: number;
  title: string;
  type: string;
  docCount: number;
  owner: string;
  severity: Severity;
  detectedText?: string;
  authoritativeText?: string;
  actionText?: string;
  onViewDocument?: () => void;
  onMarkResolved?: () => void;
}

export function IssueCard({
  id,
  title,
  type,
  docCount,
  owner,
  severity,
  detectedText,
  authoritativeText,
  actionText,
  onViewDocument,
  onMarkResolved
}: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--slds-g-color-neutral-base-100)',
        border: `1px solid ${
          isExpanded || isHovered 
            ? severity === 'high' ? 'var(--slds-g-color-error-base-50)' : 'var(--slds-g-color-brand-base-50)'
            : 'var(--slds-g-color-border-1)'
        }`,
        borderRadius: 'var(--slds-g-radius-border-2)',
        padding: 'var(--slds-g-spacing-4)',
        transition: 'all var(--slds-g-transition-base)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--slds-g-spacing-3)',
          marginBottom: isExpanded ? 'var(--slds-g-spacing-4)' : 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--slds-g-spacing-2)', flex: 1 }}>
          <ChevronRight 
            style={{
              width: '16px',
              height: '16px',
              color: 'var(--slds-g-color-brand-base-50)',
              flexShrink: 0,
              marginTop: '4px',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform var(--slds-g-transition-base)'
            }}
          />
          <div style={{ flex: 1 }}>
            <h3 
              style={{
                fontSize: 'var(--slds-g-font-scale-2)',
                fontWeight: 'var(--slds-g-font-weight-semibold)',
                color: 'var(--slds-g-color-brand-base-50)',
                marginBottom: 'var(--slds-g-spacing-1)',
                lineHeight: 1.4
              }}
            >
              {title}
            </h3>
            <div 
              style={{
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                color: 'var(--slds-g-color-text-weak)',
                display: 'flex',
                gap: 'var(--slds-g-spacing-2)',
                flexWrap: 'wrap'
              }}
            >
              <span>{type} • {docCount} doc{docCount !== 1 ? 's' : ''} • Owner: {owner}</span>
            </div>
          </div>
        </div>
        <SeverityBadge severity={severity} />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div 
          style={{
            borderTop: '1px solid var(--slds-g-color-border-2)',
            paddingTop: 'var(--slds-g-spacing-4)',
            animation: 'slideUp 0.2s ease'
          }}
        >
          {/* Comparison Pills */}
          {(detectedText || authoritativeText) && (
            <div 
              style={{
                display: 'flex',
                gap: 'var(--slds-g-spacing-2)',
                marginBottom: 'var(--slds-g-spacing-4)',
                flexWrap: 'wrap'
              }}
            >
              {detectedText && (
                <ComparisonPill type="detected" label="Detected" content={detectedText} />
              )}
              {authoritativeText && (
                <ComparisonPill type="authoritative" label="Authoritative" content={authoritativeText} />
              )}
            </div>
          )}

          {/* Action Text */}
          {actionText && (
            <div 
              style={{
                padding: 'var(--slds-g-spacing-3)',
                backgroundColor: 'var(--slds-g-color-badge-action)',
                borderRadius: 'var(--slds-g-radius-border-1)',
                marginBottom: 'var(--slds-g-spacing-4)'
              }}
            >
              <div 
                style={{
                  fontSize: 'var(--slds-g-font-scale-neg-1)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  color: 'var(--slds-g-color-badge-action-text)',
                  marginBottom: 'var(--slds-g-spacing-1)'
                }}
              >
                Action
              </div>
              <div 
                style={{
                  fontSize: 'var(--slds-g-font-scale-1)',
                  color: 'var(--slds-g-color-text-default)'
                }}
              >
                {actionText}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--slds-g-spacing-2)', justifyContent: 'flex-end' }}>
            {onViewDocument && (
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDocument();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--slds-g-spacing-1)',
                }}
              >
                <Eye style={{ width: '14px', height: '14px' }} />
                View Document Preview
              </button>
            )}
            {onMarkResolved && (
              <button
                type="button"
                className="slds-button slds-button_brand"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkResolved();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Mark Resolved
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
