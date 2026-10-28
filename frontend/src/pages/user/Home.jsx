// Home page — fully static: no hooks, no .map(), no helper functions.
// Every section, icon, image and text is written out directly in JSX.
import "../../styles/home.css";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main>
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="container">
            <div className="hero-copy">
              <span className="eyebrow">Altiora Business Advisory</span>
              <h1>
                Elevating Potential.<br /><em>Delivering Excellence.</em>
              </h1>
              <p className="lede">
                At Altiora Business Advisory, we believe that meaningful growth begins with the
                right knowledge, skills, and direction.
              </p>

              <div className="hero-actions">
                <a className="btn btn-gold" href="/services">
                  Explore Our Services
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a className="btn btn-outline-dark" href="#">Talk to Our Team</a>
              </div>
            </div>

            <div className="hero-visual">
              <span className="thin-line thin-line-a"></span>
              <span className="thin-line thin-line-b"></span>
              <div className="hero-slider">
                <div className="hero-slide is-active">
                  <img src="/assets/images/photo-team-meeting.jpg" alt="A team collaborating around a table in a bright meeting room" />
                </div>
                <div className="hero-slider-dots">
                  <button type="button" aria-label="Show image 1" className="is-active"></button>
                  <button type="button" aria-label="Show image 2"></button>
                  <button type="button" aria-label="Show image 3"></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ VALUE STRIP ============ */}
        <div className="value-strip">
          <div className="container">
            <div className="value-grid">
              <div className="value-item">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="9" cy="8" r="3" />
                    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
                    <circle cx="17" cy="8.5" r="2.4" />
                    <path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" />
                  </svg>
                </div>
                <div>
                  <h4>People Focussed</h4>
                  <p>Developing talent and strengthening capabilities.</p>
                </div>
              </div>

              <div className="value-item">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h4>Custom Solutions</h4>
                  <p>Tailored programs aligned to your business goals.</p>
                </div>
              </div>

              <div className="value-item">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="9" r="5.5" />
                    <path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
                  </svg>
                </div>
                <div>
                  <h4>Practical &amp; Impactful</h4>
                  <p>Real-world learning for measurable results.</p>
                </div>
              </div>

              <div className="value-item">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
                    <path d="m10 11 3.3-3.2a2.3 2.3 0 0 1 3.2 3.3" />
                  </svg>
                </div>
                <div>
                  <h4>Trust &amp; Partnership</h4>
                  <p>Building long-term relationships you can rely on.</p>
                </div>
              </div>

              <div className="value-item">
                <div className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3.5 18.5 9 12l4 3 7.5-8.5" />
                    <path d="M15.5 6.5H20.5V11.5" />
                  </svg>
                </div>
                <div>
                  <h4>Driving Growth</h4>
                  <p>Empowering organizations to achieve excellence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ ABOUT ============ */}
        <section id="about" className="section-white">
          <div className="container">
            <div className="grid-2">
              <div className="photo-frame about-photo">
                <img src="/assets/images/photo-team-whiteboard.jpg" alt="A team discussing a plan around a table and whiteboard" />
              </div>
              <div>
                <span className="eyebrow">Who We Are</span>
                <h2 className="mt-14">About Altiora</h2>
                <p className="lede mt-18">
                  We provide tailored learning and development solutions, professional development
                  programs, organizational capability support, and career guidance designed to help
                  individuals and organizations grow, perform, and succeed.
                </p>
                <p className="body-text">
                  From strengthening workforce capabilities to supporting individual career journeys,
                  our approach is focused on creating meaningful learning experiences that translate
                  into real-world value.
                </p>
                <a className="btn btn-outline-light mt-28" href="/about">
                  More About Us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" className="section-off">
          <div className="container">
            <div className="section-head services-head">
              <div>
                <span className="eyebrow">What We Do</span>
                <h2>Solutions Designed to Develop People and Strengthen Performance</h2>
                <p>At Altiora, we turn development needs into focused, practical solutions.</p>
              </div>
              <div className="slider-controls">
                <button type="button" className="slider-arrow" aria-label="Previous services" disabled>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
                </button>
                <button type="button" className="slider-arrow" aria-label="Next services">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </div>
            </div>

            <div className="slider-viewport">
              <div className="slider-track">
                {/* Card 1 */}
                <div className="service-card-img">
                  <div className="card-media">
                    <div className="media-inner">
                      <img src="/assets/images/service-corporate-training.webp" alt="Corporate Training & Learning and Development" />
                    </div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                      </svg>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Corporate Training &amp; Learning and Development</h3>
                    <p className="card-text">
                      We support organizations in developing the capabilities required for stronger
                      individual, team, and business performance through relevant and practical
                      learning interventions.
                    </p>
                    <a className="card-link" href="/services/corporate-training-learning-and-development">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="service-card-img">
                  <div className="card-media">
                    <div className="media-inner">
                      <img src="/assets/images/service-customized-training.webp" alt="Customized Training Solutions" />
                    </div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                      </svg>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Customized Training Solutions</h3>
                    <p className="card-text">
                      Every organization has unique development requirements. We work with clients to
                      understand their objectives, target audience, and expected outcomes before
                      developing or recommending an appropriate learning solution.
                    </p>
                    <a className="card-link" href="/services/customized-training-solutions">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="service-card-img">
                  <div className="card-media">
                    <div className="media-inner">
                      <img src="/assets/images/service-professional-development.webp" alt="Professional Development" />
                    </div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                      </svg>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Professional Development</h3>
                    <p className="card-text">
                      We support professionals in strengthening the knowledge, skills, and
                      capabilities required to progress in today’s evolving workplace.
                    </p>
                    <a className="card-link" href="/services/professional-development">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="service-card-img">
                  <div className="card-media">
                    <div className="media-inner">
                      <img src="/assets/images/service-organizational-capability.webp" alt="Organizational Capability Development" />
                    </div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                      </svg>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Organizational Capability Development</h3>
                    <p className="card-text">
                      We help organizations identify development priorities and capability gaps, and
                      translate them into focused learning and development actions that support
                      workforce performance.
                    </p>
                    <a className="card-link" href="/services/organizational-capability-development">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="service-card-img">
                  <div className="card-media">
                    <div className="media-inner">
                      <img src="/assets/images/service-career-guidance.webp" alt="Career Guidance & Development" />
                    </div>
                    <div className="card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                      </svg>
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>Career Guidance &amp; Development</h3>
                    <p className="card-text">
                      We provide career development support for professionals, graduates, and
                      emerging talent through career planning, CV and profile development, interview
                      preparation, and professional development guidance.
                    </p>
                    <a className="card-link" href="/services/career-guidance-development">
                      Learn More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-44">
              <a className="btn btn-outline-light" href="/services">View All Services</a>
            </div>
          </div>
        </section>

        {/* ============ WHY ALTIORA ============ */}
        <section id="why-altiora" className="section-white">
          <div className="container">
            <div className="grid-2">
              <div>
                <span className="eyebrow">Why Altiora</span>
                <h2 className="mt-10">Development with purpose</h2>
                <p className="lede mt-20">
                  We go beyond conventional training by delivering practical, relevant, and engaging
                  development experiences designed to strengthen capabilities and create meaningful
                  workplace impact.
                </p>
                <a className="btn btn-outline-light mt-30" href="/why-altiora">
                  Discover Why Altiora
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>

              <div className="stat-panel">
                <div className="stat-grid">
                  <div className="stat-cell">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M4 20V10l8-6 8 6v10" /><path d="M9 20v-7h6v7" />
                      </svg>
                    </div>
                    <div className="num">100%</div>
                    <div className="label">Tailored Solutions</div>
                  </div>
                  <div className="stat-cell">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <div className="num">Practical</div>
                    <div className="label">Learning Impact</div>
                  </div>
                  <div className="stat-cell">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
                      </svg>
                    </div>
                    <div className="num">Long-term</div>
                    <div className="label">Client Partnership</div>
                  </div>
                  <div className="stat-cell">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />
                      </svg>
                    </div>
                    <div className="num">Every Time</div>
                    <div className="label">Commitment to Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ OUR APPROACH ============ */}
        <section id="training" className="section-charcoal has-bg">
          <div className="section-charcoal-bg">
            <img src="/assets/images/img-training.jpg" alt="" />
          </div>
          <div className="container">
            <div className="section-head on-dark approach-head">
              <span className="eyebrow">Our Approach</span>
              <h2>A Structured, Practical Methodology</h2>
              <p>Every engagement follows the same disciplined process, adapted to your organization.</p>
            </div>
          </div>
          <div className="container no-pad">
            <div className="process-grid">
              <div className="process-step is-active">
                <span className="step-no">01</span>
                <h3>Understand</h3>
                <p>Understand the organization's goals, challenges and people.</p>
              </div>
              <div className="process-step is-active">
                <span className="step-no">02</span>
                <h3>Design</h3>
                <p>Build tailored solutions around actual business requirements.</p>
              </div>
              <div className="process-step is-active">
                <span className="step-no">03</span>
                <h3>Deliver</h3>
                <p>Deliver practical, engaging and relevant programs.</p>
              </div>
              <div className="process-step is-active">
                <span className="step-no">04</span>
                <h3>Measure</h3>
                <p>Focus on application, outcomes and sustainable impact.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TRAINING PROGRAMS ============ */}
        <section id="training-programs" className="section-off">
          <div className="container">
            <div className="grid-2">
              <div>
                <span className="eyebrow">Training Programs</span>
                <h2>Learning Designed for Today’s Workplace</h2>
                <p className="lede mt-18">
                  Our training programs are designed to build practical skills, strengthen
                  professional capabilities, and support better performance in the workplace.
                </p>

                <div className="mini-stats">
                  <div><strong><span className="count-up">50+</span></strong><span>Ready Programs</span></div>
                  <div><strong><span className="count-up">9</span></strong><span>Categories</span></div>
                  <div><strong><span className="count-up">100%</span></strong><span>Customizable</span></div>
                </div>

                <a className="btn btn-outline-light mt-30" href="/training">
                  View Training Programs
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>

              <div>
                <div className="photo-frame training-photo">
                  <img src="/assets/images/img-home-why.jpg" alt="Altiora facilitator leading a workplace training session" />
                </div>

                <div className="training-tags">
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
                    </svg>
                    Communication &amp; Professional Skills
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
                    </svg>
                    Leadership &amp; Management Development
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" />
                      <path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />
                    </svg>
                    Individual Development Planning
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="9" cy="8" r="3" />
                      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
                      <circle cx="17" cy="8.5" r="2.4" />
                      <path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" />
                    </svg>
                    Banking &amp; Financial Services
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
                    </svg>
                    Compliance, Risk &amp; Governance
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />
                      <path d="m9 12 2 2 4-4.5" />
                    </svg>
                    Customer Experience &amp; Service Excellence
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
                    </svg>
                    Project &amp; Change Management
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="9" r="5.5" /><path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
                    </svg>
                    Workplace Effectiveness
                  </span>
                  <span className="training-tag">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" />
                      <path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />
                    </svg>
                    Customized Corporate Training
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA BAND ============ */}
        <section id="contact" className="cta-band">
          <div className="cta-bg">
            <img src="/assets/images/img-approach.jpg" alt="" />
          </div>
          <div className="container">
            <h2>Ready to Elevate Your People and Performance?</h2>
            <p>Let's build practical solutions that create meaningful and sustainable business impact.</p>
            <a href="#" className="btn btn-gold">
              Request a Consultation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
