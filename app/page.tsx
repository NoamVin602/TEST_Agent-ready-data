"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "./components/shared/PageHeader";
import { TabNavigation, TabId } from "./components/shared/TabNavigation";
import { QuickFixesSidebar } from "./components/shared/QuickFixesSidebar";
import { HomeView, IssueCategory } from "./components/views/HomeView";
import { AnalysisView } from "./components/views/AnalysisView";
import { ContentGapsView } from "./components/views/ContentGapsView";
import { ArchivedView } from "./components/views/ArchivedView";
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

// Tab configuration
const TABS = [
  { id: "home" as TabId, label: "Home" },
  { id: "analysis" as TabId, label: "Analysis", count: 10 },
  { id: "content-gaps" as TabId, label: "Content Gaps", count: 7 },
  { id: "archived" as TabId, label: "Archived", count: 5 },
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
        case "activity":
          return (
            <div style={{ 
              maxWidth: '1440px', 
              margin: '0 auto', 
              padding: 'var(--slds-g-spacing-6)',
              textAlign: 'center',
              color: 'var(--slds-g-color-text-weak)'
            }}>
              Activity view - Coming soon
            </div>
          );
        case "run-log":
          return (
            <div style={{ 
              maxWidth: '1440px', 
              margin: '0 auto', 
              padding: 'var(--slds-g-spacing-6)',
              textAlign: 'center',
              color: 'var(--slds-g-color-text-weak)'
            }}>
              Run Log view - Coming soon
            </div>
          );
        case "config":
          return (
            <div style={{ 
              maxWidth: '1440px', 
              margin: '0 auto', 
              padding: 'var(--slds-g-spacing-6)',
              textAlign: 'center',
              color: 'var(--slds-g-color-text-weak)'
            }}>
              Configuration view - Coming soon
            </div>
          );
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
        backgroundColor: 'var(--slds-g-color-surface-container-2)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Page Header */}
      <PageHeader onRunScan={handleRunScan} isScanning={isScanning} />
      
      {/* Tab Navigation */}
      <TabNavigation 
        tabs={TABS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Tab Content with Optional Quick Fixes Sidebar */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {renderTabContent()}
        </div>
        {activeTab === "home" && <QuickFixesSidebar />}
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
