import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { industries } from '@/data/industries'
import { featuredProjectSlugs, getProject } from '@/data/projects'
import { pageMetadata } from '@/data/seo'
import { ServiceCard, ProjectCard, IndustryTile } from '@/components/Cards'
import { ClientLogos, TestimonialGrid } from '@/components/Testimonials'
import EmergencyButton from '@/components/EmergencyButton'
import CtaBand from '@/components/CtaBand'
import Photo from '@/components/Photo'

export const metadata = pageMetadata({
  title: `High & Low Voltage Electrical Engineering | Campbelltown NSW | ${site.name}`,
  description:
    'Electrical engineering company in Campbelltown NSW: HV testing and commissioning, high voltage design, 24/7 emergency HV switching, maintenance, earth testing and thermographic imaging.',
  path: '/',
  absoluteTitle: true,
})

const featuredProjects = featuredProjectSlugs.map((slug) => getProject(slug)!)

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container split split--center">
          <div className="hero__content">
            <span className="eyebrow">Electrical engineering · Campbelltown NSW</span>
            <h1>High and low voltage engineering, testing and commissioning</h1>
            <p className="lead">
              {site.name} (SPS) designs, tests, commissions, switches and maintains electrical
              systems for sites with their own high voltage equipment, from data centres and
              factories to mines, utilities and renewable energy projects.
            </p>
            <div className="btn-row btn-row--stack-mobile hero__actions">
              <Link className="btn btn--primary" href="/contact#quote">
                Request a Quote
              </Link>
              <EmergencyButton />
            </div>
            <ul className="hero__facts">
              <li>
                <Check size={18} aria-hidden="true" />
                {site.yearsExperience} years of experience in HV and LV electrical engineering
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                A team of expert engineers, from design through to ongoing support
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                Projects delivered in NSW, VIC and the NT
              </li>
            </ul>
          </div>
          <Photo alt="SPS engineers working on HV switchgear in a switchroom" ratio="4 / 3" eager />
        </div>
      </section>

      <section className="section--tight" aria-label="Clients">
        <div className="container">
          <ClientLogos />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">Services</span>
              <h2 id="services-heading">What we do</h2>
              <p className="lead">
                Six core services covering the full life of your HV assets, from design and
                commissioning to switching and maintenance.
              </p>
            </div>
            <Link className="text-link" href="/services">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid--3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-heading">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">Industries</span>
              <h2 id="industries-heading">Industries we work in</h2>
            </div>
            <Link className="text-link" href="/industries">
              All industries <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid--3">
            {industries.map((i) => (
              <IndustryTile key={i.slug} industry={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="projects-heading">
        <div className="container">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">Projects</span>
              <h2 id="projects-heading">Featured projects</h2>
              <p className="lead">Selected work for data centres, heavy industry and off-grid energy.</p>
            </div>
            <Link className="text-link" href="/projects">
              All projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid--3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Testimonials</span>
            <h2 id="testimonials-heading">What our clients say</h2>
          </div>
          <TestimonialGrid />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
