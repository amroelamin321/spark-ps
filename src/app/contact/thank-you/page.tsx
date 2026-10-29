import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { site } from '@/data/site'

// Shown after a quote request is sent. Also usable as a URL-based conversion goal in Google Ads.
export const metadata: Metadata = {
  title: 'Quote request sent',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container prose stack">
        <span className="eyebrow">Request a quote</span>
        <h1>Thank you, your request has been sent</h1>
        <p className="lead">Our team will be in touch about your enquiry.</p>
        <p>
          For urgent work, or for 24/7 emergency HV switching, call us on{' '}
          <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
        <div className="btn-row btn-row--stack-mobile">
          <a className="btn btn--primary" href={site.phone.href}>
            <Phone size={18} aria-hidden="true" />
            Call {site.phone.display}
          </a>
          <Link className="btn btn--secondary" href="/projects">
            View our projects
          </Link>
        </div>
      </div>
    </section>
  )
}
