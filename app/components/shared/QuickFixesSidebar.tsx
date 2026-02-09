"use client";

import React, { useState } from "react";
import { TakeActionModal } from "./TakeActionModal";

interface TopIssue {
  id: string;
  type: string;
  scoreImpact: string;
  severity: "Low" | "Medium" | "High";
  description: string;
}

const TOP_ISSUES: TopIssue[] = [
  {
    id: "contradiction",
    type: "Contradiction",
    scoreImpact: "+1.5% Health Score",
    severity: "Medium",
    description: "Conflicting power output information",
  },
  {
    id: "outdated",
    type: "Outdated",
    scoreImpact: "+3% Health Score",
    severity: "Low",
    description: "Deprecated product information",
  },
];

export function QuickFixesSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<TopIssue | null>(null);

  const handleTakeAction = (issue: TopIssue) => {
    setSelectedIssue(issue);
    setIsModalOpen(true);
  };

  const handleDismiss = (id: string) => {
    console.log(`Dismiss ${id}`);
  };

  const handleReviewAll = () => {
    console.log("Review all issues");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const handleSave = () => {
    console.log("Save action for", selectedIssue?.id);
    // Handle save logic here
  };

  const handleSendToExpert = () => {
    console.log("Send to expert for", selectedIssue?.id);
    // Handle send to expert logic here
  };

  // Mock document data based on issue type
  const getDocumentsForIssue = (issue: TopIssue) => {
    if (issue.type === "Contradiction") {
      return [
        {
          id: "doc1",
          title: "Solar Consumer User...",
          type: "Web Manual",
          trustScore: 95,
          highlightedText: "...The 'Compact Solar Panel' output is 150W...",
          action: "keep" as const,
        },
        {
          id: "doc2",
          title: "CSP-150W Technical...",
          type: "PDF",
          trustScore: 10,
          highlightedText: "...The 'Compact Solar Panel' output is 200W...",
          action: "archive" as const,
        },
      ];
    } else {
      // For "Outdated" issues
      return [
        {
          id: "doc1",
          title: "Product Manual v2.1",
          type: "PDF",
          trustScore: 85,
          highlightedText: "...Latest product specifications...",
          action: "keep" as const,
        },
        {
          id: "doc2",
          title: "Product Manual v1.5",
          type: "PDF",
          trustScore: 15,
          highlightedText: "...Deprecated product information...",
          action: "archive" as const,
        },
      ];
    }
  };

  return (
    <article 
      className="slds-card" 
      style={{ 
        margin: '0 1px 1px 16px', 
        boxSizing: 'border-box',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card Header */}
      <div 
        className="slds-card__header"
        style={{
          padding: 'var(--slds-g-spacing-4, 16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))',
        }}
      >
        <h2 
          style={{
            fontSize: 'var(--slds-g-font-scale-3, 20px)',
            fontWeight: 'var(--slds-g-font-weight-4, 400)',
            lineHeight: '28px',
            color: 'var(--slds-g-color-on-surface-3, #03234d)',
            margin: 0,
          }}
        >
          Top Issues
        </h2>
        <button
          type="button"
          className="slds-button slds-button_neutral"
          onClick={handleReviewAll}
          style={{
            fontSize: 'var(--slds-g-font-scale-1, 14px)',
            fontWeight: 'var(--slds-g-font-weight-6, 590)',
            lineHeight: '19px',
            padding: '0 var(--slds-g-spacing-4, 16px)',
            height: '32px',
          }}
        >
          Review All
        </button>
      </div>

      {/* Card Body */}
      <div 
        className="slds-card__body slds-card__body_inner"
        style={{
          padding: 'var(--slds-g-spacing-3, 12px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        {TOP_ISSUES.map((issue) => (
          <div
            key={issue.id}
            style={{
              backgroundColor: 'var(--slds-g-color-neutral-base-100, #ffffff)',
              border: '1px solid var(--slds-g-color-surface-container-3, #e5e5e5)',
              borderRadius: 'var(--slds-g-radius-border-4, 20px)',
              padding: 'var(--slds-g-spacing-6, 24px) var(--slds-g-spacing-4, 16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--slds-g-spacing-3, 12px)',
            }}
          >
            {/* Title Row */}
            <div 
              style={{
                display: 'flex',
                gap: 'var(--slds-g-spacing-2, 8px)',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              {/* Issue Type and Score Badge */}
              <div 
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  flex: '1 0 0',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-1, 14px)',
                    fontWeight: 'var(--slds-g-font-weight-6, 590)',
                    lineHeight: '19px',
                    color: 'var(--slds-g-color-on-surface-1, #5c5c5c)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {issue.type}
                </span>
                <span
                  className="slds-badge slds-theme_success"
                  style={{
                    fontSize: 'var(--slds-g-font-scale-1, 14px)',
                    fontWeight: 'var(--slds-g-font-weight-6, 590)',
                    lineHeight: '19px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {issue.scoreImpact}
                </span>
              </div>
              
              {/* Severity Badge */}
              <span
                className={issue.severity === 'Medium' ? 'slds-badge slds-theme_warning' : 'slds-badge slds-badge_inverse'}
                style={{
                  fontSize: 'var(--slds-g-font-scale-1, 14px)',
                  fontWeight: 'var(--slds-g-font-weight-6, 590)',
                  lineHeight: '19px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {issue.severity}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--slds-g-font-scale-1, 14px)',
                fontWeight: 'var(--slds-g-font-weight-4, 400)',
                lineHeight: '19px',
                color: '#444444',
                margin: 0,
                paddingTop: '4px',
              }}
            >
              {issue.description}
            </p>

            {/* Action Buttons */}
            <div 
              style={{
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  gap: 'var(--slds-g-spacing-2, 8px)',
                  alignItems: 'center',
                }}
              >
                <button
                  type="button"
                  className="slds-button slds-button_brand"
                  onClick={() => handleTakeAction(issue)}
                  style={{
                    fontSize: 'var(--slds-g-font-scale-1, 14px)',
                    fontWeight: 'var(--slds-g-font-weight-6, 590)',
                    lineHeight: '19px',
                    padding: '0 var(--slds-g-spacing-4, 16px)',
                    height: '32px',
                  }}
                >
                  Take action
                </button>
                <button
                  type="button"
                  className="slds-button slds-button_neutral"
                  onClick={() => handleDismiss(issue.id)}
                  style={{
                    fontSize: 'var(--slds-g-font-scale-1, 14px)',
                    fontWeight: 'var(--slds-g-font-weight-6, 590)',
                    lineHeight: '19px',
                    padding: '0 var(--slds-g-spacing-4, 16px)',
                    height: '32px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--slds-g-color-on-surface-3, #03234d)',
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Take Action Modal */}
      {selectedIssue && (
        <TakeActionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          issueType={selectedIssue.type}
          issueDescription={selectedIssue.description}
          documents={getDocumentsForIssue(selectedIssue)}
          expertReviewer={{
            name: "Laura D.",
            role: "Product Knowledge Manager",
          }}
          onSave={handleSave}
          onSendToExpert={handleSendToExpert}
        />
      )}
    </article>
  );
}
