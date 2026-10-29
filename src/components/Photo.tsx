import Image from 'next/image'
import { Camera } from 'lucide-react'

type Props = {
  alt: string
  src?: string
  ratio?: string
  sizes?: string
  eager?: boolean
}

// Renders the client's photo when `src` is set. Until then, shows a clearly
// labelled placeholder describing the photo that is needed.
// To add a photo: put the file in /public/photos/ and set `src` in the data file.
export default function Photo({ alt, src, ratio = '4 / 3', sizes = '(min-width: 900px) 50vw, 100vw', eager }: Props) {
  if (src) {
    return (
      <div className="photo" style={{ aspectRatio: ratio, position: 'relative' }}>
        <Image src={src} alt={alt} fill sizes={sizes} loading={eager ? 'eager' : 'lazy'} />
      </div>
    )
  }

  return (
    <div className="photo-ph" style={{ aspectRatio: ratio }} role="img" aria-label={`Photo placeholder: ${alt}`}>
      <Camera size={28} aria-hidden="true" />
      <span className="photo-ph__tag" aria-hidden="true">
        Photo placeholder
      </span>
      <span className="photo-ph__label" aria-hidden="true">
        {alt}
      </span>
      <span className="photo-ph__note" aria-hidden="true">
        [TODO: client to supply photo]
      </span>
    </div>
  )
}
