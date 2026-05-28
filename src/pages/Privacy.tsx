import { LegalPage } from '../components/LegalPage'
import html from './privacy.html?raw'

export function Privacy() {
  return <LegalPage title="Privacy Policy" updated="May 28, 2026" html={html} />
}
