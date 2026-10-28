import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <section className="section">
      <div className="container prose stack">
        <span className="eyebrow">Page not found</span>
        <h1>We couldn’t find that page</h1>
        <p className="lead">
          The page may have moved. Try one of the links below, or call us on{' '}
          <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
        <div className="btn-row">
          <Link className="btn btn--primary" href="/">
            Go to the home page
          </Link>
          <Link className="btn btn--secondary" href="/services">
            View our services
          </Link>
        </div>
      </div>
    </section>
  )
}
