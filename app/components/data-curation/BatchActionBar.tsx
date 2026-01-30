"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { Spinner } from '../shared/Spinner';

interface BatchActionBarProps {
  selectedCount: number;
  onApproveAll: () => void;
  onExcludeAll: () => void;
  isProcessing?: boolean;
}

export function BatchActionBar({
  selectedCount,
  onApproveAll,
  onExcludeAll,
  isProcessing = false,
}: BatchActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          border: '1px solid #E0E0E0',
        }}
      >
        <span
          style={{
            fontSize: 'var(--slds-g-font-scale-1)', // 14px from Figma
            fontWeight: 'var(--slds-g-font-weight-6)', // 590
            color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E from Figma
            fontFamily: 'var(--slds-g-font-family)',
            lineHeight: 'var(--slds-g-line-height-body)', // 19px from Figma
            marginRight: 'var(--slds-g-spacing-2)', // 8px
          }}
        >
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </span>

        <button
          onClick={onExcludeAll}
          disabled={isProcessing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)', // 8px 16px
            borderRadius: 'var(--slds-g-radius-border-1)', // 4px
            border: '1px solid #EF4444',
            backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
            color: '#EF4444',
            fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
            fontWeight: 'var(--slds-g-font-weight-6)', // 590
            fontFamily: 'var(--slds-g-font-family)',
            lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.5 : 1,
            transition: 'all var(--slds-g-transition-fast)',
          }}
          onMouseEnter={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#FEE2E2';
            }
          }}
          onMouseLeave={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }
          }}
        >
          {isProcessing ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '4px' }}>
              <Spinner size="x-small" variant="base" inline aria-label="Processing" />
            </span>
          ) : (
            <X size={14} />
          )}
          Exclude All
        </button>

        <button
          onClick={onApproveAll}
          disabled={isProcessing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)', // 8px 16px
            borderRadius: 'var(--slds-g-radius-border-1)', // 4px
            border: 'none',
            backgroundColor: '#2E844A',
            color: 'var(--slds-g-color-icon-white)', // #FFFFFF
            fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
            fontWeight: 'var(--slds-g-font-weight-6)', // 590
            fontFamily: 'var(--slds-g-font-family)',
            lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.5 : 1,
            transition: 'all var(--slds-g-transition-fast)',
          }}
          onMouseEnter={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#0C8A5F';
            }
          }}
          onMouseLeave={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#2E844A';
            }
          }}
        >
          {isProcessing ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '4px' }}>
              <Spinner size="x-small" variant="inverse" inline aria-label="Processing" />
            </span>
          ) : (
            <CheckCircle2 size={14} />
          )}
          Approve All
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
