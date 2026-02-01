"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from '../../lib/slds-icons';

interface ValidationOverlayProps {
  isVisible: boolean;
  currentScore: number;
  projectedScore: number;
  chunkCount: number;
  curatedCount: number;
}

/**
 * Validation Overlay Component
 * Shows real-time feedback on how changes affect the Agent-Readiness Score
 * Based on Data Curation Interaction Patterns
 */
export function ValidationOverlay({
  isVisible,
  currentScore,
  projectedScore,
  chunkCount,
  curatedCount,
}: ValidationOverlayProps) {
  const scoreChange = projectedScore - currentScore;
  const isPositive = scoreChange > 0;
  const isNegative = scoreChange < 0;
  const isNeutral = scoreChange === 0;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="slds-card"
          style={{
            position: 'fixed',
            top: '80px',
            right: 'var(--slds-g-spacing-4, 16px)',
            zIndex: 1001,
            padding: 'var(--slds-g-spacing-3, 12px) var(--slds-g-spacing-4, 16px)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--slds-g-color-border-1)',
            borderRadius: 'var(--slds-g-radius-border-2, 8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            maxWidth: '320px',
          }}
        >
          <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-2)' }}>
            {/* Header */}
            <div
              style={{
                fontSize: 'var(--slds-g-font-scale-base)',
                fontWeight: 'var(--slds-g-font-weight-6)',
                color: 'var(--slds-g-color-on-surface-2)',
                fontFamily: 'var(--slds-g-font-family)',
                marginBottom: 'var(--slds-g-spacing-1)',
              }}
            >
              Agent-Readiness Impact
            </div>

            {/* Current vs Projected Score */}
            <div className="slds-grid" style={{ gap: 'var(--slds-g-spacing-3)', alignItems: 'center' }}>
              <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-1)' }}>
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-neg-1)',
                    fontWeight: 'var(--slds-g-font-weight-4)',
                    color: 'var(--slds-g-color-on-surface-1)',
                    fontFamily: 'var(--slds-g-font-family)',
                  }}
                >
                  Current
                </span>
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-2)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                    color: 'var(--slds-g-color-on-surface-2)',
                    fontFamily: 'var(--slds-g-font-family)',
                  }}
                >
                  {currentScore}%
                </span>
              </div>

              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                       {isPositive && <TrendingUpIcon size={20} color="#06A59A" />}
                {isNegative && <TrendingDownIcon size={20} color="#EF4444" />}
                {isNeutral && <MinusIcon size={20} color="#5C5C5C" />}
              </div>

              <div className="slds-grid slds-grid_vertical" style={{ gap: 'var(--slds-g-spacing-1)' }}>
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-neg-1)',
                    fontWeight: 'var(--slds-g-font-weight-4)',
                    color: 'var(--slds-g-color-on-surface-1)',
                    fontFamily: 'var(--slds-g-font-family)',
                  }}
                >
                  Projected
                </span>
                <span
                  style={{
                    fontSize: 'var(--slds-g-font-scale-2)',
                    fontWeight: 'var(--slds-g-font-weight-6)',
                           color: isPositive ? '#06A59A' : isNegative ? '#EF4444' : 'var(--slds-g-color-on-surface-2)',
                    fontFamily: 'var(--slds-g-font-family)',
                  }}
                >
                  {projectedScore}%
                </span>
              </div>
            </div>

            {/* Score Change Indicator */}
            {scoreChange !== 0 && (
              <div
                style={{
                  padding: 'var(--slds-g-spacing-2)',
                  backgroundColor: isPositive ? 'rgba(46, 132, 74, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 'var(--slds-g-radius-border-1)',
                  fontSize: 'var(--slds-g-font-scale-base)',
                  fontWeight: 'var(--slds-g-font-weight-6)',
                         color: isPositive ? '#06A59A' : '#EF4444',
                  fontFamily: 'var(--slds-g-font-family)',
                  textAlign: 'center',
                }}
              >
                {isPositive ? '+' : ''}{scoreChange}% change
              </div>
            )}

            {/* Stats */}
            <div
              className="slds-grid slds-grid_align-spread"
              style={{
                paddingTop: 'var(--slds-g-spacing-2)',
                borderTop: '1px solid var(--slds-g-color-border-1)',
                fontSize: 'var(--slds-g-font-scale-neg-1)',
                color: 'var(--slds-g-color-on-surface-1)',
                fontFamily: 'var(--slds-g-font-family)',
              }}
            >
              <span>{curatedCount} curated</span>
              <span>{chunkCount} total</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
