import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import Todo from '@/components/Todo'
import { site } from '@/data/site'

export const metadata = pageMetadata({
  title: 'High Voltage Electrical Services | NSW & Australia',
  description:
    'HV testing and commissioning, high voltage design, 24/7 HV switching, maintenance and support, earth testing and thermographic imaging from Spark Professional Services.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Services', href: '/services' }]} />
          <div className="page-hero__content">
            <h1>High voltage electrical services</h1>
            <p className="lead">
              SPS covers the full life of your high and low voltage assets: design, testing and
              commissioning, switching, and ongoing maintenance and diagnostics. Not sure which
              service you need? Call{' '}
              <a href={site.phone.href}>{site.phone.display}</a> and talk to an engineer.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ul className="stack-lg">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.slug} className="panel">
                  <div className="split split--wide-left">
                    <div className="stack">
                      <span className="card__icon">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <h2 className="h-md">
                        <Link className="title-link" href={`/services/${s.slug}`}>
                          {s.name}
                        </Link>
                      </h2>
                      <p>{s.intro[0]}</p>
                      <Link className="text-link" href={`/services/${s.slug}`}>
                        {s.name} details <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                    <div>
                      <h3 className="eyebrow mb-12">Typical scope</h3>
                      <ul className="bullet-list">
                        {s.included.slice(0, 4).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="mt-12">
                        <Todo>client to confirm scope</Todo>
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <CtaBand title="Need a quote for HV work?" />
    </>
  )
}
