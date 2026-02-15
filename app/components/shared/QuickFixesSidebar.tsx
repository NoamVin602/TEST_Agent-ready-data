"use client";

import React from "react";
import { CheckIcon, ArchiveIcon } from "../../lib/slds-icons";

export function QuickFixesSidebar() {
  return (
    <article className="slds-card" style={{ margin: '0 1px 1px 16px', boxSizing: 'border-box' }}>
      {/* Card Header */}
      <div className="slds-card__header" style={{ borderBottom: '1px solid var(--slds-g-color-border-1, rgba(201, 201, 201, 1))' }}>
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2 className="slds-card__header-title">
              <span style={{
                fontSize: 'var(--slds-g-font-scale-3, 20px)',
                fontWeight: 'var(--slds-g-font-weight-4, 400)',
                lineHeight: '28px',
                color: 'var(--slds-g-color-on-surface-3, #03234d)',
              }}>
                Quick Fixes
              </span>
            </h2>
          </div>
        </header>
      </div>

      {/* Card Body */}
      <div className="slds-card__body slds-card__body_inner" style={{ padding: '12px' }}>
        {/* Alert Banner */}
        <div
          style={{
            backgroundColor: '#FEF4E6',
            border: '1px solid #E6B800',
            borderRadius: '4px',
            padding: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M8 1L15 14H1L8 1Z" stroke="#E6B800" strokeWidth="1.5" fill="none" />
            <path d="M8 6V9" stroke="#E6B800" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.5" fill="#E6B800" />
          </svg>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '400',
              lineHeight: '18px',
              color: '#5C4033',
            }}
          >
            3 issues affecting your AI readiness score
          </span>
        </div>

        {/* Quick Fix Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Contradicting Refund Policies Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #C9C9C9',
              borderLeft: '4px solid #C23934',
              borderRadius: '4px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Icon and Badge Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#C23934',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckIcon size={16} color="#FFFFFF" />
              </div>
              <span
                className="slds-badge"
                style={{
                  backgroundColor: '#FEF4E6',
                  color: '#5C4033',
                  fontSize: '12px',
                  fontWeight: '400',
                  padding: '4px 8px',
                  borderRadius: '12px',
                }}
              >
                2 articles
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '19px',
                color: '#2E2E2E',
                margin: 0,
              }}
            >
              Contradicting refund policies
            </h3>

            {/* Action Button */}
            <button
              type="button"
              className="slds-button"
              style={{
                color: '#0250D9',
                border: '1px solid #0250D9',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '13px',
                fontWeight: '400',
                backgroundColor: 'white',
                alignSelf: 'flex-start',
              }}
            >
              Resolve
            </button>
          </div>

          {/* Archive Stale Pricing Guide Card */}
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #C9C9C9',
              borderLeft: '4px solid #FE9339',
              borderRadius: '4px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Icon and Badge Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#FEF4E6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ArchiveIcon size={16} color="#5C4033" />
              </div>
              <span
                className="slds-badge"
                style={{
                  backgroundColor: '#D8F3DC',
                  color: '#1B4D3E',
                  fontSize: '12px',
                  fontWeight: '400',
                  padding: '4px 8px',
                  borderRadius: '12px',
                }}
              >
                1 article
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '19px',
                color: '#2E2E2E',
                margin: 0,
              }}
            >
              Archive stale pricing guide
            </h3>

            {/* Action Button */}
            <button
              type="button"
              className="slds-button"
              style={{
                color: '#0250D9',
                border: '1px solid #0250D9',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '13px',
                fontWeight: '400',
                backgroundColor: 'white',
                alignSelf: 'flex-start',
              }}
            >
              Archive
            </button>
          </div>
        </div>

        {/* Resolution Summary */}
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#F3F3F3',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '400', color: '#5C5C5C' }}>
              1 of 3 resolved
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#06A59A' }}>
              +5% health potential
            </span>
          </div>
          <div
            style={{
              height: '8px',
              backgroundColor: '#C9C9C9',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '33.33%',
                backgroundColor: '#06A59A',
              }}
            />
          </div>
        </div>

        {/* Resolve All Button */}
        <button
          type="button"
          className="slds-button slds-button_brand"
          style={{
            width: '100%',
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '32px',
          }}
        >
          Resolve All Recommendations
        </button>
      </div>
    </article>
  );
}
