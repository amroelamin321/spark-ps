import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <body>
        <SiteHeader serviceLinks={serviceLinks} />
        <main id="main" className="fade-in">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  )
}
