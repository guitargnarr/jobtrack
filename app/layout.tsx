import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JobTrack - Stop Losing Job Applications',
  description: 'Track your job search. Know your response rate. Get more interviews.',
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
