// Company details used across the site. Edit here, not in individual pages.
export const site = {
  name: 'Spark Professional Services',
  shortName: 'SPS',
  url: 'https://spark-ps.com.au',
  tagline: 'High & low voltage electrical engineering',
  phone: {
    display: '1300 425 498',
    href: 'tel:1300425498',
    international: '+61 1300 425 498',
  },
  // TODO: client to confirm whether 24/7 emergency HV switching calls go to the
  // main 1300 number or to a separate after-hours number.
  emergencyPhone: {
    display: '1300 425 498',
    href: 'tel:1300425498',
  },
  email: 'info@spark-ps.com.au',
  address: {
    street: 'H1/5-7 Hepher Rd',
    locality: 'Campbelltown',
    region: 'NSW',
    postcode: '2560',
    country: 'Australia',
    countryCode: 'AU',
  },
  linkedin: 'https://www.linkedin.com/company/spark-professional-services-sps/',
  yearsExperience: 15,
} as const

export const addressLine = `${site.address.street}, ${site.address.locality} ${site.address.region} ${site.address.postcode}`

export const mapsQuery = encodeURIComponent(`${addressLine}, ${site.address.country}`)

// Quote form submissions are posted here (same n8n webhook as the previous site).
export const QUOTE_WEBHOOK_URL =
  'https://vertx-n8n-host102938.up.railway.app/webhook/0db02aed-fcd9-43d3-ab01-bd41cfd50bbb'
