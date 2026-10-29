import type { Metadata } from 'next'
import { site } from './site'
import { services } from './services'

// Builds per-page metadata: title (the root layout appends "| Spark Professional Services"),
// description, canonical URL and Open Graph fields.
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_AU',
      type: 'website',
      // A page-level openGraph object replaces the parent's, so the shared card from
      // app/opengraph-image.tsx is referenced explicitly.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name} share card` }],
    },
  }
}

export const organizationId = `${site.url}/#organization`

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ElectricalContractor',
    '@id': organizationId,
    name: site.name,
    alternateName: site.shortName,
    description:
      'High and low voltage electrical engineering company providing testing and commissioning, HV design, HV switching (including 24/7 emergency response), maintenance and support, earth testing and thermographic imaging.',
    url: site.url,
    logo: `${site.url}/logo/spark-logo.png`,
    image: `${site.url}/logo/spark-logo.png`,
    telephone: site.phone.international,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    sameAs: [site.linkedin],
    // TODO: add `areaServed`, `openingHours` and `geo` once the client confirms service areas,
    // office hours and exact map coordinates.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Electrical engineering services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.summary,
          url: `${site.url}/services/${s.slug}`,
        },
      })),
    },
  }
}
