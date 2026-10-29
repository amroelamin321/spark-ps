import Image from 'next/image'
import { clientLogos, testimonials } from '@/data/testimonials'

export function TestimonialGrid() {
  return (
    <div className="grid grid--2">
      {testimonials.map((t) => (
        <figure key={t.name} className="testimonial">
          <blockquote>
            <p>&ldquo;{t.quote}&rdquo;</p>
          </blockquote>
          <figcaption>
            <span className="testimonial__name">{t.name}</span>
            <span className="testimonial__company">{t.company}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ClientLogos({ label = 'Selected clients' }: { label?: string }) {
  return (
    <div className="logo-strip">
      <p className="logo-strip__label">{label}</p>
      <ul>
        {clientLogos.map((logo) => (
          <li key={logo.name}>
            <Image src={logo.src} alt={`${logo.name} logo`} width={logo.width} height={logo.height} />
          </li>
        ))}
      </ul>
    </div>
  )
}
