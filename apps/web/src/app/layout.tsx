import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tyrocoach.com'),
  title: {
    default: 'TyroCoach — Youth Sports Coaching Tips for Parents',
    template: '%s | TyroCoach',
  },
  description:
    'Practical coaching tips and drills for parents who\'ve been roped into coaching their kids\' youth sports teams. Start with soccer.',
  openGraph: {
    siteName: 'TyroCoach',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />

        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  )
}
