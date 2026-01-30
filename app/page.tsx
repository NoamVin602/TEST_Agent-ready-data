"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "./components/shared/PageHeader";
import { TabNavigation, TabId } from "./components/shared/TabNavigation";
import { HomeView, IssueCategory } from "./components/views/HomeView";
import { AnalysisView } from "./components/views/AnalysisView";
import { ContentGapsView } from "./components/views/ContentGapsView";
import { ArchivedView } from "./components/views/ArchivedView";
import { ActivityView } from "./components/views/ActivityView";
import { RunLogView } from "./components/views/RunLogView";
import { ConfigView } from "./components/views/ConfigView";
import { DataCurationView } from "./components/data-curation/DataCurationView";
import "./globals.css";

// Placeholder for ScanProgressModal
function ScanProgressModal({ isOpen, onClose, onComplete, isScanning }: any) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        maxWidth: '500px'
      }}>
        <h2>Scanning...</h2>
        <p>{isScanning ? 'Scan in progress...' : 'Scan complete!'}</p>
        <button onClick={onClose} style={{
          marginTop: '16px',
          padding: '8px 16px',
          backgroundColor: '#0176D3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Close
        </button>
      </div>
    </div>
  );
}

// Tab configuration - matching Figma design
const TABS = [
  { id: "home" as TabId, label: "Home" },
  { id: "analysis" as TabId, label: "Analysis", count: 10 },
  { id: "content-gaps" as TabId, label: "Content Gaps", count: 7 },
  { id: "archived" as TabId, label: "Archived", count: 5 },
  { id: "curation" as TabId, label: "Curation", count: 5 },
  { id: "activity" as TabId, label: "Activity" },
  { id: "run-log" as TabId, label: "Run Log" },
  { id: "config" as TabId, label: "Config" },
];

// Animation variants
const tabContentVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function DataCurationPage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [isScanning, setIsScanning] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>("all");
  
  // Refs for scroll targets
  const analysisRef = useRef<HTMLDivElement>(null);

  // Handle metric card click - linked navigation
  const handleMetricClick = useCallback((category: IssueCategory) => {
    setSelectedCategory(category);
    
    // Map metric to appropriate tab
    if (category === "content-gaps") {
      setActiveTab("content-gaps");
    } else {
      setActiveTab("analysis");
    }
    
    // Smooth scroll to top of content area
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  // Handle Run Scan with progress modal
  const handleRunScan = () => {
    setIsScanning(true);
    setShowScanModal(true);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    // Keep modal open to show final results
  };

  const renderTabContent = () => {
    const content = (() => {
      switch (activeTab) {
        case "home":
          return <HomeView onMetricClick={handleMetricClick} />;
        case "analysis":
          return (
            <AnalysisView 
              ref={analysisRef} 
              initialCategory={selectedCategory}
            />
          );
        case "content-gaps":
          return <ContentGapsView />;
        case "archived":
          return <ArchivedView />;
        case "curation":
          return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <DataCurationView />
            </div>
          );
        case "activity":
          return <ActivityView />;
        case "run-log":
          return <RunLogView />;
        case "config":
          return <ConfigView />;
        default:
          return <HomeView onMetricClick={handleMetricClick} />;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Page Header */}
      <PageHeader onRunScan={handleRunScan} isScanning={isScanning} />
      
      {/* Main Card Container with Tabs Inside */}
      <div style={{ 
        flex: 1, 
        overflow: activeTab === "curation" ? "hidden" : 'auto', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 'var(--slds-g-spacing-4, 16px)',
      }}>
        <article className="slds-card" style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Tabs in Card Header */}
          <div className="slds-card__header" style={{ padding: 0, borderBottom: 'none' }}>
            <TabNavigation 
              tabs={TABS} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </div>

          {/* Tab Content in Card Body */}
          <div className="slds-card__body slds-card__body_inner" style={{ flex: 1, padding: 'var(--slds-g-spacing-4, 16px)', overflow: activeTab === "curation" ? "hidden" : 'auto' }}>
            {renderTabContent()}
          </div>
        </article>
      </div>

      {/* Scan Progress Modal */}
      <ScanProgressModal
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        onComplete={handleScanComplete}
        isScanning={isScanning}
      />
    </div>
  );
}
