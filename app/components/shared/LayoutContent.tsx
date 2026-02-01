"use client";

import { useNav } from '../../contexts/NavContext';
import { GlobalHeader } from './GlobalHeader';
import { GlobalNavigation } from './GlobalNavigation';
import { LeftNavigation } from './LeftNavigation';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const { setIsCollapsed } = useNav();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Global Header */}
      <GlobalHeader />
      
      {/* Global Navigation */}
      <GlobalNavigation activeTab="home" />
      
      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation */}
        <LeftNavigation onCollapseChange={setIsCollapsed} />
        
        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
