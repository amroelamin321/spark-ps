import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { addressLine, mapsQuery, site } from '@/data/site'
import { services } from '@/data/services'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import QuoteForm from '@/components/QuoteForm'
import EmergencyButton from '@/components/EmergencyButton'
import Todo from '@/components/Todo'
import { LinkedInIcon } from '@/components/icons'

export const metadata = pageMetadata({
  title: 'Contact Us & Request a Quote | Campbelltown NSW',
  description:
    'Contact Spark Professional Services: call 1300 425 498, email info@spark-ps.com.au or request a quote online. Office at H1/5-7 Hepher Rd, Campbelltown NSW 2560.',
  path: '/contact',
})

const formServices = services.map((s) => ({ slug: s.slug, name: s.name }))

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />
          <div className="page-hero__content">
            <h1>Contact us</h1>
            <p className="lead">
              Call us to talk to an engineer, or send a quote request with your site details and we
              will get back to you.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--wide-left">
          <div id="quote" className="panel">
            <h2 className="h-md">Request a quote</h2>
            <p className="muted">Tell us what you need and where. The more detail, the faster we can help.</p>
            <QuoteForm services={formServices} />
          </div>

          <aside className="sidebar" aria-label="Contact details">
            <div className="panel panel--alt">
              <h2 className="h-md">Contact details</h2>
              <ul className="contact-lines">
                <li>
                  <Phone size={20} aria-hidden="true" />
                  <div>
                    <a className="big" href={site.phone.href}>
                      {site.phone.display}
                    </a>
                    <div className="muted">
                      Office hours: <Todo>client to confirm</Todo>
                    </div>
                  </div>
                </li>
                <li>
                  <Mail size={20} aria-hidden="true" />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <MapPin size={20} aria-hidden="true" />
                  <address>
                    {site.address.street}
                    <br />
                    {site.address.locality} {site.address.region} {site.address.postcode}
                    <br />
                    {site.address.country}
                  </address>
                </li>
                <li>
                  <LinkedInIcon size={20} />
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="panel">
              <h2 className="h-md">Emergency?</h2>
              <p className="muted">For urgent high voltage switching, call our 24/7 line.</p>
              <EmergencyButton />
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="map-heading">
        <div className="container stack">
          <h2 id="map-heading">Find us</h2>
          <p>{addressLine}</p>
          <div className="map">
            <iframe
              title={`Map showing ${site.name} at ${addressLine}`}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            className="text-link"
            href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk it through?"
        text="Call our team to discuss your site, equipment and timing before you send a request."
      />
    </>
  )
}
