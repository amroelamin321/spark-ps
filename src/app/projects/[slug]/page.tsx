import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { getProject, projects } from '@/data/projects'
import { getService } from '@/data/services'
import { industries } from '@/data/industries'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand, { quoteHref } from '@/components/CtaBand'
import Photo from '@/components/Photo'
import { ProjectCard } from '@/components/Cards'
import Todo from '@/components/Todo'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) return {}
  return pageMetadata({
    title: `${project.title}, ${project.location} | Case Study`,
    description: project.metaDescription,
    path: `/projects/${project.slug}`,
  })
}

export default async function ProjectPage(props: PageProps<'/projects/[slug]'>) {
  const { slug } = await props.params
  const project = getProject(slug)
  if (!project) notFound()

  const industry = industries.find((i) => i.slug === project.industry)!
  const projectServices = project.services.map((s) => getService(s)!)
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Projects', href: '/projects' },
              { name: project.title, href: `/projects/${project.slug}` },
            ]}
          />
          <div className="page-hero__content">
            <span className="eyebrow">Case study · {project.location}</span>
            <h1>
              {project.title}, {project.location}
            </h1>
            <p className="lead">{project.summary}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--wide-left">
          <div className="stack-lg">
            <Photo alt={project.photo.alt} src={project.photo.src} ratio="16 / 9" eager />

            <div className="prose stack">
              <h2>Overview</h2>
              <p>{project.overview}</p>
            </div>

            <div className="stack">
              <h2>Scope of work</h2>
              <ul className="check-list">
                {project.scope.map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose stack">
              <h2>Outcome</h2>
              <p>{project.outcome}</p>
              <p>
                <Todo>
                  client to confirm outcome details, e.g. completion date, energisation milestone or
                  client feedback
                </Todo>
              </p>
            </div>
          </div>

          <aside className="sidebar" aria-label="Project details">
            <dl className="facts">
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>
                  <Link href={`/industries#${industry.slug}`}>{industry.name}</Link>
                </dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd>
                  <ul className="link-list">
                    {projectServices.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Client</dt>
                <dd>
                  <Todo>client to confirm whether the client can be named</Todo>
                </dd>
              </div>
            </dl>
            <Link className="btn btn--primary btn--block" href={quoteHref(project.services[0])}>
              Request a Quote
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="more-heading">
        <div className="container">
          <div className="section-head">
            <h2 id="more-heading">More projects</h2>
          </div>
          <div className="grid grid--3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Planning a similar project?" service={project.services[0]} />
    </>
  )
}
