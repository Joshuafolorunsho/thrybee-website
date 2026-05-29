import { EarlyAccessForm } from "./early-access-form";

export function EarlyAccess() {
  return (
    <section className="early section" id="early-access">
      <div className="container early__inner">
        <div className="early__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mockup-1.png" alt="Thrybee app on iPhone" loading="lazy" />
        </div>

        <div className="early__body">
          <span className="eyebrow">Early access</span>
          <h2 className="early__title">
            Be among the first to experience the future of mentorship.
          </h2>
          <p className="early__copy">
            We are inviting passionate learners and mentors into our early
            testing community. Get first access to personalized matching,
            real-time chats, and goal-tracking tools — and help shape what ships
            next.
          </p>

          <EarlyAccessForm />
        </div>
      </div>
    </section>
  );
}
