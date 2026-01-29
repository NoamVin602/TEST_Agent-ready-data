import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
