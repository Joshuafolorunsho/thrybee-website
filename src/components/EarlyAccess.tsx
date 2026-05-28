import './EarlyAccess.css'

const APPLE_URL =
  'https://expo.dev/accounts/joshuafolorunsho/projects/thrybee/builds/b2ae0f5e-7c1c-49b4-b518-b1832108b310'
const ANDROID_URL =
  'https://expo.dev/accounts/joshuafolorunsho/projects/thrybee/builds/b25a55bb-5b92-45ac-a934-c58493a95e67'

export function EarlyAccess() {
  return (
    <section className="early section" id="early-access">
      <div className="container early__inner">
        <div className="early__media">
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
            real-time chats, and goal-tracking tools — and help shape what
            ships next.
          </p>

          <div className="early__cta">
            <a href={APPLE_URL} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
              <DeviceIcon kind="apple" />
              Download for Apple
            </a>
            <a href={ANDROID_URL} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              <DeviceIcon kind="android" />
              Download for Android
            </a>
          </div>

          <p className="early__note">Your feedback will shape the platform.</p>
        </div>
      </div>
    </section>
  )
}

function DeviceIcon({ kind }: { kind: 'apple' | 'android' }) {
  const APPLE = (
    <path
      d="M16.365 1.43c0 1.14-.42 2.21-1.12 3-1.45 1.66-3.11 2.65-4.51 2.5-.18-1.46.55-3 1.36-3.86 1.05-1.13 2.67-2.04 4.27-2.13zm3.95 16.45c-1.05 1.7-2.39 3.49-4.27 3.52-1.79.03-2.34-1.04-4.39-1.04s-2.67 1-4.37 1.07c-1.83.07-3.22-1.81-4.27-3.49C.91 14.4-.41 8.3 3.46 5.27c1.22-.95 2.83-1.55 4.5-1.58 1.78-.03 3.47.99 4.37.99.9 0 2.95-1.22 4.97-1.04.85.04 3.23.34 4.76 2.59-3.91 2.27-3.27 8.21.26 9.65z"
      fill="currentColor"
    />
  )
  const ANDROID = (
    <path
      d="M17.5 9h-.6l1.6-2.8c.1-.2 0-.4-.2-.5s-.4 0-.5.2L16.2 8.8c-1.3-.6-2.7-.9-4.2-.9s-2.9.3-4.2.9L6.2 5.9c-.1-.2-.4-.3-.5-.2-.2.1-.3.4-.2.5L7 9h-.5C4.6 9 3 10.6 3 12.5V17c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-4.5C21 10.6 19.4 9 17.5 9zM8 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
      fill="currentColor"
    />
  )
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      {kind === 'apple' ? APPLE : ANDROID}
    </svg>
  )
}
