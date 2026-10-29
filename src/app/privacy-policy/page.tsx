import { site } from '@/data/site'
import { pageMetadata } from '@/data/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import CtaBand from '@/components/CtaBand'
import { TodoBlock } from '@/components/Todo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} handles personal information sent through this website.`,
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Privacy policy', href: '/privacy-policy' }]} />
          <div className="page-hero__content">
            <h1>Privacy policy</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose stack-lg">
          <TodoBlock>
            Client to supply the approved privacy policy text. The policy on the previous website
            contains placeholder (&ldquo;Lorem Ipsum&rdquo;) text and an old Guildford address, so it
            has not been copied.
          </TodoBlock>

          <div className="stack">
            <h2>Quote requests and enquiries</h2>
            <p>
              When you send a quote request through this website, the details you enter (name,
              company, phone, email, service, site location and message) are sent to {site.name} so
              we can respond to your enquiry.
            </p>
          </div>

          <div className="stack">
            <h2>Contact us about privacy</h2>
            <p>
              For questions about your personal information, email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
              <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
