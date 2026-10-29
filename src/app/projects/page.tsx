import { projects } from '@/data/projects'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import { ProjectCard } from '@/components/Cards'
import { ClientLogos, TestimonialGrid } from '@/components/Testimonials'
import { TodoBlock } from '@/components/Todo'

export const metadata = pageMetadata({
  title: 'HV Projects & Case Studies | NSW, VIC & NT',
  description:
    'Case studies from Spark Professional Services: data centre commissioning in Melbourne, an LNG protection relay retrofit in Darwin, a 6.6kV switchboard upgrade at Port Kembla and an 11kV off-grid network in Griffith.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Projects', href: '/projects' }]} />
          <div className="page-hero__content">
            <h1>Projects and case studies</h1>
            <p className="lead">
              A selection of high voltage testing, commissioning and upgrade work delivered by SPS
              for data centres, heavy industry and off-grid energy.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-lg">
          <div className="grid grid--2">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel={2} />
            ))}
          </div>
          <TodoBlock>
            Client to supply further case studies (location, scope and outcome), especially for
            Mining, Water &amp; Utilities and Airports &amp; Railways.
          </TodoBlock>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="testimonials-heading">
        <div className="container stack-lg">
          <div className="section-head">
            <span className="eyebrow">Testimonials</span>
            <h2 id="testimonials-heading">What our clients say</h2>
          </div>
          <TestimonialGrid />
          <ClientLogos />
        </div>
      </section>

      <CtaBand title="Planning a similar project?" />
    </>
  )
}
