import Link from 'next/link'
import { Mail } from 'lucide-react'
import { site } from '@/data/site'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import Photo from '@/components/Photo'
import { TodoBlock } from '@/components/Todo'
import { LinkedInIcon } from '@/components/icons'

export const metadata = pageMetadata({
  title: 'Careers | Electrical Engineering Jobs in Campbelltown NSW',
  description:
    'Careers at Spark Professional Services. Send your CV to join a high and low voltage electrical engineering team based in Campbelltown NSW.',
  path: '/careers',
})

const applyHref = `mailto:${site.email}?subject=${encodeURIComponent('Careers enquiry')}`

export default function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Careers', href: '/careers' }]} />
          <div className="page-hero__content">
            <h1>Careers at SPS</h1>
            <p className="lead">
              Interested in working with a team of electrical engineers on high and low voltage
              projects? We welcome expressions of interest from engineers, technicians and other
              professionals in the field.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack-lg">
            <div className="stack">
              <h2>Current opportunities</h2>
              <TodoBlock>
                Client to list current vacancies (title, location, type) or confirm wording for when
                there are no open roles.
              </TodoBlock>
            </div>

            <div className="stack">
              <h2>How to apply</h2>
              <p>
                Email your CV and a short cover note to{' '}
                <a href={applyHref}>{site.email}</a>. Let us know the type of role you are
                interested in and where you are based.
              </p>
              <div className="btn-row btn-row--stack-mobile">
                <a className="btn btn--primary" href={applyHref}>
                  <Mail size={18} aria-hidden="true" />
                  Email your application
                </a>
                <a className="btn btn--secondary" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon size={18} />
                  SPS on LinkedIn
                </a>
              </div>
              <p className="muted">
                Have a question first? Call us on <a href={site.phone.href}>{site.phone.display}</a>{' '}
                or use the <Link href="/contact">contact page</Link>.
              </p>
            </div>
          </div>
          <Photo alt="SPS engineers working together on site" />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
