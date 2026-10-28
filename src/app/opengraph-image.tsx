import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from '@/data/site'

export const alt = `${site.name}: high and low voltage electrical engineering`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Plain branded share card (no photography) used when pages are shared on LinkedIn etc.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo/spark-logo.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          borderLeft: '24px solid #F05A00',
          padding: '72px 80px',
        }}
      >
        <img src={logoSrc} width={440} height={100} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 60, fontWeight: 700, color: '#0F1B2D', lineHeight: 1.15 }}>
            High &amp; low voltage electrical engineering
          </div>
          <div style={{ fontSize: 30, color: '#4B5563', marginTop: 24 }}>
            Testing &amp; commissioning · HV design · HV switching · Maintenance · Earth testing ·
            Thermography
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: '#0F1B2D' }}>
          {site.phone.display} · {site.address.locality} {site.address.region}
        </div>
      </div>
    ),
    size,
  )
}
