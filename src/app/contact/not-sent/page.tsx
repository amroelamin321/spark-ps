import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { site } from '@/data/site'

// Shown when a quote request posted without JavaScript could not be sent.
export const metadata: Metadata = {
  title: 'Quote request not sent',
  robots: { index: false },
}

export default function NotSentPage() {
  return (
    <section className="section">
      <div className="container prose stack">
        <span className="eyebrow">Request a quote</span>
        <h1>Sorry, your request was not sent</h1>
        <p className="lead">
          Please check that your name, phone number and email address are filled in, then try again,
          or contact us directly.
        </p>
        <div className="btn-row btn-row--stack-mobile">
          <a className="btn btn--primary" href={site.phone.href}>
            <Phone size={18} aria-hidden="true" />
            Call {site.phone.display}
          </a>
          <a className="btn btn--secondary" href={`mailto:${site.email}`}>
            <Mail size={18} aria-hidden="true" />
            Email {site.email}
          </a>
        </div>
        <p>
          <Link href="/contact#quote">Back to the quote form</Link>
        </p>
      </div>
    </section>
  )
}
