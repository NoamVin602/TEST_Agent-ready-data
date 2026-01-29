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
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
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
              fontSize: '11px',
              fontWeight: 590,
              color: '#10B981',
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
              fontSize: '11px',
              fontWeight: 590,
              color: '#2E844A',
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
            marginBottom: '8px',
            fontSize: '12px',
            color: '#5C5C5C',
            display: 'flex',
            gap: '12px',
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
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #C9C9C9',
                backgroundColor: '#FFFFFF',
                color: '#03234D',
                fontSize: '13px',
                fontWeight: 590,
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
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#0176D3',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 590,
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
            fontSize: '14px',
            lineHeight: '1.6',
            color: chunk.status === 'excluded' ? '#5C5C5C' : '#03234D',
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
              borderRadius: '4px',
              border: '1px solid #C9C9C9',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F3F3';
              e.currentTarget.style.borderColor = '#0176D3';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = '#C9C9C9';
            }}
          >
            <Edit2 size={16} color="#5C5C5C" />
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
