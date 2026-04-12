import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Video Downloader - Download from Any Platform',
  description: 'Download videos from YouTube, TikTok, Instagram, Facebook, Twitter and more',
  keywords: 'video downloader, youtube, tiktok, instagram, facebook, twitter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}