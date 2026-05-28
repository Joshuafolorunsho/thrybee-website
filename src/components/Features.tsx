import './Features.css'

type Feature = {
  eyebrow: string
  title: string
  body: string
  image: string
  imageAlt: string
}

const FEATURES: Feature[] = [
  {
    eyebrow: 'Intelligent matching',
    title: 'The right mentor, picked for your goals.',
    body:
      'Our matching engine pairs you based on goals, skills, interests, and experience — so every connection adds real value. Get personal recommendations from someone who already understands your journey.',
    image: '/mockup-3.jpg',
    imageAlt: 'Thrybee matching screen on iPhone',
  },
  {
    eyebrow: 'A community that compounds',
    title: 'Grow faster with the right guidance.',
    body:
      'Whether you are a student finding direction, a professional navigating a career path, or a leader giving back — Thrybee makes it easy to connect, learn, and grow together across industries.',
    image: '/mockup-2.jpg',
    imageAlt: 'Thrybee community screen on iPhone',
  },
]

export function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <header className="features__head">
          <span className="eyebrow">What you get</span>
          <h2 className="features__title">
            Mentorship, refined for the way people actually grow.
          </h2>
        </header>

        <div className="features__list">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureRow({ feature, reverse }: { feature: Feature; reverse: boolean }) {
  return (
    <article className={`feature ${reverse ? 'feature--reverse' : ''}`}>
      <div className="feature__media">
        <img src={feature.image} alt={feature.imageAlt} loading="lazy" />
      </div>
      <div className="feature__body">
        <span className="eyebrow">{feature.eyebrow}</span>
        <h3 className="feature__title">{feature.title}</h3>
        <p className="feature__copy">{feature.body}</p>
      </div>
    </article>
  )
}
