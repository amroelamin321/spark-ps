import type { ServiceSlug } from './services'
import type { IndustrySlug } from './industries'

export type Project = {
  slug: string
  title: string
  location: string
  industry: IndustrySlug
  services: ServiceSlug[]
  summary: string
  overview: string
  scope: string[]
  outcome: string
  metaDescription: string
  photo: { alt: string; src?: string }
}

export const projects: Project[] = [
  {
    slug: 'premier-data-centre-melbourne',
    title: 'Premier Data Centre',
    location: 'Melbourne, VIC',
    industry: 'data-centres',
    services: ['testing-and-commissioning'],
    summary:
      'Commissioning of 30 switchgears with Schneider and SEL protection relays, VTs, CTs and battery systems.',
    overview:
      'As part of a major data centre project, SPS commissioned a complex network of 30 switchgears, including an extensive protection system equipped with Schneider and SEL relays, while coordinating with multiple subcontractors in the switchroom.',
    scope: [
      'Commissioning of 30 switchgears',
      'Protection system commissioning with Schneider and SEL protection relays',
      'Integration and testing of voltage transformers (VTs) and current transformers (CTs)',
      'Commissioning of battery systems',
      'Coordination with multiple subcontractors in the switchroom',
      'Management of client documentation',
    ],
    outcome:
      'Switchgear and protection systems commissioned for the data centre, with client documentation managed throughout.',
    metaDescription:
      'Case study: SPS commissioned 30 switchgears with Schneider and SEL protection relays, VTs, CTs and battery systems at a premier data centre in Melbourne, VIC.',
    photo: { alt: 'Data centre switchroom in Melbourne commissioned by SPS' },
  },
  {
    slug: 'lng-facility-protection-relay-retrofit-darwin',
    title: 'Critical Retrofit at a Major LNG Facility',
    location: 'Darwin, NT',
    industry: 'commercial-and-industrial',
    services: ['testing-and-commissioning'],
    summary:
      'Replacement, programming, testing and commissioning of protection relays at a major LNG facility.',
    overview:
      'SPS was engaged to deliver a critical retrofit at a major LNG facility, replacing outdated protection relays with modern systems to improve the facility’s operational safety and efficiency.',
    scope: [
      'Replacement of outdated protection relays',
      'Programming of the new protection relays',
      'Testing and commissioning of the new relays',
      'Integration into the facility’s existing network',
    ],
    outcome:
      'Outdated protection relays replaced with modern systems and integrated into the facility’s network.',
    metaDescription:
      'Case study: SPS replaced, programmed, tested and commissioned protection relays during a critical retrofit at a major LNG facility in Darwin, NT.',
    photo: { alt: 'Protection relay panel at the Darwin LNG facility retrofit' },
  },
  {
    slug: 'steel-manufacturer-hv-switchboard-upgrade-port-kembla',
    title: 'HV Switchboard Upgrade for a Leading Steel Manufacturer',
    location: 'Port Kembla, NSW',
    industry: 'commercial-and-industrial',
    services: ['testing-and-commissioning'],
    summary:
      'Testing and commissioning of a 35-panel 6.6kV switchboard replacing early-1990s Westinghouse switchgear.',
    overview:
      'SPS provided testing and commissioning for an upgraded 35-panel 6.6kV switchboard at a leading steel manufacturer’s Blower Station, replacing early-1990s Westinghouse switchgear.',
    scope: [
      'Testing and commissioning of the new 35-panel 6.6kV switchboard',
      'Replacement of early-1990s Westinghouse switchgear',
      'Testing of critical substation components under strict safety protocols',
    ],
    outcome:
      'Early-1990s switchgear replaced with a new 35-panel 6.6kV switchboard, reducing manual handling risks and improving reliability.',
    metaDescription:
      'Case study: SPS tested and commissioned a 35-panel 6.6kV switchboard replacing early-1990s Westinghouse switchgear for a leading steel manufacturer at Port Kembla, NSW.',
    photo: { alt: '35-panel 6.6kV switchboard at the Port Kembla steelworks' },
  },
  {
    slug: 'off-grid-poultry-farm-griffith',
    title: 'Largest Off-Grid Poultry Farm in Australia',
    location: 'Griffith, NSW',
    industry: 'renewable-energy',
    services: ['testing-and-commissioning', 'earth-testing'],
    summary:
      '11kV private distribution network with 4.5km of overhead lines, switchgear, transformers, earthing, battery systems and substations.',
    overview:
      'SPS delivered testing and commissioning for the 11kV private distribution network at the largest off-grid poultry farm in Australia, covering overhead lines, protection, switchgear, transformers, earthing, battery systems and substations.',
    scope: [
      '11kV private distribution network',
      '4.5km of overhead lines and their protection',
      'HV switchgear and transformers',
      'Earthing systems',
      'Battery systems',
      'Substations',
    ],
    outcome:
      'The farm’s 11kV private distribution network tested and commissioned to support off-grid operation of the facility.',
    metaDescription:
      'Case study: SPS testing and commissioning of an 11kV private distribution network with 4.5km of overhead lines, substations and battery systems at an off-grid poultry farm in Griffith, NSW.',
    photo: { alt: 'Overhead 11kV lines and substation at the Griffith off-grid poultry farm' },
  },
]

export const featuredProjectSlugs = [
  'premier-data-centre-melbourne',
  'steel-manufacturer-hv-switchboard-upgrade-port-kembla',
  'off-grid-poultry-farm-griffith',
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
