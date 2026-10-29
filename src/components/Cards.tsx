import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Service } from '@/data/services'
import type { Project } from '@/data/projects'
import type { Industry } from '@/data/industries'
import Photo from './Photo'

export function ServiceCard({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const Icon = service.icon
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="card card--link">
      <span className="card__icon">
        <Icon size={22} aria-hidden="true" />
      </span>
      <Heading className="card__title">
        <Link href={`/services/${service.slug}`}>{service.name}</Link>
      </Heading>
      <p className="card__text">{service.summary}</p>
      <span className="card__more" aria-hidden="true">
        Learn more <ArrowRight size={16} />
      </span>
    </article>
  )
}

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="card card--link card--flush">
      <Photo alt={project.photo.alt} src={project.photo.src} ratio="16 / 10" sizes="(min-width: 1080px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className="card__body">
        <span className="meta-line">
          <MapPin size={15} aria-hidden="true" />
          {project.location}
        </span>
        <Heading className="card__title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </Heading>
        <p className="card__text">{project.summary}</p>
        <span className="card__more" aria-hidden="true">
          Read case study <ArrowRight size={16} />
        </span>
      </div>
    </article>
  )
}

export function IndustryTile({ industry }: { industry: Industry }) {
  const Icon = industry.icon
  return (
    <div className="tile">
      <Icon className="tile__icon" size={26} aria-hidden="true" />
      <div>
        <h3 className="card__title">
          <Link href={`/industries#${industry.slug}`}>{industry.name}</Link>
        </h3>
        <p>{industry.summary}</p>
      </div>
    </div>
  )
}
