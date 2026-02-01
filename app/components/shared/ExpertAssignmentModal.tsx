"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckCircle2Icon, UserIcon } from '../../lib/slds-icons';
import { Spinner } from './Spinner';

interface Expert {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface ExpertAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueTitle: string;
  detectedText: string;
  authoritativeText: string;
  onAssign: (expertId: string) => Promise<void>;
  experts?: Expert[];
}

const DEFAULT_EXPERTS: Expert[] = [
  {
    id: 'laura',
    name: 'Laura',
    role: 'Product Knowledge Manager',
  },
  {
    id: 'mike',
    name: 'Mike Wilson',
    role: 'Engineering Lead',
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Technical Writer',
  },
];

export function ExpertAssignmentModal({
  isOpen,
  onClose,
  issueTitle,
  detectedText,
  authoritativeText,
  onAssign,
  experts = DEFAULT_EXPERTS,
}: ExpertAssignmentModalProps) {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [assignedExpert, setAssignedExpert] = useState<Expert | null>(null);

  const handleAssign = async () => {
    if (!selectedExpert) return;
    
    setIsProcessing(true);
    const expert = experts.find(e => e.id === selectedExpert);
    setAssignedExpert(expert || null);
    
    try {
      await onAssign(selectedExpert);
      setIsComplete(true);
      // Auto-close after showing success
      setTimeout(() => {
        setIsComplete(false);
        setSelectedExpert(null);
        setIsProcessing(false);
        setAssignedExpert(null);
        onClose();
      }, 3000);
    } catch (error) {
      setIsProcessing(false);
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
            maxWidth: '600px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          {/* Header */}
          <div className="slds-modal__header" style={{ marginBottom: 'var(--slds-g-spacing-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="slds-text-heading_section" style={{ margin: 0 }}>
                {isComplete ? 'Expert Notified' : 'Ask an Expert'}
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
                    {assignedExpert?.name} has been notified
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--slds-g-font-scale-base)',
                      color: 'var(--slds-g-color-on-surface-1)',
                      margin: 0,
                    }}
                  >
                    A Slack notification has been sent to {assignedExpert?.name} ({assignedExpert?.role}).
                    They will review the conflict and provide resolution.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 'var(--slds-g-spacing-4)' }}>
                  <h3
                    style={{
                      fontSize: 'var(--slds-g-font-scale-1)',
                      fontWeight: 'var(--slds-g-font-weight-6)',
                      color: 'var(--slds-g-color-on-surface-2)',
                      marginBottom: 'var(--slds-g-spacing-3)',
                    }}
                  >
                    {issueTitle}
                  </h3>
                  
                  {/* Conflict Details */}
                  <div style={{ 
                    backgroundColor: 'rgba(254, 147, 57, 0.05)', 
                    padding: 'var(--slds-g-spacing-3)',
                    borderRadius: 'var(--slds-g-radius-border-2)',
                    marginBottom: 'var(--slds-g-spacing-4)',
                  }}>
                    <div style={{ marginBottom: 'var(--slds-g-spacing-2)' }}>
                      <span className="slds-badge slds-badge_detected" style={{ marginRight: 'var(--slds-g-spacing-2)' }}>
                        Detected
                      </span>
                      <span style={{ fontSize: 'var(--slds-g-font-scale-base)', color: 'var(--slds-g-color-on-surface-2)' }}>
                        {detectedText}
                      </span>
                    </div>
                    <div>
                      <span className="slds-badge slds-badge_authoritative" style={{ marginRight: 'var(--slds-g-spacing-2)' }}>
                        Authoritative
                      </span>
                      <span style={{ fontSize: 'var(--slds-g-font-scale-base)', color: 'var(--slds-g-color-on-surface-2)' }}>
                        {authoritativeText}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--slds-g-font-scale-base)',
                      color: 'var(--slds-g-color-on-surface-1)',
                      marginBottom: 'var(--slds-g-spacing-4)',
                    }}
                  >
                    Select an expert to review this conflict:
                  </p>
                </div>

                {/* Expert List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--slds-g-spacing-2)', marginBottom: 'var(--slds-g-spacing-6)' }}>
                  {experts.map((expert) => (
                    <button
                      key={expert.id}
                      type="button"
                      onClick={() => setSelectedExpert(expert.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--slds-g-spacing-3)',
                        padding: 'var(--slds-g-spacing-3)',
                        borderRadius: 'var(--slds-g-radius-border-2)',
                        border: selectedExpert === expert.id 
                          ? '2px solid var(--slds-g-color-accent-2, #0250D9)' 
                          : '1px solid var(--slds-g-color-border-1)',
                        backgroundColor: selectedExpert === expert.id 
                          ? 'rgba(2, 80, 217, 0.05)' 
                          : 'transparent',
                        cursor: 'pointer',
                        transition: 'all var(--slds-g-transition-fast)',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--slds-g-color-accent-2, #0250D9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <UserIcon size={20} color="#FFFFFF" />
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div
                          style={{
                            fontSize: 'var(--slds-g-font-scale-1)',
                            fontWeight: 'var(--slds-g-font-weight-6)',
                            color: 'var(--slds-g-color-on-surface-2)',
                            marginBottom: '2px',
                          }}
                        >
                          {expert.name}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--slds-g-font-scale-neg-1)',
                            color: 'var(--slds-g-color-on-surface-1)',
                          }}
                        >
                          {expert.role}
                        </div>
                      </div>
                      {selectedExpert === expert.id && (
                        <CheckCircle2Icon size={20} color="var(--slds-g-color-accent-2, #0250D9)" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Assign Button */}
                <button
                  type="button"
                  className="slds-button slds-button_brand"
                  onClick={handleAssign}
                  disabled={!selectedExpert || isProcessing}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--slds-g-spacing-2)',
                    padding: 'var(--slds-g-spacing-3) var(--slds-g-spacing-4)',
                    opacity: !selectedExpert ? 0.5 : 1,
                    cursor: !selectedExpert ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Spinner size="x-small" variant="inverse" />
                      <span>Sending notification...</span>
                    </>
                  ) : (
                    <span>Send to Expert</span>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
