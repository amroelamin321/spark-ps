import Link from 'next/link'
import { site } from '@/data/site'
import JsonLd from './JsonLd'

type Crumb = { name: string; href: string }

// The last crumb is the current page.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items]

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <li key={c.href} aria-current="page">
              {c.name}
            </li>
          ) : (
            <li key={c.href}>
              <Link href={c.href}>{c.name}</Link>
            </li>
          ),
        )}
      </ol>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href === '/' ? '' : c.href}`,
          })),
        }}
      />
    </nav>
  )
}
