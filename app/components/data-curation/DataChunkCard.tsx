"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Edit2, Save, XCircle, Sparkles } from 'lucide-react';

export type ChunkStatus = 'pending' | 'curated' | 'excluded';

export interface DataChunk {
  id: string;
  content: string;
  status: ChunkStatus;
  confidence: number; // 0-100, for Agent-Ready highlighting
  category?: string;
  source?: string;
  sourceLocation?: {
    document: string;
    startIndex: number;
    endIndex: number;
  };
}

interface DataChunkCardProps {
  chunk: DataChunk;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  onChunkClick?: (chunk: DataChunk) => void;
  isHighlighted?: boolean;
  showCheckbox?: boolean;
}

export function DataChunkCard({
  chunk,
  isSelected = false,
  onSelect,
  onApprove,
  onReject,
  onEdit,
  onChunkClick,
  isHighlighted = false,
  showCheckbox = false,
}: DataChunkCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(chunk.content);
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  // Agent-Ready confidence highlighting (green pulse for high confidence)
  const isHighConfidence = chunk.confidence >= 80;
  const [showConfidencePulse, setShowConfidencePulse] = useState(isHighConfidence && chunk.status === 'pending');

  // Auto-focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      textRef.current.select();
    }
  }, [isEditing]);

  // Hide confidence pulse when user interacts
  useEffect(() => {
    if (isEditing || isSelected || isHighlighted) {
      setShowConfidencePulse(false);
    }
  }, [isEditing, isSelected, isHighlighted]);

  const handleApprove = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onApprove(chunk.id);
    }, 300);
  };

  const handleReject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onReject(chunk.id);
    }, 300);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditedContent(chunk.content);
  };

  const handleSave = () => {
    if (onEdit && editedContent.trim() !== chunk.content) {
      onEdit(chunk.id, editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(chunk.content);
    setIsEditing(false);
  };

  const handleCardClick = () => {
    if (!isEditing && onChunkClick) {
      onChunkClick(chunk);
    }
  };

  const getStatusStyles = () => {
    switch (chunk.status) {
      case 'pending':
        return {
          border: '1px dashed #C9C9C9',
          backgroundColor: showConfidencePulse ? 'rgba(16, 185, 129, 0.05)' : '#FFFFFF',
          borderColor: showConfidencePulse ? '#10B981' : '#C9C9C9',
        };
      case 'curated':
        return {
          border: '1px solid #2E844A',
          backgroundColor: '#E8F5EC',
          borderColor: '#2E844A',
        };
      case 'excluded':
        return {
          border: '1px solid #C9C9C9',
          backgroundColor: '#F3F3F3',
          borderColor: '#C9C9C9',
          opacity: 0.6,
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isAnimating ? 0 : 1, 
        y: isAnimating ? -20 : 0,
        scale: isEditing ? 1.02 : 1,
      }}
      exit={{ opacity: 0, x: -100, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'relative',
        borderRadius: 'var(--slds-g-radius-border-2)', // 8px from Figma
        padding: 'var(--slds-g-spacing-4)', // 16px from Figma
        marginBottom: 'var(--slds-g-spacing-3)', // 12px from Figma
        cursor: isEditing ? 'default' : 'pointer',
        ...getStatusStyles(),
        boxShadow: isHighlighted 
          ? '0 0 0 2px #0176D3' 
          : isEditing 
          ? '0 4px 12px rgba(0,0,0,0.15)' 
          : '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={handleCardClick}
      onMouseEnter={() => {
        if (!isEditing && !isSelected) {
          // Subtle hover effect
        }
      }}
    >
      {/* Agent-Ready Confidence Pulse Animation */}
      {showConfidencePulse && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* High Confidence Indicator */}
      {isHighConfidence && chunk.status === 'pending' && showConfidencePulse && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 1,
          }}
        >
          <Sparkles size={14} color="#10B981" />
          <span
            style={{
              fontSize: 'var(--slds-g-font-scale-neg-1)', // 11px
              fontWeight: 'var(--slds-g-font-weight-6)', // 590
              color: '#10B981',
              fontFamily: 'var(--slds-g-font-family)',
              lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
            }}
          >
            Agent-Ready
          </span>
        </div>
      )}

      {/* Checkbox for batch selection */}
      {showCheckbox && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect?.(chunk.id, e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
            }}
          />
        </div>
      )}

      {/* Status Badge */}
      {chunk.status === 'curated' && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: showCheckbox ? '40px' : '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 1,
          }}
        >
          <CheckCircle2 size={16} color="#2E844A" />
          <span
            style={{
              fontSize: 'var(--slds-g-font-scale-neg-1)', // 11px
              fontWeight: 'var(--slds-g-font-weight-6)', // 590
              color: '#2E844A',
              fontFamily: 'var(--slds-g-font-family)',
              lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
            }}
          >
            Verified
          </span>
        </div>
      )}

      {/* Category/Source Info */}
      {(chunk.category || chunk.source) && (
        <div
          style={{
            marginBottom: 'var(--slds-g-spacing-2)', // 8px from Figma
            fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
            fontWeight: 'var(--slds-g-font-weight-4)', // 400 Regular
            color: 'var(--slds-g-color-on-surface-1)', // #5C5C5C from Figma
            fontFamily: 'var(--slds-g-font-family)',
            lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
            display: 'flex',
            gap: 'var(--slds-g-spacing-3)', // 12px from Figma
          }}
        >
          {chunk.category && (
            <span style={{ fontWeight: 590 }}>Category: {chunk.category}</span>
          )}
          {chunk.source && (
            <span>Source: {chunk.source}</span>
          )}
        </div>
      )}

      {/* Content - Editable or Read-only */}
      {isEditing ? (
        <div style={{ position: 'relative', zIndex: 1 }}>
          <textarea
            ref={textRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '12px',
              border: '1px solid #0176D3',
              borderRadius: '4px',
              fontFamily: 'inherit',
              fontSize: '14px',
              lineHeight: '1.5',
              resize: 'vertical',
              outline: 'none',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
            style={{
              padding: '6px var(--slds-g-spacing-3)', // 6px 12px
              borderRadius: 'var(--slds-g-radius-border-1)', // 4px
              border: '1px solid var(--slds-g-color-border-1)', // #C9C9C9
              backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
              color: 'var(--slds-g-color-on-surface-2)', // #2E2E2E
              fontSize: 'var(--slds-g-font-scale-base)', // 13px
              fontWeight: 'var(--slds-g-font-weight-6)', // 590
              fontFamily: 'var(--slds-g-font-family)',
              lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
              cursor: 'pointer',
            }}
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            style={{
              padding: '6px var(--slds-g-spacing-3)', // 6px 12px
              borderRadius: 'var(--slds-g-radius-border-1)', // 4px
              border: 'none',
              backgroundColor: 'var(--slds-g-color-brand-base-50)', // #0176D3
              color: 'var(--slds-g-color-icon-white)', // #FFFFFF
              fontSize: 'var(--slds-g-font-scale-base)', // 13px
              fontWeight: 'var(--slds-g-font-weight-6)', // 590
              fontFamily: 'var(--slds-g-font-family)',
              lineHeight: 'var(--slds-g-line-height-body-base)', // 18px
              cursor: 'pointer',
            }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: 'var(--slds-g-font-scale-1)', // 14px from Figma
            fontWeight: 'var(--slds-g-font-weight-4)', // 400 Regular
            lineHeight: 'var(--slds-g-line-height-body)', // 19px from Figma
            color: chunk.status === 'excluded' ? 'var(--slds-g-color-on-surface-1)' : 'var(--slds-g-color-on-surface-2)', // #5C5C5C or #2E2E2E
            fontFamily: 'var(--slds-g-font-family)',
            paddingRight: chunk.status === 'pending' ? '80px' : '0',
          }}
          onClick={(e) => {
            // Only trigger edit on double-click or explicit edit button
            e.stopPropagation();
          }}
        >
          {chunk.content}
        </div>
      )}

      {/* Action Buttons */}
      {!isEditing && chunk.status === 'pending' && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleEditClick}
            title="Edit"
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--slds-g-radius-border-1)', // 4px
              border: '1px solid var(--slds-g-color-border-1)', // #C9C9C9
              backgroundColor: 'var(--slds-g-color-neutral-base-100)', // #FFFFFF
              cursor: 'pointer',
              transition: 'all var(--slds-g-transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-95)'; // #F3F3F3
              e.currentTarget.style.borderColor = 'var(--slds-g-color-brand-base-50)'; // #0176D3
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--slds-g-color-neutral-base-100)'; // #FFFFFF
              e.currentTarget.style.borderColor = 'var(--slds-g-color-border-1)'; // #C9C9C9
            }}
          >
            <Edit2 size={16} color="var(--slds-g-color-icon-default)" /> {/* #747474 */}
          </button>
          <button
            onClick={handleReject}
            title="Exclude"
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              border: '1px solid #EF4444',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FEE2E2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <X size={16} color="#EF4444" />
          </button>
          <button
            onClick={handleApprove}
            title="Approve"
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#2E844A',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0C8A5F';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2E844A';
            }}
          >
            <CheckCircle2 size={16} color="#FFFFFF" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
