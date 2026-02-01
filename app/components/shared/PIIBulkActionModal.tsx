"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckCircle2Icon } from '../../lib/slds-icons';
import { Spinner } from './Spinner';

interface PIIBulkActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueCount: number;
  onMask: () => Promise<void>;
  onArchive: () => Promise<void>;
}

export function PIIBulkActionModal({
  isOpen,
  onClose,
  issueCount,
  onMask,
  onArchive,
}: PIIBulkActionModalProps) {
  const [action, setAction] = useState<'mask' | 'archive' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleMask = async () => {
    setIsProcessing(true);
    setAction('mask');
    try {
      await onMask();
      setIsComplete(true);
      // Auto-close after showing success
      setTimeout(() => {
        setIsComplete(false);
        setAction(null);
        setIsProcessing(false);
        onClose();
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      setAction(null);
    }
  };

  const handleArchive = async () => {
    setIsProcessing(true);
    setAction('archive');
    try {
      await onArchive();
      setIsComplete(true);
      // Auto-close after showing success
      setTimeout(() => {
        setIsComplete(false);
        setAction(null);
        setIsProcessing(false);
        onClose();
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      setAction(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="slds-modal__container"
          style={{
            backgroundColor: 'var(--slds-g-color-neutral-base-100)',
            borderRadius: 'var(--slds-g-radius-border-3, 12px)',
            padding: 'var(--slds-g-spacing-6, 24px)',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {/* Header */}
          <div className="slds-modal__header" style={{ marginBottom: 'var(--slds-g-spacing-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="slds-text-heading_section" style={{ margin: 0 }}>
                {isComplete ? (
                  action === 'mask' ? 'PII Masked Successfully' : 'Documents Archived'
                ) : (
                  'Bulk Action: PII Detected'
                )}
              </h2>
              {!isProcessing && (
                <button
                  type="button"
                  className="slds-button slds-button_icon slds-button_icon-small"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <XIcon size={16} color="var(--slds-g-color-on-surface-1)" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="slds-modal__content">
            {isComplete ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--slds-g-spacing-4)',
                  padding: 'var(--slds-g-spacing-6) 0',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(6, 165, 154, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle2Icon size={32} color="#06A59A" />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontSize: 'var(--slds-g-font-scale-2)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      color: 'var(--slds-g-color-on-surface-2)',
                      marginBottom: 'var(--slds-g-spacing-2)',
                    }}
                  >
                    {action === 'mask'
                      ? `${issueCount} articles masked instantly. Safe.`
                      : `${issueCount} articles archived.`}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--slds-g-font-scale-base)',
                      color: 'var(--slds-g-color-on-surface-1)',
                      margin: 0,
                    }}
                  >
                    {action === 'mask'
                      ? 'All PII has been redacted and the documents are now safe for use.'
                      : 'Documents have been archived and removed from the knowledge base.'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p
                  style={{
                    fontSize: 'var(--slds-g-font-scale-1)',
                    color: 'var(--slds-g-color-on-surface-1)',
                    marginBottom: 'var(--slds-g-spacing-4)',
                  }}
                >
                  {issueCount} article{issueCount !== 1 ? 's' : ''} contain{issueCount === 1 ? 's' : ''} PII
                  (customer names and emails in old Knowledge articles).
                </p>
                <p
                  style={{
                    fontSize: 'var(--slds-g-font-scale-base)',
                    color: 'var(--slds-g-color-on-surface-1)',
                    marginBottom: 'var(--slds-g-spacing-6)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                  }}
                >
                  Choose an action:
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--slds-g-spacing-3)',
                  }}
                >
                  <button
                    type="button"
                    className="slds-button slds-button_brand"
                    onClick={handleMask}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--slds-g-spacing-2)',
                      padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)',
                    }}
                  >
                    {isProcessing && action === 'mask' ? (
                      <>
                        <Spinner size="x-small" variant="inverse" />
                        <span>Masking...</span>
                      </>
                    ) : (
                      <span>Mask</span>
                    )}
                  </button>
                  <button
                    type="button"
                    className="slds-button slds-button_neutral"
                    onClick={handleArchive}
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--slds-g-spacing-2)',
                      padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)',
                    }}
                  >
                    {isProcessing && action === 'archive' ? (
                      <>
                        <Spinner size="x-small" variant="default" />
                        <span>Archiving...</span>
                      </>
                    ) : (
                      <span>Archive Documents</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
