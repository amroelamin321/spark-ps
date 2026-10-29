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
  // From the ABN Lookup register (active, business name "Spark Professional Services")
  // and the client's previous website.
  abn: '40 656 274 501',
  yearsExperience: 15,
} as const

export const addressLine = `${site.address.street}, ${site.address.locality} ${site.address.region} ${site.address.postcode}`

export const mapsQuery = encodeURIComponent(`${addressLine}, ${site.address.country}`)
