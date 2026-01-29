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
            fontSize: '14px',
            fontWeight: 590,
            color: '#03234D',
            marginRight: '8px',
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
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #EF4444',
            backgroundColor: '#FFFFFF',
            color: '#EF4444',
            fontSize: '13px',
            fontWeight: 590,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.5 : 1,
            transition: 'all 0.15s ease-in-out',
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
            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
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
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#2E844A',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 590,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.5 : 1,
            transition: 'all 0.15s ease-in-out',
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
