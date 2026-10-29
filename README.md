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
| Phone, email, address, LinkedIn, ABN | `src/data/site.ts` |
| Quote form endpoint (validation, spam trap, forwarding to n8n) | `src/app/api/quote/route.ts` |
| Redirects from the old WordPress URLs, security headers | `next.config.ts` |
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

`src/components/QuoteForm.tsx` posts to the route handler `src/app/api/quote/route.ts`, which
validates the fields, drops submissions that fill the hidden honeypot field, and forwards the lead
to the client's n8n webhook server-side, so the webhook URL never reaches the browser. The form
also works without JavaScript: a plain POST is redirected to `/contact/thank-you` or
`/contact/not-sent`.

The webhook receives the new fields (`name`, `company`, `phone`, `email`, `service`,
`siteLocation`, `message`) and the field names the previous form used (`firstName`, `lastName`,
`companyName`, `projectDetails`), so the existing n8n workflow keeps working.

### Environment variables (Vercel project settings)

| Variable | Purpose |
| --- | --- |
| `QUOTE_WEBHOOK_URL` | n8n webhook for quote requests. Falls back to the webhook the previous site used. |
| `QUOTE_WEBHOOK_SECRET` | Optional. Sent as the `X-Webhook-Secret` header. Enable Header Auth on the n8n Webhook node with the same value. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Optional, e.g. `AW-18411546389`. Loads the Google Ads tag. Leave unset until the client confirms they want it. |

## Going live on spark-ps.com.au

Merging to `main` deploys to Vercel production, but `spark-ps.com.au` is still served by the
client's WordPress site at GoDaddy until DNS is changed. To cut over:

1. Fill in the client items marked "required before go-live" in `CLIENT-TODO.md` (at least the
   privacy policy). Every other `[TODO]` marker is visible to the public once the domain moves.
2. In n8n, move the quote webhook to a new path (the old one is in this public repo's history) and
   enable Header Auth. In Vercel, set `QUOTE_WEBHOOK_URL` and `QUOTE_WEBHOOK_SECRET`, then redeploy.
3. In Vercel, Project, Settings, Domains: add `spark-ps.com.au` as the production domain, and add
   `www.spark-ps.com.au` set to redirect to it.
4. At GoDaddy DNS, lower the TTL a day ahead. Then change only the apex `A` record and the `www`
   record to the values Vercel shows. Leave the `MX`, `TXT` (SPF / Microsoft verification) and
   `autodiscover` records alone so Microsoft 365 email keeps working.
5. After the certificate is issued, check the old WordPress URLs (e.g. `/about-us/`,
   `/testing-commissioning/`): they redirect via `next.config.ts`. Then submit
   `https://spark-ps.com.au/sitemap.xml` in Google Search Console.
6. Keep the WordPress hosting for a few weeks in case you need to roll back.
