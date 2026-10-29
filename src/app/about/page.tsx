import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { addressLine, site } from '@/data/site'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import Photo from '@/components/Photo'
import Todo, { TodoBlock } from '@/components/Todo'
import { ClientLogos } from '@/components/Testimonials'

export const metadata = pageMetadata({
  title: 'About Us | Electrical Engineers in Campbelltown NSW',
  description:
    'Spark Professional Services is a high and low voltage electrical engineering company in Campbelltown NSW with 15 years of experience and a team of expert engineers.',
  path: '/about',
})

const approach = [
  {
    title: 'Consultation',
    text: 'We start by understanding your site, your equipment and what you need to achieve, including constraints such as shutdown windows and site access.',
  },
  {
    title: 'Custom design',
    text: 'We develop a solution for your specific site and requirements rather than an off-the-shelf package.',
  },
  {
    title: 'Implementation & testing',
    text: 'We carry out the work, then test and commission systems before handover, with documentation for your records.',
  },
  {
    title: 'Ongoing support',
    text: 'After handover we stay available for maintenance, switching and support as your site’s needs change.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />
          <div className="page-hero__content">
            <h1>About {site.name}</h1>
            <p className="lead">
              A high and low voltage electrical engineering company based in{' '}
              {site.address.locality}, {site.address.region}, with {site.yearsExperience} years of
              experience and a team of expert engineers.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--center">
          <div className="prose stack">
            <span className="eyebrow">Who we are</span>
            <h2>Engineering-led, from design to ongoing support</h2>
            <p>
              {site.name} (SPS) provides high and low voltage electrical engineering and design,
              testing and commissioning, HV switching, maintenance, earth testing and
              thermographic imaging.
            </p>
            <p>
              Our team of expert engineers brings {site.yearsExperience} years of experience to
              power systems for data centres, heavy industry, energy and infrastructure. We cover
              every stage, so your systems run safely, reliably and in line with the standards
              that apply to your site.
            </p>
            <blockquote className="pull-quote">
              <p>
                “SPS is committed to providing quality electrical engineering services to enhance
                the communities where our clients live and work.”
              </p>
            </blockquote>
          </div>
          <Photo alt="The SPS engineering team at the Campbelltown office or on site" />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="approach-heading">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our approach</span>
            <h2 id="approach-heading">How we work</h2>
            <p className="lead">The same four steps on every project, large or small.</p>
          </div>
          <ol className="steps">
            {approach.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="credentials-heading">
        <div className="container split">
          <div className="stack">
            <span className="eyebrow">Credentials</span>
            <h2 id="credentials-heading">Accreditations, safety and insurance</h2>
            <TodoBlock>
              Client to confirm certifications, accreditations, licences, HV authorisations,
              insurances and safety systems to list here. Do not publish until confirmed.
            </TodoBlock>
          </div>
          <div className="stack">
            <span className="eyebrow">Our team</span>
            <h2>Expert engineers</h2>
            <TodoBlock>
              Client to supply key team members (names, roles, qualifications) and team photos, if
              they would like them shown.
            </TodoBlock>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="location-heading">
        <div className="container split split--center">
          <div className="stack">
            <span className="eyebrow">Where we are</span>
            <h2 id="location-heading">Based in Campbelltown, NSW</h2>
            <p>
              Our office is at {addressLine}. Our featured projects include work in NSW, Victoria
              and the Northern Territory.
            </p>
            <p>
              Service areas: <Todo>client to confirm service areas</Todo>
            </p>
            <Link className="text-link" href="/contact">
              Contact details and map <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ClientLogos />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
