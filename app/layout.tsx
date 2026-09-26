import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GlobalFloatingActions } from '@/components/global-floating-actions'
import { AnimationProvider } from '@/components/animation-provider'

export const metadata: Metadata = {
  title: 'B.S. HITECH | Luxury Living in Patna',
  description: 'Premium RERA approved residences by Bigrahpurm Developers in Kankarbagh, Patna.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/apple-icon.png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <GlobalFloatingActions />
        <AnimationProvider />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
