import Link from "next/link";

export default function UnsubscribedPage() {
  return (
    <section className="legal section">
      <div className="container legal__inner">
        <header className="legal__head">
          <span className="eyebrow">Early access</span>
          <h1 className="legal__title">You&apos;re unsubscribed.</h1>
        </header>
        <article className="legal__body">
          <p>
            We&apos;ve removed you from the Thrybee early access list. You
            won&apos;t hear from us again about the beta.
          </p>
          <p>
            Change your mind? You can sign up again any time from the{" "}
            <Link href="/#early-access">home page</Link>.
          </p>
        </article>
      </div>
    </section>
  );
}
