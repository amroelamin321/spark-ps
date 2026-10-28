'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { QUOTE_WEBHOOK_URL, site } from '@/data/site'

type Props = {
  services: { slug: string; name: string }[]
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function QuoteForm({ services }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const serviceRef = useRef<HTMLSelectElement>(null)

  // Pre-select the service when arriving from a service page (/contact?service=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('service')
    if (slug && serviceRef.current && services.some((s) => s.slug === slug)) {
      serviceRef.current.value = slug
    }
  }, [services])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (key: string) => String(data.get(key) ?? '').trim()

    const name = get('name')
    const serviceSlug = get('service')
    const serviceName = services.find((s) => s.slug === serviceSlug)?.name ?? 'Not sure / other'
    const siteLocation = get('siteLocation')
    const message = get('message')
    const [firstName, ...rest] = name.split(/\s+/)

    const payload = {
      source: 'quote-form',
      name,
      company: get('company'),
      phone: get('phone'),
      email: get('email'),
      service: serviceName,
      siteLocation,
      message,
      // Field names used by the previous site's form, kept so the existing n8n workflow keeps working.
      firstName,
      lastName: rest.join(' '),
      companyName: get('company'),
      projectDetails: `Service: ${serviceName}\nSite location: ${siteLocation || '-'}\n\n${message}`,
    }

    setStatus('sending')
    try {
      const res = await fetch(QUOTE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch (err) {
      console.error('Quote form submission failed', err)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-status form-status--success" role="status">
        <p>
          <strong>Thank you, your request has been sent.</strong> Our team will be in touch.
        </p>
        <p>
          For urgent work, call <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="qf-name">
          Name <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="qf-company">
          Company <span className="optional">(optional)</span>
        </label>
        <input id="qf-company" name="company" type="text" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="qf-phone">
          Phone <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required />
      </div>

      <div className="field">
        <label htmlFor="qf-email">
          Email <span className="req" aria-hidden="true">*</span>
        </label>
        <input id="qf-email" name="email" type="email" autoComplete="email" required />
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
        <input id="qf-location" name="siteLocation" type="text" placeholder="Suburb or town, state" />
      </div>

      <div className="field form__full">
        <label htmlFor="qf-message">
          Message <span className="optional">(optional)</span>
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={5}
          placeholder="Equipment, voltage, timing, shutdown windows or anything else we should know"
        />
      </div>

      <div className="form__full">
        {status === 'error' && (
          <div className="form-status form-status--error mb-16" role="alert">
            Sorry, your request could not be sent. Please call{' '}
            <a href={site.phone.href}>{site.phone.display}</a> or email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </div>
        )}
        <button className="btn btn--primary btn--block" type="submit" disabled={status === 'sending'}>
          <Send size={18} aria-hidden="true" />
          {status === 'sending' ? 'Sending…' : 'Send quote request'}
        </button>
        <p className="form__note mt-12">
          Fields marked <span className="req">*</span> are required. For 24/7 emergency HV switching, call{' '}
          <a href={site.emergencyPhone.href}>{site.emergencyPhone.display}</a> instead of using this form.
        </p>
      </div>
    </form>
  )
}
