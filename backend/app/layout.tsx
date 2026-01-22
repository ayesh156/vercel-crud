import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vercel CRUD API',
  description: 'Backend API for CRUD Application',
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
