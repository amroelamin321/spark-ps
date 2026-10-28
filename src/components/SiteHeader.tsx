'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { site } from '@/data/site'
import { LinkedInIcon } from './icons'

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

type Props = {
  serviceLinks: { name: string; href: string }[]
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SiteHeader({ serviceLinks }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Close the mobile menu after navigating (state adjusted during render, not in an effect).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div className="topbar">
        <div className="container topbar__inner">
          {/* Mobile and tablet: phone and quote always visible */}
          <a className="topbar__phone topbar__mobile" href={site.phone.href}>
            <Phone size={16} aria-hidden="true" />
            <span className="visually-hidden">Call </span>
            {site.phone.display}
          </a>
          <Link className="btn btn--primary btn--sm topbar__mobile" href="/contact#quote">
            Request a Quote
          </Link>

          {/* Desktop */}
          <div className="topbar__desktop">
            <span className="topbar__meta">
              {site.tagline} · {site.address.locality} {site.address.region}
            </span>
            <span className="topbar__links">
              <a href={`mailto:${site.email}`}>
                <Mail size={15} aria-hidden="true" />
                {site.email}
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={15} />
                LinkedIn
              </a>
            </span>
          </div>
        </div>
      </div>

      <header className="masthead">
        <div className="container masthead__inner">
          <Link href="/" className="masthead__logo" aria-label={`${site.name} home`}>
            <Image
              src="/logo/spark-logo.png"
              alt={`${site.name} logo`}
              width={720}
              height={164}
              sizes="180px"
              loading="eager"
            />
          </Link>

          <nav className="masthead__nav" aria-label="Main">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="masthead__actions">
            <a className="masthead__phone" href={site.phone.href}>
              <Phone size={18} aria-hidden="true" />
              {site.phone.display}
            </a>
            <Link className="btn btn--primary" href="/contact#quote">
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            Menu
          </button>
        </div>

        <div id="mobile-menu" className="mobile-menu" hidden={!open}>
          <nav className="container" aria-label="Mobile">
            <ul className="mobile-menu__list">
              <li>
                <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                    {link.name}
                  </Link>
                  {link.href === '/services' && (
                    <ul className="mobile-menu__sub">
                      {serviceLinks.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} aria-current={pathname === s.href ? 'page' : undefined}>
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mobile-menu__actions">
              <a className="btn btn--secondary btn--block" href={site.phone.href}>
                <Phone size={18} aria-hidden="true" />
                Call {site.phone.display}
              </a>
              <Link className="btn btn--primary btn--block" href="/contact#quote">
                Request a Quote
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
