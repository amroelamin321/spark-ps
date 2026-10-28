import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { addressLine, site } from '@/data/site'
import { services } from '@/data/services'
import { LinkedInIcon } from './icons'
import Todo from './Todo'

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Industries', href: '/industries' },
  { name: 'Projects', href: '/projects' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
  { name: 'Request a Quote', href: '/contact#quote' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src="/logo/sps-logo-white.svg" alt={`${site.name} logo`} width={193} height={83} />
            <p>
              High and low voltage electrical engineering, testing, commissioning, switching and
              maintenance. Based in {site.address.locality}, {site.address.region}.
            </p>
            <a className="site-footer__social" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon size={18} />
              Follow us on LinkedIn
            </a>
          </div>

          <nav aria-label="Services">
            <h2>Services</h2>
            <ul className="site-footer__links">
              <li>
                <Link href="/services">All services</Link>
              </li>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2>Company</h2>
            <ul className="site-footer__links">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>Contact</h2>
            <ul className="site-footer__contact">
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href={site.phone.href}>{site.phone.display}</a>
              </li>
              <li>
                <Mail size={18} aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <MapPin size={18} aria-hidden="true" />
                <address>{addressLine}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            ABN <Todo>client to confirm ABN</Todo>
          </p>
        </div>
      </div>
    </footer>
  )
}
