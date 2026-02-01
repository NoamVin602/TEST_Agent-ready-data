'use client'

import './globals.css'
import { GlobalHeader } from './components/shared/GlobalHeader'
import { GlobalNavigation } from './components/shared/GlobalNavigation'
import { LeftNavigation } from './components/shared/LeftNavigation'
import { NavProvider, useNav } from './contexts/NavContext'

function LayoutContent({ children }: { children: React.ReactNode }) {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'var(--slds-g-font-family)', backgroundColor: 'var(--slds-g-color-neutral-base-95)' }}>
        <NavProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </NavProvider>
      </body>
    </html>
  )
}
