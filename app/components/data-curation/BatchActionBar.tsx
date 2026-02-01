"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2Icon, XIcon } from '../../lib/slds-icons';
import { Spinner } from '../shared/Spinner';

interface BatchActionBarProps {
  selectedCount: number;
  onApproveAll: () => void;
  onExcludeAll: () => void;
  isProcessing?: boolean;
  onMassRedact?: () => void;
  onFormatNormalize?: () => void;
  onLabelOutlier?: () => void;
}

export function BatchActionBar({
  selectedCount,
  onApproveAll,
  onExcludeAll,
  isProcessing = false,
  onMassRedact,
  onFormatNormalize,
  onLabelOutlier,
}: BatchActionBarProps) {
  if (selectedCount === 0) return null;
  
  const hasContextualActions = onMassRedact || onFormatNormalize || onLabelOutlier;

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
          gap: 'var(--slds-g-spacing-2, 8px)',
          padding: 'var(--slds-g-spacing-2, 8px) var(--slds-g-spacing-6, 24px)',
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

        {/* Contextual Actions - Only show when relevant */}
        {hasContextualActions && (
          <>
            {onMassRedact && (
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={onMassRedact}
                disabled={isProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--slds-g-spacing-1, 4px)',
                  padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
                  borderRadius: 'var(--slds-g-radius-border-1)',
                  fontSize: 'var(--slds-g-font-scale-base)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  fontFamily: 'var(--slds-g-font-family)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.5 : 1,
                }}
              >
                Mass Redact
              </button>
            )}
            {onFormatNormalize && (
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={onFormatNormalize}
                disabled={isProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--slds-g-spacing-1, 4px)',
                  padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
                  borderRadius: 'var(--slds-g-radius-border-1)',
                  fontSize: 'var(--slds-g-font-scale-base)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  fontFamily: 'var(--slds-g-font-family)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.5 : 1,
                }}
              >
                Format Normalize
              </button>
            )}
            {onLabelOutlier && (
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={onLabelOutlier}
                disabled={isProcessing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--slds-g-spacing-1, 4px)',
                  padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)',
                  borderRadius: 'var(--slds-g-radius-border-1)',
                  fontSize: 'var(--slds-g-font-scale-base)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                  fontFamily: 'var(--slds-g-font-family)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.5 : 1,
                }}
              >
                Label as Outlier
              </button>
            )}
          </>
        )}

        <button
          onClick={onExcludeAll}
          disabled={isProcessing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-1, 4px)',
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
            <Spinner size="x-small" variant="default" aria-label="Processing" />
          ) : (
            <XIcon size={14} />
          )}
          Exclude All
        </button>

        <button
          onClick={onApproveAll}
          disabled={isProcessing}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--slds-g-spacing-1, 4px)',
            padding: 'var(--slds-g-spacing-2) var(--slds-g-spacing-4)', // 8px 16px
            borderRadius: 'var(--slds-g-radius-border-1)', // 4px
            border: 'none',
            backgroundColor: '#066AFE',
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
              e.currentTarget.style.backgroundColor = '#066AFE';
            }
          }}
        >
          {isProcessing ? (
            <Spinner size="x-small" variant="inverse" aria-label="Processing" />
          ) : (
            <CheckCircle2Icon size={14} />
          )}
          Approve All
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
