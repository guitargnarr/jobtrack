import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Traction - Get Traction in Your Job Search',
  description: 'Stop losing job applications in spreadsheet chaos. Import from LinkedIn, track your response rate, know what\'s working. Built by a job searcher who missed an interview.',
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
