import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const homeAnchor = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`)

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand">
          <img src="/logo.jpg" alt="" className="header__mark" />
          <span className="header__wordmark">Thrybee</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <a href={homeAnchor('features')} className="header__link">Features</a>
          <a href={homeAnchor('early-access')} className="header__link">Early Access</a>
        </nav>

        <a href={homeAnchor('early-access')} className="btn btn--primary header__cta">
          Join the beta
          <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  )
}
