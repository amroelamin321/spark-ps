import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, Phone } from 'lucide-react'
import { site } from '@/data/site'
import { getService, services } from '@/data/services'
import { getProject } from '@/data/projects'
import { organizationId, pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand, { quoteHref } from '@/components/CtaBand'
import EmergencyButton from '@/components/EmergencyButton'
import JsonLd from '@/components/JsonLd'
import Photo from '@/components/Photo'
import { ProjectCard } from '@/components/Cards'
import { TodoBlock } from '@/components/Todo'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata(props: PageProps<'/services/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) return {}
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage(props: PageProps<'/services/[slug]'>) {
  const { slug } = await props.params
  const service = getService(slug)
  if (!service) notFound()

  const related = service.relatedProjects.flatMap((p) => getProject(p) ?? [])
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Services', href: '/services' },
              { name: service.name, href: `/services/${service.slug}` },
            ]}
          />
          <div className="page-hero__content">
            <h1>{service.name}</h1>
            <p className="lead">{service.summary}</p>
          </div>
          <div className="btn-row btn-row--stack-mobile">
            <Link className="btn btn--primary" href={quoteHref(service.slug)}>
              Request a Quote
            </Link>
            {service.emergency ? (
              <EmergencyButton />
            ) : (
              <a className="btn btn--secondary" href={site.phone.href}>
                <Phone size={18} aria-hidden="true" />
                Call {site.phone.display}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--wide-left">
          <div className="stack-lg">
            <div className="prose stack">
              <h2>What it is</h2>
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="stack">
              <h2>When your site needs it</h2>
              <ul className="check-list">
                {service.whenNeeded.map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="stack">
              <h2>What’s included</h2>
              <ul className="bullet-list">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <TodoBlock>Client to confirm this list of inclusions for {service.name}.</TodoBlock>
              {service.emergency && (
                <TodoBlock>
                  Client to confirm HV switching authorisations held and the networks or areas covered
                  by the 24/7 emergency response.
                </TodoBlock>
              )}
            </div>
          </div>

          <aside className="sidebar" aria-label={`${service.name} contact`}>
            <Photo alt={service.photo.alt} src={service.photo.src} />
            <div className="panel panel--alt">
              <h2 className="h-md">Request a quote</h2>
              <p className="muted">
                Tell us about your site and equipment and we will come back to you with a quote for{' '}
                {service.name.toLowerCase()}.
              </p>
              <Link className="btn btn--primary btn--block" href={quoteHref(service.slug)}>
                Request a Quote
              </Link>
              <a className="btn btn--secondary btn--block" href={site.phone.href}>
                <Phone size={18} aria-hidden="true" />
                Call {site.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt" aria-labelledby="related-heading">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Project experience</span>
              <h2 id="related-heading">Related {related.length > 1 ? 'projects' : 'project'}</h2>
            </div>
            <div className="grid grid--3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section--tight" aria-labelledby="other-services-heading">
        <div className="container">
          <h2 id="other-services-heading" className="eyebrow mb-16">
            Other services
          </h2>
          <ul className="tag-list">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Need ${service.name.toLowerCase()}?`} service={service.slug} />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url: `${site.url}/services/${service.slug}`,
          provider: { '@id': organizationId },
        }}
      />
    </>
  )
}
