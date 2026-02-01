import './globals.css'
import { NavProvider } from './contexts/NavContext'
import { LayoutContent } from './components/shared/LayoutContent'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Data Health - Agent-Ready Data Dashboard</title>
        <meta name="description" content="Agent-Ready Data Health Dashboard" />
      </head>
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
