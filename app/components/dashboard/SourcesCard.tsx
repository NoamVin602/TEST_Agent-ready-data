"use client";

import React from "react";

interface Source {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SourcesCardProps {
  sources?: Source[];
}

const defaultSources: Source[] = [
  {
    id: '1',
    name: 'Engineering - Technical design specs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2L3 7v11h14V7l-7-5z" fill="#4285F4"/>
        <path d="M10 2v5h7" stroke="#FFFFFF" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    id: '2',
    name: 'Support - How-to articles',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="var(--slds-g-color-brand-base-50, #0176D3)"/>
        <path d="M10 6v4M10 12h.01" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: '3',
    name: 'Technical Documentation - Product manuals',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="var(--slds-g-color-brand-base-50, #0176D3)"/>
        <path d="M10 6v8M6 10h8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  }
];

export function SourcesCard({ sources = defaultSources }: SourcesCardProps) {
  return (
    <article className="slds-card" style={{ margin: 0, borderRadius: 'var(--slds-g-radius-border-3, 12px)', border: '1px solid var(--slds-g-color-border-1, #c9c9c9)' }}>
      <div className="slds-card__body slds-card__body_inner" style={{ padding: 'var(--slds-g-spacing-2, 8px) var(--slds-g-spacing-4, 16px)' }}>
        <h3
          style={{
            fontSize: 'var(--slds-g-font-scale-3, 20px)',
            lineHeight: '28px',
            color: 'var(--slds-g-color-on-surface-3, #03234d)',
            fontFamily: 'var(--slds-g-font-family)',
            fontWeight: 'var(--slds-g-font-weight-4, 400)',
            marginBottom: 'var(--slds-g-spacing-3, 12px)',
            marginTop: 0
          }}
        >
          Sources
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-3, 12px)' }}>
          {sources.map((source) => (
            <div key={source.id} style={{ display: 'flex', gap: 'var(--slds-g-spacing-3, 12px)', alignItems: 'flex-start', padding: '4px 0' }}>
              <div style={{ flexShrink: 0, width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {source.icon}
              </div>
              <span
                style={{
                  fontSize: '13px',
                  lineHeight: '20px',
                  color: 'var(--slds-g-color-on-surface-2, #2e2e2e)',
                  fontFamily: 'var(--slds-g-font-family)',
                  fontWeight: 'var(--slds-g-font-weight-4, 400)',
                  letterSpacing: '-0.078px',
                  flex: 1
                }}
              >
                {source.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
