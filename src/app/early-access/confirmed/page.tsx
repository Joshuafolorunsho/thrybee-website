import Link from "next/link";

type Props = {
  searchParams: Promise<{ reason?: string }>;
};

const MESSAGES: Record<string, { title: string; copy: string }> = {
  expired: {
    title: "This link has expired.",
    copy: "Your confirmation link is no longer valid. You can request a fresh one by signing up again.",
  },
  invalid: {
    title: "Invalid confirmation link.",
    copy: "We couldn't read this link. Try signing up again to receive a new one.",
  },
  error: {
    title: "Something went wrong.",
    copy: "We hit a snag confirming your email. Please try again in a minute.",
  },
};

export default async function ConfirmedPage({ searchParams }: Props) {
  const { reason } = await searchParams;
  const fallback = {
    title: "You're confirmed.",
    copy: "Thanks for confirming your email. We'll be in touch the moment your Thrybee early access is ready.",
  };
  const { title, copy } = (reason && MESSAGES[reason]) || fallback;

  return (
    <section className="legal section">
      <div className="container legal__inner">
        <header className="legal__head">
          <span className="eyebrow">Early access</span>
          <h1 className="legal__title">{title}</h1>
        </header>
        <article className="legal__body">
          <p>{copy}</p>
          <p>
            <Link href="/">← Back home</Link>
          </p>
        </article>
      </div>
    </section>
  );
}
