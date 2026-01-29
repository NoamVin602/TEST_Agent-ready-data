"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DataChunk } from './DataChunkCard';

interface DocumentPreviewProps {
  document: {
    title: string;
    content: string;
  };
  highlightedChunk?: DataChunk | null;
  onChunkClick?: (chunk: DataChunk) => void;
}

export function DocumentPreview({
  document,
  highlightedChunk,
  onChunkClick,
}: DocumentPreviewProps) {
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to highlighted chunk when it changes
  useEffect(() => {
    if (highlightedChunk && highlightRef.current && containerRef.current) {
      const highlightElement = highlightRef.current;
      const container = containerRef.current;
      
      const scrollTop = highlightElement.offsetTop - container.offsetTop - container.offsetHeight / 2 + highlightElement.offsetHeight / 2;
      
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, [highlightedChunk]);

  // Split document content into chunks (simplified - in real app, this would come from API)
  const renderContent = () => {
    if (!highlightedChunk || !highlightedChunk.sourceLocation) {
      return (
        <div style={{ padding: '16px', fontSize: '14px', lineHeight: '1.6', color: '#03234D' }}>
          {document.content}
        </div>
      );
    }

    // Highlight the specific chunk in the document
    const { startIndex, endIndex } = highlightedChunk.sourceLocation;
    const beforeText = document.content.substring(0, startIndex);
    const chunkText = document.content.substring(startIndex, endIndex);
    const afterText = document.content.substring(endIndex);

    return (
      <div style={{ padding: '16px', fontSize: '14px', lineHeight: '1.6', color: '#03234D' }}>
        <span>{beforeText}</span>
        <motion.span
          ref={highlightRef}
          initial={{ backgroundColor: 'rgba(1, 118, 211, 0.2)' }}
          animate={{ backgroundColor: 'rgba(1, 118, 211, 0.3)' }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: 'rgba(1, 118, 211, 0.3)',
            padding: '2px 4px',
            borderRadius: '4px',
            fontWeight: 590,
            cursor: 'pointer',
            display: 'inline-block',
            border: '2px solid #0176D3',
          }}
          onClick={() => onChunkClick?.(highlightedChunk)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(1, 118, 211, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(1, 118, 211, 0.3)';
          }}
        >
          {chunkText}
        </motion.span>
        <span>{afterText}</span>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      {/* Document Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E0E0E0',
          backgroundColor: '#F3F3F3',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#03234D',
            margin: 0,
          }}
        >
          {document.title}
        </h3>
        {highlightedChunk && (
          <p
            style={{
              fontSize: '12px',
              color: '#5C5C5C',
              margin: '4px 0 0 0',
            }}
          >
            Highlighted chunk: {highlightedChunk.category || 'Uncategorized'}
          </p>
        )}
      </div>

      {/* Document Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  );
}
