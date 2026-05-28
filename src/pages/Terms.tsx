import { LegalPage } from '../components/LegalPage'
import html from './terms.html?raw'

export function Terms() {
  return <LegalPage title="Terms & Conditions" updated="May 28, 2026" html={html} />
}
