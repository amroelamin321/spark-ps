import Link from 'next/link'
import { Phone } from 'lucide-react'
import { site } from '@/data/site'
import type { ServiceSlug } from '@/data/services'

type Props = {
  title?: string
  text?: string
  service?: ServiceSlug
}

export function quoteHref(service?: ServiceSlug) {
  return service ? `/contact?service=${service}#quote` : '/contact#quote'
}

export default function CtaBand({
  title = 'Talk to an engineer about your site',
  text = 'Tell us what you need and where. We will come back to you with a quote or the next steps.',
  service,
}: Props) {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-heading">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row btn-row--stack-mobile">
          <Link className="btn btn--primary" href={quoteHref(service)}>
            Request a Quote
          </Link>
          <a className="btn btn--outline-light" href={site.phone.href}>
            <Phone size={18} aria-hidden="true" />
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
