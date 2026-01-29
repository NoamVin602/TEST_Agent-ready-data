"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataChunkCard, DataChunk, ChunkStatus } from './DataChunkCard';
import { BatchActionBar } from './BatchActionBar';
import { DocumentPreview } from './DocumentPreview';
import { CategoryHeader } from './CategoryHeader';

// Mock data - in real app, this would come from API
const MOCK_CHUNKS: DataChunk[] = [
  {
    id: '1',
    content: 'Salesforce Data Cloud enables organizations to unify customer data from multiple sources into a single, actionable customer profile.',
    status: 'pending',
    confidence: 92,
    category: 'Product Overview',
    source: 'Product Documentation',
    sourceLocation: {
      document: 'Data Cloud Guide',
      startIndex: 0,
      endIndex: 120,
    },
  },
  {
    id: '2',
    content: 'Identity Resolution uses advanced algorithms to match and merge customer records across different systems, ensuring data accuracy.',
    status: 'pending',
    confidence: 88,
    category: 'Product Overview',
    source: 'Product Documentation',
    sourceLocation: {
      document: 'Data Cloud Guide',
      startIndex: 120,
      endIndex: 250,
    },
  },
  {
    id: '3',
    content: 'Data Transformations allow you to cleanse, enrich, and standardize your data before it enters the unified profile.',
    status: 'pending',
    confidence: 75,
    category: 'Features',
    source: 'Product Documentation',
    sourceLocation: {
      document: 'Data Cloud Guide',
      startIndex: 250,
      endIndex: 380,
    },
  },
  {
    id: '4',
    content: 'Segmentation in Data Cloud enables real-time audience creation based on unified customer profiles.',
    status: 'pending',
    confidence: 85,
    category: 'Features',
    source: 'Product Documentation',
    sourceLocation: {
      document: 'Data Cloud Guide',
      startIndex: 380,
      endIndex: 480,
    },
  },
  {
    id: '5',
    content: 'This is a verified chunk that has been approved by a curator.',
    status: 'curated',
    confidence: 95,
    category: 'Product Overview',
    source: 'Product Documentation',
  },
];

const MOCK_DOCUMENT = {
  title: 'Data Cloud Guide',
  content: 'Salesforce Data Cloud enables organizations to unify customer data from multiple sources into a single, actionable customer profile. Identity Resolution uses advanced algorithms to match and merge customer records across different systems, ensuring data accuracy. Data Transformations allow you to cleanse, enrich, and standardize your data before it enters the unified profile. Segmentation in Data Cloud enables real-time audience creation based on unified customer profiles.',
};

