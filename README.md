# Spark Professional Services website

Marketing site for Spark Professional Services (SPS), a high and low voltage electrical
engineering company in Campbelltown NSW. Built with Next.js (App Router), React and plain CSS.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages are statically generated)
npm run lint
```

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, LinkedIn, quote webhook URL | `src/data/site.ts` |
| The 6 services (copy, scope lists, SEO titles, related projects) | `src/data/services.ts` |
| Case studies | `src/data/projects.ts` |
| Industries | `src/data/industries.ts` |
| Testimonials and client logos | `src/data/testimonials.ts` |
| Page titles, Open Graph and ElectricalContractor JSON-LD | `src/data/seo.ts` |
| Styles (design tokens at the top) | `src/app/globals.css` |
| Pages | `src/app/**/page.tsx` |
| `sitemap.xml`, `robots.txt`, share image | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx` |

Service and project pages are generated from the data files, so adding a project is a matter of
adding an entry to `src/data/projects.ts`.

## Adding the client's photos

Every image slot currently shows a labelled placeholder. To replace one:

1. Put the photo in `public/photos/` (e.g. `public/photos/data-centre-switchroom.jpg`).
2. Set `src` on the matching `photo` entry in `src/data/services.ts` or `src/data/projects.ts`,
   e.g. `photo: { alt: '...', src: '/photos/data-centre-switchroom.jpg' }`.
3. Update the `alt` text to describe the actual photo.

The home, About and Careers photos are set directly on the `<Photo>` component in those pages.

## Content placeholders

Missing client information is shown on the page as a yellow `[TODO: ...]` marker. Search the code
for `Todo` to find them all. The full list for the client is in [`CLIENT-TODO.md`](CLIENT-TODO.md).

## Quote form

`src/components/QuoteForm.tsx` posts JSON to the n8n webhook in `src/data/site.ts`. It sends the
new fields (`name`, `company`, `phone`, `email`, `service`, `siteLocation`, `message`) and also the
field names the previous form used (`firstName`, `lastName`, `companyName`, `projectDetails`), so
the existing n8n workflow keeps working until it is updated.
