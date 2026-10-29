import { PhoneCall } from 'lucide-react'
import { site } from '@/data/site'

export default function EmergencyButton() {
  return (
    <a className="emergency" href={site.emergencyPhone.href}>
      <span className="emergency__icon">
        <PhoneCall size={18} aria-hidden="true" />
      </span>
      <span className="emergency__text">
        <span className="emergency__label">24/7 Emergency HV Switching</span>
        <span className="emergency__phone">Call {site.emergencyPhone.display}</span>
      </span>
    </a>
  )
}
