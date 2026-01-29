import type { Metadata } from 'next'
import './globals.css'
import { GlobalHeader } from './components/shared/GlobalHeader'
import { GlobalNavigation } from './components/shared/GlobalNavigation'
import { LeftNavigation } from './components/shared/LeftNavigation'

export const metadata: Metadata = {
  title: 'Agent-Ready Data | Data Cloud',
  description: 'Salesforce Data Cloud Prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'var(--slds-g-font-family)', backgroundColor: 'var(--slds-g-color-neutral-base-95)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          {/* Global Header */}
          <GlobalHeader />
          
          {/* Global Navigation */}
          <GlobalNavigation activeTab="home" />
          
          {/* Main Content Area */}
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left Navigation */}
            <LeftNavigation />
            
            {/* Page Content */}
            <main style={{ flex: 1, overflow: 'auto' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
