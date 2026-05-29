import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="" className="footer__mark" />
          <div>
            <p className="footer__name">Thrybee</p>
            <p className="footer__tag">Mentorship, refined.</p>
          </div>
        </div>

        <nav className="footer__links" aria-label="Footer">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:contact@thrybee.com">Contact</a>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Thrybee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