export function DataCurationView() {
  const [chunks, setChunks] = useState<DataChunk[]>(MOCK_CHUNKS);
  const [selectedChunks, setSelectedChunks] = useState<Set<string>>(new Set());
  const [highlightedChunk, setHighlightedChunk] = useState<DataChunk | null>(null);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ChunkStatus | 'all'>('all');
  const [stickyCategory, setStickyCategory] = useState<string | null>(null);
  
  const listRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter chunks based on active filter
  const filteredChunks = chunks.filter((chunk) => {
    if (activeFilter === 'all') return true;
    return chunk.status === activeFilter;
  });

  // Group chunks by category
  const chunksByCategory = filteredChunks.reduce((acc, chunk) => {
    const category = chunk.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(chunk);
    return acc;
  }, {} as Record<string, DataChunk[]>);

  // Handle individual chunk approval
  const handleApprove = useCallback((id: string) => {
    setChunks((prev) =>
      prev.map((chunk) =>
        chunk.id === id ? { ...chunk, status: 'curated' as ChunkStatus } : chunk
      )
    );
    setSelectedChunks((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Handle individual chunk rejection
  const handleReject = useCallback((id: string) => {
    setChunks((prev) =>
      prev.map((chunk) =>
        chunk.id === id ? { ...chunk, status: 'excluded' as ChunkStatus } : chunk
      )
    );
    setSelectedChunks((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Handle chunk edit
  const handleEdit = useCallback((id: string, newContent: string) => {
    setChunks((prev) =>
      prev.map((chunk) =>
        chunk.id === id ? { ...chunk, content: newContent, status: 'curated' as ChunkStatus } : chunk
      )
    );
  }, []);

  // Handle chunk click (navigate to preview)
  const handleChunkClick = useCallback((chunk: DataChunk) => {
    setHighlightedChunk(chunk);
    // Scroll chunk into view in list
    setTimeout(() => {
      const element = document.getElementById(`chunk-${chunk.id}`);
      if (element && listRef.current) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, []);

  // Handle batch selection
  const handleSelect = useCallback((id: string, selected: boolean) => {
    setSelectedChunks((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  // Handle batch approve all
  const handleApproveAll = useCallback(async () => {
    setIsBatchProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setChunks((prev) =>
      prev.map((chunk) =>
        selectedChunks.has(chunk.id)
          ? { ...chunk, status: 'curated' as ChunkStatus }
          : chunk
      )
    );
    setSelectedChunks(new Set());
    setIsBatchProcessing(false);
  }, [selectedChunks]);

  // Handle batch exclude all
  const handleExcludeAll = useCallback(async () => {
    setIsBatchProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setChunks((prev) =>
      prev.map((chunk) =>
        selectedChunks.has(chunk.id)
          ? { ...chunk, status: 'excluded' as ChunkStatus }
          : chunk
      )
    );
    setSelectedChunks(new Set());
    setIsBatchProcessing(false);
  }, [selectedChunks]);

  // Sticky category header logic
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current) return;

      const scrollTop = listRef.current.scrollTop;
      let currentSticky: string | null = null;

      categoryRefs.current.forEach((element, category) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const containerRect = listRef.current!.getBoundingClientRect();
        
        if (rect.top <= containerRect.top + 50 && rect.bottom > containerRect.top) {
          currentSticky = category;
        }
      });

      setStickyCategory(currentSticky);
    };

    const container = listRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [chunksByCategory]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        backgroundColor: '#F3F3F3',
      }}
    >
      {/* Left Panel - Curation List */}
      <div
        style={{
          flex: '1 1 60%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0E0E0',
        }}
      >
        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px 24px',
            borderBottom: '1px solid #E0E0E0',
            backgroundColor: '#FFFFFF',
          }}
        >
          {(['all', 'pending', 'curated', 'excluded'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '6px var(--slds-g-spacing-3)', // 6px 12px
                borderRadius: 'var(--slds-g-radius-border-1)', // 4px
                border: 'none',
                backgroundColor: activeFilter === filter ? 'var(--slds-g-color-brand-base-50)' : 'var(--slds-g-color-neutral-base-95)', // #0176D3 or #F3F3F3
                color: activeFilter === filter ? 'var(--slds-g-color-icon-white)' : 'var(--slds-g-color-on-surface-2)', // #FFFFFF or #2E2E2E
                fontSize: 'var(--slds-g-font-scale-base)', // 13px from Figma
                fontWeight: activeFilter === filter ? 'var(--slds-g-font-weight-6)' : 'var(--slds-g-font-weight-4)', // 590 or 400
                fontFamily: 'var(--slds-g-font-family)',
                lineHeight: 'var(--slds-g-line-height-body-base)', // 18px from Figma
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all var(--slds-g-transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.backgroundColor = '#E0E0E0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter) {
                  e.currentTarget.style.backgroundColor = '#F3F3F3';
                }
              }}
            >
              {filter === 'all' ? 'All' : filter}
              {filter !== 'all' && (
                <span style={{ marginLeft: '6px', opacity: 0.8 }}>
                  ({chunks.filter((c) => c.status === filter).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Chunks List */}
        <div
          ref={listRef}
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px 24px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {Object.entries(chunksByCategory).map(([category, categoryChunks]) => (
              <div key={category}>
                {/* Regular Category Header */}
                <div
                  ref={(el) => {
                    if (el) categoryRefs.current.set(category, el);
                  }}
                >
                  <CategoryHeader
                    category={category}
                    count={categoryChunks.length}
                    isSticky={false}
                  />
                </div>

                {/* Sticky Category Header (when scrolling) */}
                {stickyCategory === category && (
                  <div
                    style={{
                      position: 'sticky',
                      top: 0,
                      zIndex: 100,
                    }}
                  >
                    <CategoryHeader
                      category={category}
                      count={categoryChunks.length}
                      isSticky={true}
                    />
                  </div>
                )}

                {/* Chunks in Category */}
                {categoryChunks.map((chunk) => (
                  <div key={chunk.id} id={`chunk-${chunk.id}`}>
                    <DataChunkCard
                      chunk={chunk}
                      isSelected={selectedChunks.has(chunk.id)}
                      onSelect={handleSelect}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onEdit={handleEdit}
                      onChunkClick={handleChunkClick}
                      isHighlighted={highlightedChunk?.id === chunk.id}
                      showCheckbox={selectedChunks.size > 0 || activeFilter === 'pending'}
                    />
                  </div>
                ))}
              </div>
            ))}
          </AnimatePresence>

          {filteredChunks.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                color: '#5C5C5C',
                fontSize: '14px',
              }}
            >
              No {activeFilter === 'all' ? '' : activeFilter} chunks found.
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Document Preview */}
      <div style={{ flex: '1 1 40%', minWidth: '400px' }}>
        <DocumentPreview
          document={MOCK_DOCUMENT}
          highlightedChunk={highlightedChunk}
          onChunkClick={handleChunkClick}
        />
      </div>

      {/* Batch Action Bar */}
      <BatchActionBar
        selectedCount={selectedChunks.size}
        onApproveAll={handleApproveAll}
        onExcludeAll={handleExcludeAll}
        isProcessing={isBatchProcessing}
      />
    </div>
  );
}
