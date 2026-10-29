import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import JsonLd from '@/components/JsonLd'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { organizationJsonLd } from '@/data/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `High & Low Voltage Electrical Engineering | Campbelltown NSW | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    'High and low voltage electrical engineering: testing and commissioning, HV design, 24/7 emergency HV switching, maintenance, earth testing and thermographic imaging. Call 1300 425 498.',
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: 'en_AU',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F1B2D',
}

const serviceLinks = services.map((s) => ({ name: s.name, href: `/services/${s.slug}` }))

// Optional Google Ads tag (the previous WordPress site used AW-18411546389). Off unless
// NEXT_PUBLIC_GOOGLE_ADS_ID is set in the Vercel project, so nothing is tracked without the client's decision.
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior lets Next.js turn off smooth scrolling during page navigations (Next 16),
    // so smooth scrolling only applies to in-page links such as #quote.
    <html lang="en-AU" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <SiteHeader serviceLinks={serviceLinks} />
        <main id="main" className="fade-in">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd()} />
        {googleAdsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`} strategy="afterInteractive" />
            <Script id="google-ads" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(googleAdsId)});`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
