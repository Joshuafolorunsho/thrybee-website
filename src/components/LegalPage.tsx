import { useEffect } from 'react'
import './LegalPage.css'

type Props = {
  title: string
  updated: string
  html: string
}

export function LegalPage({ title, updated, html }: Props) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} — Thrybee`
    window.scrollTo({ top: 0 })
    return () => {
      document.title = previous
    }
  }, [title])

  const body = stripBoilerplate(html)

  return (
    <section className="legal section">
      <div className="container legal__inner">
        <header className="legal__head">
          <span className="eyebrow">Legal</span>
          <h1 className="legal__title">{title}</h1>
          <p className="legal__updated">Last updated {updated}</p>
        </header>

        <article className="legal__body" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </section>
  )
}

function stripBoilerplate(html: string) {
  const start = html.indexOf('<body>')
  const end = html.indexOf('</body>')
  const inner = start >= 0 && end >= 0 ? html.slice(start + 6, end) : html
  return inner.replace(/<hr>[\s\S]*$/i, '').trim()
}
