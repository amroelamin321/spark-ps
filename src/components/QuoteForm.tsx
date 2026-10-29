'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { site } from '@/data/site'

type Props = {
  services: { slug: string; name: string }[]
}

type Status = 'idle' | 'sending' | 'error'

// Client-side checks mirror the server-side validation in app/api/quote/route.ts.
function fieldError(name: string, value: string) {
  const v = value.trim()
  if (name === 'name' && !v) return 'Please enter your name.'
  if (name === 'phone' && (v.match(/\d/g) ?? []).length < 8) return 'Please enter a phone number we can call.'
  return ''
}

export default function QuoteForm({ services }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [errorText, setErrorText] = useState('')
  const serviceRef = useRef<HTMLSelectElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  // Pre-select the service when arriving from a service page (/contact?service=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service')
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) {
      serviceRef.current.value = slug
    }
  }, [services])

  useEffect(() => {
    if (status === 'error') alertRef.current?.focus()
  }, [status])

  function clearCustomError(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement
    if (target.setCustomValidity) target.setCustomValidity('')
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget

    // Native `required` accepts whitespace-only values, so check the trimmed values too.
    for (const field of ['name', 'phone']) {
      const input = form.elements.namedItem(field) as HTMLInputElement
      input.setCustomValidity(fieldError(field, input.value))
    }
    if (!form.reportValidity()) return

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    setStatus('sending')
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = (await res.json().catch(() => ({}))) as { errors?: Record<string, string> }
      if (res.ok) {
        router.push('/contact/thank-you')
        return
      }
      const messages = result.errors ? Object.values(result.errors) : []
      setErrorText(messages.length ? messages.join(' ') : '')
      setStatus('error')
    } catch (err) {
      console.error('Quote form submission failed', err)
      setErrorText('')
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <form className="form" action="/api/quote" method="post" onSubmit={handleSubmit} onInput={clearCustomError}>
      <div className="field">
        <label htmlFor="qf-name">
          Name <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-name" name="name" type="text" autoComplete="name" maxLength={200} required />
      </div>

      <div className="field">
        <label htmlFor="qf-company">
          Company <span className="optional">(optional)</span>
        </label>
        <input id="qf-company" name="company" type="text" autoComplete="organization" maxLength={200} />
      </div>

      <div className="field">
        <label htmlFor="qf-phone">
          Phone <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} required />
      </div>

      <div className="field">
        <label htmlFor="qf-email">
          Email <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      </div>

      <div className="field">
        <label htmlFor="qf-service">Service</label>
        <select id="qf-service" name="service" ref={serviceRef} defaultValue="">
          <option value="">Not sure / other</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="qf-location">
          Site location <span className="optional">(optional)</span>
        </label>
        <input
          id="qf-location"
          name="siteLocation"
          type="text"
          placeholder="Suburb or town, state"
          maxLength={200}
        />
      </div>

      <div className="field form__full">
        <label htmlFor="qf-message">
          Message <span className="optional">(optional)</span>
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="Equipment, voltage, timing, shutdown windows or anything else we should know"
        />
      </div>

      {/* Spam trap: hidden from people and assistive technology, filled in only by bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="qf-website">Leave this field empty</label>
        <input id="qf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__full">
        {status === 'error' && (
          <div ref={alertRef} tabIndex={-1} className="form-status form-status--error mb-16" role="alert">
            {errorText ? `${errorText} ` : 'Sorry, your request could not be sent. '}
            Please call <a href={site.phone.href}>{site.phone.display}</a> or email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </div>
        )}
        <button className="btn btn--primary btn--block" type="submit" aria-disabled={sending}>
          <Send size={18} aria-hidden="true" />
          {sending ? 'Sending…' : 'Send quote request'}
        </button>
        <p className="form__note mt-12">
          Fields marked <span className="req">*</span> are required. Your details are sent to {site.name} so we
          can respond to your enquiry. See our <Link href="/privacy-policy">privacy policy</Link>.
        </p>
        <p className="form__note mt-12">
          For 24/7 emergency HV switching, call{' '}
          <a href={site.emergencyPhone.href}>{site.emergencyPhone.display}</a> instead of using this form.
        </p>
      </div>
    </form>
  )
}
