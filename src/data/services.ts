import type { LucideIcon } from 'lucide-react'
import { ClipboardCheck, DraftingCompass, Power, Wrench, Earth, Thermometer } from 'lucide-react'

export type ServiceSlug =
  | 'testing-and-commissioning'
  | 'high-voltage-design'
  | 'high-voltage-switching'
  | 'maintenance-and-support'
  | 'earth-testing'
  | 'thermographic-imaging'

export type Service = {
  slug: ServiceSlug
  name: string
  icon: LucideIcon
  summary: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  whenNeeded: string[]
  included: string[]
  relatedProjects: string[]
  photo: { alt: string; src?: string }
  emergency?: boolean
}

export const services: Service[] = [
  {
    slug: 'testing-and-commissioning',
    name: 'Testing & Commissioning',
    icon: ClipboardCheck,
    summary:
      'Testing and commissioning of HV and LV equipment, from power transformers to protection relays, documented at handover.',
    metaTitle: 'HV Testing & Commissioning | NSW & Australia',
    metaDescription:
      'High voltage testing and commissioning of switchgear, transformers, protection relays, VTs, CTs and battery systems, with detailed test reports. Call 1300 425 498.',
    intro: [
      'Testing and commissioning confirms that new, upgraded or modified electrical equipment has been installed correctly and performs as designed before it is energised and put into service.',
      'SPS carries out testing and adjustment on equipment ranging from power transformers to protection relays. Each project is accompanied by a detailed report on system performance, integrity and compliance with electrical and safety standards.',
    ],
    whenNeeded: [
      'Before energising a new installation, substation or switchroom',
      'After switchgear, transformers or protection relays are replaced or upgraded',
      'When battery systems are added or a private HV network is extended',
      'When the principal contractor or asset owner needs documented test results before handover',
    ],
    included: [
      'Switchgear testing and commissioning',
      'Protection relay programming, testing and commissioning, including Schneider and SEL relays',
      'Power transformer testing',
      'Voltage transformer (VT) and current transformer (CT) testing',
      'Battery system commissioning',
      'Coordination with other subcontractors on site',
      'Detailed test reports and handover documentation',
    ],
    relatedProjects: ['premier-data-centre-melbourne', 'lng-facility-protection-relay-retrofit-darwin'],
    photo: { alt: 'SPS engineer testing protection relays inside an HV switchroom' },
  },
  {
    slug: 'high-voltage-design',
    name: 'High Voltage Design',
    icon: DraftingCompass,
    summary:
      'Design of primary and secondary HV systems for new connections, upgrades and private networks.',
    metaTitle: 'High Voltage Design | NSW & Australia',
    metaDescription:
      'High voltage electrical design for primary and secondary systems, substations and private HV networks, by engineers based in Campbelltown NSW. Call 1300 425 498.',
    intro: [
      'High voltage design covers the engineering of the primary (power) and secondary (protection, control and metering) systems that make up a substation or private HV network.',
      'SPS engineers design primary and secondary systems for new connections and for upgrades of existing infrastructure. Each design is developed in consultation with the client and built around the site’s current and future needs.',
    ],
    whenNeeded: [
      'Planning a new HV connection, substation or private distribution network',
      'Upgrading or replacing ageing switchgear and protection',
      'Increasing site load capacity or adding new plant',
      'Connecting battery systems or generation to an existing network',
    ],
    included: [
      'Primary substation and switchroom layout design',
      'Secondary systems design (protection, control and metering)',
      'Power system studies, such as load flow and protection studies',
      'Design documentation and drawings',
    ],
    relatedProjects: [],
    photo: { alt: 'SPS engineer reviewing HV single-line diagrams and design drawings' },
  },
  {
    slug: 'high-voltage-switching',
    name: 'High Voltage Switching Services',
    icon: Power,
    summary:
      'Planned and emergency HV switching by trained operators, including 24/7 emergency response.',
    metaTitle: 'High Voltage Switching Services | NSW & Australia',
    metaDescription:
      'Planned and 24/7 emergency high voltage switching for private HV networks, substations and switchrooms, carried out by trained professionals. Call 1300 425 498.',
    intro: [
      'High voltage switching is the controlled operation of HV switchgear to isolate, earth and restore parts of an electrical network so that work can be carried out safely.',
      'SPS provides safe and controlled HV switching performed by trained professionals, both for planned work and for emergencies, with a 24/7 emergency response line.',
    ],
    whenNeeded: [
      'Planned shutdowns for maintenance, upgrades or new connections',
      'Isolating equipment so contractors can work on or near HV assets',
      'Faults, outages or equipment failures that need an urgent response',
      'Restoring supply once work is complete',
    ],
    included: [
      'Planned HV switching and isolation',
      '24/7 emergency switching response',
      'Isolation and earthing arrangements for work on HV equipment',
      'Restoration of supply after work',
    ],
    relatedProjects: [],
    photo: { alt: 'SPS switching operator in arc-rated PPE operating HV switchgear' },
    emergency: true,
  },
  {
    slug: 'maintenance-and-support',
    name: 'Maintenance & Support Services',
    icon: Wrench,
    summary:
      'Preventative maintenance and fault support to keep HV assets reliable and in service.',
    metaTitle: 'HV Maintenance & Support Services | NSW & Australia',
    metaDescription:
      'Preventative maintenance, inspection and fault-finding for high voltage switchgear, transformers and substations, tailored to your site. Call 1300 425 498.',
    intro: [
      'Electrical systems need regular attention to stay safe and reliable. Maintenance and support services keep HV assets in good condition and help find problems before they cause an outage.',
      'SPS provides thorough maintenance and support tailored to each site’s equipment and operating needs, with the aim of maximum uptime and reliability.',
    ],
    whenNeeded: [
      'Your site owns HV switchgear, transformers or substations and needs a maintenance program',
      'Equipment is ageing or maintenance records are incomplete',
      'You have recurring faults, nuisance tripping or unexplained outages',
      'Insurers, auditors or internal policies require evidence of maintenance',
    ],
    included: [
      'Preventative maintenance programs',
      'Inspection and testing of HV switchgear and transformers',
      'Troubleshooting and fault-finding',
      'Maintenance reports and recommendations',
    ],
    relatedProjects: [],
    photo: { alt: 'SPS technicians carrying out maintenance on an HV switchboard' },
  },
  {
    slug: 'earth-testing',
    name: 'Earth Testing',
    icon: Earth,
    summary:
      'Evaluation of HV earthing systems that goes beyond basic in-service resistance checks.',
    metaTitle: 'Earth Testing for HV Sites | NSW & Australia',
    metaDescription:
      'Earth testing for high voltage substations and distribution networks, including soil resistivity and step and touch potential testing. Call 1300 425 498.',
    intro: [
      'A compliant earth system is essential for the safe operation of high voltage distribution. If a fault occurs, the earthing system must carry fault current safely and keep the voltages people could touch within safe limits.',
      'SPS goes beyond basic “in service” resistance measurements to deliver comprehensive evaluations of earthing systems.',
    ],
    whenNeeded: [
      'Commissioning a new substation, switchroom or HV installation',
      'After changes to the network, plant or site layout',
      'Periodic checks of existing earthing systems',
      'After a fault, lightning strike or damage to earthing conductors',
    ],
    included: [
      'Soil resistivity testing',
      'Earth resistance testing',
      'Step and touch potential testing',
      'Compliance verification and reporting',
    ],
    relatedProjects: ['off-grid-poultry-farm-griffith'],
    photo: { alt: 'SPS engineer carrying out earth testing at an outdoor substation' },
  },
  {
    slug: 'thermographic-imaging',
    name: 'Thermographic Imaging',
    icon: Thermometer,
    summary:
      'Infra-red scanning of switchgear and cabling to find hot spots before they become failures.',
    metaTitle: 'Thermographic Imaging for Switchgear | NSW & Australia',
    metaDescription:
      'Infra-red thermographic imaging of switchgear, cabling, connections and fuses to find hot spots and developing faults early. Call 1300 425 498.',
    intro: [
      'Infra-red (thermographic) imaging scans electrical switchgear and cabling for excess heat. Thermal images give an instant indication of all manner of potential problems in connectors, switches and fuses.',
      'Because the scan is taken while equipment is in service, developing faults can be found without a shutdown and repairs can be planned.',
    ],
    whenNeeded: [
      'As part of a preventative maintenance program',
      'Before a planned shutdown, to target repair work',
      'When equipment is running hot, discoloured or tripping',
      'When insurers or asset owners ask for a thermal survey',
    ],
    included: [
      'Infra-red scanning of switchgear, cabling, connections and fuses',
      'Identification of hot spots and potential faults',
      'Thermal images with findings and recommendations',
    ],
    relatedProjects: [],
    photo: { alt: 'Thermal image of switchgear connections taken by SPS during a scan' },
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
