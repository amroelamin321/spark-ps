import type { MetadataRoute } from 'next'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    changeFrequency: 'monthly',
    priority,
  })

  return [
    page('', 1),
    page('/services', 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page('/industries', 0.7),
    page('/projects', 0.8),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.7)),
    page('/about', 0.6),
    page('/careers', 0.4),
    page('/contact', 0.8),
    page('/privacy-policy', 0.2),
  ]
}
