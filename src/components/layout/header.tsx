import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="" className="header__mark" />
          <span className="header__wordmark">Thrybee</span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <Link href="/#features" className="header__link">
            Features
          </Link>
          <Link href="/#early-access" className="header__link">
            Early Access
          </Link>
        </nav>

        <Link href="/#early-access" className="btn btn--primary header__cta">
          Join the beta
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </header>
  );
}
