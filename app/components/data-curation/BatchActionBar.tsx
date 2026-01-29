"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Loader2 } from 'lucide-react';

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
          data-variant="error"
          style={{
            border: '1px solid #EF4444',
            backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
            color: '#EF4444',
          }}
          onMouseEnter={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = '#FEE2E2';
            }
          }}
          onMouseLeave={(e) => {
            if (!isProcessing) {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)'; // #FFFFFF
            }
          }}
        >
          {isProcessing ? (
            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <X size={14} />
          )}
          Exclude All
        </button>

        <button
          onClick={onApproveAll}
          disabled={isProcessing}
          data-variant="success"
        >
          {isProcessing ? (
            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <CheckCircle2 size={14} />
          )}
          Approve All
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
