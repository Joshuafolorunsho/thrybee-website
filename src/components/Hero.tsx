import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <span className="eyebrow">A trusted community of mentors and mentees</span>

        <h1 className="hero__title">
          Build <em>lasting</em> professional
          <br />
          relationships.
        </h1>

        <p className="hero__lede">
          Thrybee pairs ambitious learners with experienced mentors through
          intelligent matching, so every connection adds real value.
        </p>

        <div className="hero__actions">
          <a href="#early-access" className="btn btn--primary">
            Get early access
            <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a href="#features" className="btn btn--ghost">
            See how it works
          </a>
        </div>
      </div>
    </section>
  )
}
