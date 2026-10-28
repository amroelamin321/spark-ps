import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { industries } from '@/data/industries'
import { getService } from '@/data/services'
import { projects } from '@/data/projects'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'

export const metadata = pageMetadata({
  title: 'Industries We Serve | HV Electrical Engineering | NSW & Australia',
  description:
    'High voltage engineering, testing, switching and maintenance for data centres, mining, renewable energy, commercial and industrial sites, water and utilities, airports and railways.',
  path: '/industries',
})

export default function IndustriesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Industries', href: '/industries' }]} />
          <div className="page-hero__content">
            <h1>Industries we serve</h1>
            <p className="lead">
              We work with facility and maintenance managers, electrical contractors, main
              contractors and utilities at sites that own and operate their own high voltage
              equipment.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-lg">
          {industries.map((industry) => {
            const Icon = industry.icon
            const industryProjects = projects.filter((p) => p.industry === industry.slug)
            return (
              <article key={industry.slug} id={industry.slug} className="panel">
                <div className="split split--wide-left">
                  <div className="stack">
                    <span className="card__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h2 className="h-md">{industry.name}</h2>
                    <p>{industry.description}</p>
                    {industryProjects.length > 0 && (
                      <div>
                        <h3 className="eyebrow mb-12">Project experience</h3>
                        <ul className="link-list">
                          {industryProjects.map((p) => (
                            <li key={p.slug}>
                              <Link className="text-link" href={`/projects/${p.slug}`}>
                                {p.title}, {p.location} <ArrowRight size={16} aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="eyebrow mb-12">Relevant services</h3>
                    <ul className="tag-list">
                      {industry.services.map((slug) => {
                        const s = getService(slug)!
                        return (
                          <li key={slug}>
                            <Link href={`/services/${slug}`}>{s.name}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <CtaBand title="Work in one of these industries?" />
    </>
  )
}
