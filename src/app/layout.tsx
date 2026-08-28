import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/common/CustomCursor'
import AnimatedBackground from '@/components/common/AnimatedBackground'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://spark-ps.com.au'),
  title: 'Spark Professional Services | High Voltage Engineering',
  description: 'Empowering Excellence in Electrical Engineering Design & Electrical Testing. 15 Years of experience in delivering high voltage solutions in Australia.',
  keywords: ['Electrical Engineering', 'High Voltage', 'Commissioning', 'Substation Design', 'Protection Relays', 'Australia'],
  openGraph: {
    title: 'Spark Professional Services',
    description: 'Empowering Excellence in Electrical Engineering Design & Electrical Testing.',
    url: 'https://spark-ps.com.au',
    siteName: 'Spark PS',
    images: [
      {
        url: '/about-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/SPARK_LOGO.png" type="image/png" />
      </head>
      <body className={`${plusJakartaSans.variable} ${plusJakartaSans.className}`}>
        <AnimatedBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
