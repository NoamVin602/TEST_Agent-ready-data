"use client";

import React from 'react';

interface CategoryHeaderProps {
  category: string;
  count?: number;
  isSticky?: boolean;
}

export function CategoryHeader({ category, count, isSticky = false }: CategoryHeaderProps) {
  return (
    <div
      style={{
        position: isSticky ? 'sticky' : 'relative',
        top: isSticky ? '0' : 'auto',
        zIndex: isSticky ? 100 : 1,
        padding: 'var(--slds-g-spacing-2, 8px) var(--slds-g-spacing-4, 16px)',
        backgroundColor: isSticky ? '#FFFFFF' : '#F3F3F3',
        borderBottom: '2px solid #E0E0E0',
        borderTop: isSticky ? '1px solid #E0E0E0' : 'none',
        boxShadow: isSticky ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            fontSize: 'var(--slds-g-font-scale-1)', // 14px from Figma
            fontWeight: 'var(--slds-g-font-weight-6)', // 590 Semibold
            color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E from Figma
            fontFamily: 'var(--slds-g-font-family)',
            lineHeight: 'var(--slds-g-line-height-body)', // 19px from Figma
            margin: 0,
            textTransform: 'capitalize',
          }}
        >
          {category}
        </h3>
        {count !== undefined && (
          <span
            style={{
              fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
              fontWeight: 'var(--slds-g-font-weight-6)', // 590
              color: 'var(--slds-g-color-on-surface-1)', // #5C5C5C from Figma
              fontFamily: 'var(--slds-g-font-family)',
              lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
            }}
          >
            {count} item{count !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
