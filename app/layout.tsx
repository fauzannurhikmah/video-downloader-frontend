import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import config from '@/config'

const siteUrl =
  config.SITE_URL ||
  'https://video-downloader.zhiendfield.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: 'mXxxZTjvhVmdpsnyUPQRdvG3zFuWx85zfJZMntQZneA',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-v2.png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  title: {
    default: 'Free Video Downloader Online - YouTube, TikTok, Instagram, Facebook',
    template: '%s | Free Video Downloader',
  },

  description:
    'Download videos online from YouTube, TikTok, Instagram, Facebook, and Twitter in HD. Fast, free, and no watermark. Supports MP4 and MP3 formats.',

  keywords: [
    'video downloader',
    'youtube downloader',
    'tiktok downloader no watermark',
    'instagram video downloader',
    'facebook video downloader',
    'twitter video downloader',
    'download mp4 online',
    'download mp3 from video',
    'free video downloader',
    'tiktok downloader no watermark free',

  ],

  authors: [{ name: 'Video Downloader' }],
  creator: 'Video Downloader',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Free Video Downloader - Download from Any Platform',
    description:
      'Download videos from YouTube, TikTok, Instagram, Facebook, and Twitter in HD quality. No watermark, fast and free.',
    siteName: 'Video Downloader',
    images: [
      {
        url: '/icon-v2.png',
        width: 600,
        height: 600,
        alt: 'Video Downloader',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'Free Video Downloader - HD Video & MP3',
    description:
      'Download videos from YouTube, TikTok, Instagram, Facebook and more. Fast & free.',
    images: ['/icon-v2.png'],
  },

  alternates: {
    canonical: siteUrl,
  },

  category: 'technology',
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