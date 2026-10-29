import { services } from '@/data/services'

// Quote requests are forwarded server-side to the client's n8n workflow, so the webhook URL
// is never shipped to the browser. Set QUOTE_WEBHOOK_URL (and optionally QUOTE_WEBHOOK_SECRET,
// sent as the X-Webhook-Secret header for n8n Header Auth) in the Vercel project settings.
// The fallback is the webhook the previous site used.
const WEBHOOK_URL =
  process.env.QUOTE_WEBHOOK_URL ||
  'https://vertx-n8n-host102938.up.railway.app/webhook/0db02aed-fcd9-43d3-ab01-bd41cfd50bbb'

const LIMITS = {
  name: 200,
  company: 200,
  phone: 40,
  email: 254,
  service: 100,
  siteLocation: 200,
  message: 5000,
} as const

type Field = keyof typeof LIMITS
type Fields = Record<Field, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateQuote(f: Fields) {
  const errors: Partial<Record<Field, string>> = {}
  if (!f.name) errors.name = 'Please enter your name.'
  if ((f.phone.match(/\d/g) ?? []).length < 8) errors.phone = 'Please enter a phone number we can call.'
  if (!EMAIL_RE.test(f.email)) errors.email = 'Please enter a valid email address.'
  if (f.service && !services.some((s) => s.slug === f.service)) errors.service = 'Please choose a service from the list.'
  for (const key of Object.keys(LIMITS) as Field[]) {
    if (f[key].length > LIMITS[key]) errors[key] = 'This entry is too long.'
  }
  return errors
}

async function readBody(request: Request) {
  const type = request.headers.get('content-type') ?? ''
  if (type.includes('application/json')) {
    const json = (await request.json().catch(() => ({}))) as Record<string, unknown>
    return { isForm: false, get: (k: string) => (typeof json[k] === 'string' ? (json[k] as string) : '') }
  }
  const form = await request.formData().catch(() => new FormData())
  return { isForm: true, get: (k: string) => String(form.get(k) ?? '') }
}

export async function POST(request: Request) {
  const body = await readBody(request)
  const fields = Object.fromEntries(
    (Object.keys(LIMITS) as Field[]).map((k) => [k, body.get(k).trim()]),
  ) as Fields

  // Plain HTML form posts (no JavaScript) get redirected to a result page.
  const respond = (ok: boolean, status = 200, errors?: object) =>
    body.isForm
      ? Response.redirect(new URL(ok ? '/contact/thank-you' : '/contact/not-sent', request.url), 303)
      : Response.json({ ok, errors }, { status })

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (body.get('website')) return respond(true)

  const errors = validateQuote(fields)
  if (Object.keys(errors).length) return respond(false, 400, errors)

  const serviceName = services.find((s) => s.slug === fields.service)?.name ?? 'Not sure / other'
  const [firstName, ...rest] = fields.name.split(/\s+/)

  const payload = {
    source: 'quote-form',
    name: fields.name,
    company: fields.company,
    phone: fields.phone,
    email: fields.email,
    service: serviceName,
    siteLocation: fields.siteLocation,
    message: fields.message,
    // Field names used by the previous site's form, kept so the existing n8n workflow keeps working.
    firstName,
    lastName: rest.join(' '),
    companyName: fields.company,
    projectDetails: `Service: ${serviceName}\nSite location: ${fields.siteLocation || '-'}\n\n${fields.message}`,
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.QUOTE_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.QUOTE_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
  } catch (err) {
    console.error('Quote webhook failed', err)
    return respond(false, 502)
  }

  return respond(true)
}
