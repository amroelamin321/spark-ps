import type { LucideIcon } from 'lucide-react'
import { Server, Pickaxe, Sun, Factory, Droplets, TrainFront } from 'lucide-react'
import type { ServiceSlug } from './services'

export type IndustrySlug =
  | 'data-centres'
  | 'mining'
  | 'renewable-energy'
  | 'commercial-and-industrial'
  | 'water-and-utilities'
  | 'airports-and-railways'

export type Industry = {
  slug: IndustrySlug
  name: string
  icon: LucideIcon
  summary: string
  description: string
  services: ServiceSlug[]
}

export const industries: Industry[] = [
  {
    slug: 'data-centres',
    name: 'Data Centres',
    icon: Server,
    summary: 'Commissioning and protection for switchrooms that cannot afford downtime.',
    description:
      'Data centres depend on reliable HV supply, switchgear and protection, and cannot afford unplanned outages. Commissioning has to be thorough and documented, and is usually coordinated with many other contractors working in the same switchroom.',
    services: ['testing-and-commissioning', 'high-voltage-switching', 'maintenance-and-support', 'thermographic-imaging'],
  },
  {
    slug: 'mining',
    name: 'Mining',
    icon: Pickaxe,
    summary: 'Private HV networks supplying heavy plant, often in remote locations.',
    description:
      'Mine sites run private HV networks that supply heavy plant, often in remote locations. Reliable protection, sound earthing and planned maintenance are essential for both safety and production.',
    services: ['testing-and-commissioning', 'high-voltage-design', 'high-voltage-switching', 'earth-testing', 'maintenance-and-support'],
  },
  {
    slug: 'renewable-energy',
    name: 'Renewable Energy',
    icon: Sun,
    summary: 'HV connections, protection and earthing for solar, battery and off-grid sites.',
    description:
      'Solar farms, battery storage and off-grid sites need HV connections, protection and earthing that are designed, tested and commissioned correctly before energisation.',
    services: ['testing-and-commissioning', 'high-voltage-design', 'earth-testing', 'high-voltage-switching'],
  },
  {
    slug: 'commercial-and-industrial',
    name: 'Commercial & Industrial',
    icon: Factory,
    summary: 'Factories, hospitals and commercial buildings with their own HV equipment.',
    description:
      'Factories, hospitals, commercial buildings and heavy industry with their own HV equipment need switching, maintenance and upgrades carried out safely and with minimal disruption to operations.',
    services: ['high-voltage-switching', 'maintenance-and-support', 'testing-and-commissioning', 'thermographic-imaging'],
  },
  {
    slug: 'water-and-utilities',
    name: 'Water & Utilities',
    icon: Droplets,
    summary: 'Critical HV assets at water plants and utility sites that must stay in service.',
    description:
      'Water and wastewater plants and utility sites run critical HV equipment that has to stay in service. Planned maintenance, testing and safe switching keep these assets reliable.',
    services: ['maintenance-and-support', 'high-voltage-switching', 'earth-testing', 'thermographic-imaging'],
  },
  {
    slug: 'airports-and-railways',
    name: 'Airports & Railways',
    icon: TrainFront,
    summary: 'HV distribution for transport infrastructure with tight access windows.',
    description:
      'Airports and railways rely on HV distribution for critical operations, and work often has to be planned around tight access and shutdown windows.',
    services: ['testing-and-commissioning', 'high-voltage-switching', 'maintenance-and-support', 'high-voltage-design'],
  },
]
