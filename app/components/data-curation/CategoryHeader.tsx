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
        padding: '12px 16px',
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
            fontSize: '14px',
            fontWeight: 600,
            color: '#03234D',
            margin: 0,
            textTransform: 'capitalize',
          }}
        >
          {category}
        </h3>
        {count !== undefined && (
          <span
            style={{
              fontSize: '12px',
              color: '#5C5C5C',
              fontWeight: 590,
            }}
          >
            {count} item{count !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
