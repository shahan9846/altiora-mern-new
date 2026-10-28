// Admin → Home page editor. Fully static: no hooks, no .map(), no helper functions.
// Inputs use defaultValue (they show the current wording but do not save anything yet).
import "../../styles/admin.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import AdminPageBanner from "../../components/admin/AdminPageBanner";
import AdminOutline from "../../components/admin/AdminOutline";
import AdminSaveBar from "../../components/admin/AdminSaveBar";

const HomeEditor = () => {
  return (
    <div className="adm-shell">
      <AdminSidebar />

      <div className="adm-main">
        <AdminTopbar />

        <div className="adm-scroll">
          <div className="adm-content">
            <AdminPageBanner />

            <div className="adm-layout">
              <AdminOutline />

              <div className="adm-panels">
                <article className="adm-panel" id="hero" aria-labelledby="hero-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="hero-title">Hero</h2>
                      <p>The first screen visitors see. Three slides rotate, each with its own photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">14 texts</span>
                      <span className="adm-count">3 images</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-slides">
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src="/assets/images/photo-team-meeting.jpg" alt="" />
                          <span>Slide 1</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">photo-team-meeting.jpg</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input type="file" accept="image/jpeg,image/png,image/webp" />
                            <span>Change image</span>
                          </label>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f1">Slide 1: small heading</label>
                            <input id="f1" type="text" defaultValue={"Altiora Business Advisory"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f2">Slide 1: heading line 1</label>
                            <input id="f2" type="text" defaultValue={"Elevating Potential."} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f3">Slide 1: heading line 2 (gold)</label>
                            <input id="f3" type="text" defaultValue={"Delivering Excellence."} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f4">Slide 1: text</label>
                            <textarea id="f4" rows="3" defaultValue={"At Altiora Business Advisory, we believe that meaningful growth begins with the right knowledge, skills, and direction."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src="/assets/images/photo-training-session.jpg" alt="" className="pos-right" />
                          <span>Slide 2</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">photo-training-session.jpg</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input type="file" accept="image/jpeg,image/png,image/webp" />
                            <span>Change image</span>
                          </label>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f5">Slide 2: small heading</label>
                            <input id="f5" type="text" defaultValue={"Practical Learning"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f6">Slide 2: heading line 1</label>
                            <input id="f6" type="text" defaultValue={"Training That"} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f7">Slide 2: heading line 2 (gold)</label>
                            <input id="f7" type="text" defaultValue={"Creates Real Impact."} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f8">Slide 2: text</label>
                            <textarea id="f8" rows="3" defaultValue={"Hands-on programs designed to build skills your teams can put to work from day one."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-slide">
                        <div className="adm-slide-photo">
                          <img src="/assets/images/photo-advisory-discussion.jpg" alt="" className="pos-left" />
                          <span>Slide 3</span>
                        </div>
                        <div className="adm-image-meta">
                          <p className="adm-file">photo-advisory-discussion.jpg</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px. Keep faces near the centre because the edges are cropped. JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input type="file" accept="image/jpeg,image/png,image/webp" />
                            <span>Change image</span>
                          </label>
                        </div>
                        <div className="adm-slide-fields">
                          <div className="adm-field">
                            <label htmlFor="f9">Slide 3: small heading</label>
                            <input id="f9" type="text" defaultValue={"Trusted Partnership"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f10">Slide 3: heading line 1</label>
                            <input id="f10" type="text" defaultValue={"Advisory Built On"} />
                          </div>
                          <div className="adm-field is-gold">
                            <label htmlFor="f11">Slide 3: heading line 2 (gold)</label>
                            <input id="f11" type="text" defaultValue={"Lasting Relationships."} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f12">Slide 3: text</label>
                            <textarea id="f12" rows="3" defaultValue={"We work alongside your organization for the long term — not just for a single engagement."}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="adm-sub">Buttons</h3>
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f13">Primary button</label>
                        <input id="f13" type="text" defaultValue={"Explore Our Services"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f14">Secondary button</label>
                        <input id="f14" type="text" defaultValue={"Talk to Our Team"} />
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="values" aria-labelledby="values-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="values-title">Value strip</h2>
                      <p>Five short promises shown directly under the hero.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">10 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-rows">
                      <div className="adm-row adm-row-values">
                        <span className="adm-chip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 8a3 3 0 1 0 0 .01M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /></svg></span>
                        <div className="adm-field">
                          <label htmlFor="f15" className="adm-sr">Item 1: title</label>
                          <input id="f15" type="text" defaultValue={"People Focussed"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f16" className="adm-sr">Item 1: text</label>
                          <input id="f16" type="text" defaultValue={"Developing talent and strengthening capabilities."} />
                        </div>
                      </div>
                      <div className="adm-row adm-row-values">
                        <span className="adm-chip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg></span>
                        <div className="adm-field">
                          <label htmlFor="f17" className="adm-sr">Item 2: title</label>
                          <input id="f17" type="text" defaultValue={"Custom Solutions"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f18" className="adm-sr">Item 2: text</label>
                          <input id="f18" type="text" defaultValue={"Tailored programs aligned to your business goals."} />
                        </div>
                      </div>
                      <div className="adm-row adm-row-values">
                        <span className="adm-chip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM9 14 7.5 21 12 18.5 16.5 21 15 14" /></svg></span>
                        <div className="adm-field">
                          <label htmlFor="f19" className="adm-sr">Item 3: title</label>
                          <input id="f19" type="text" defaultValue={"Practical & Impactful"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f20" className="adm-sr">Item 3: text</label>
                          <input id="f20" type="text" defaultValue={"Real-world learning for measurable results."} />
                        </div>
                      </div>
                      <div className="adm-row adm-row-values">
                        <span className="adm-chip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" /></svg></span>
                        <div className="adm-field">
                          <label htmlFor="f21" className="adm-sr">Item 4: title</label>
                          <input id="f21" type="text" defaultValue={"Trust & Partnership"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f22" className="adm-sr">Item 4: text</label>
                          <input id="f22" type="text" defaultValue={"Building long-term relationships you can rely on."} />
                        </div>
                      </div>
                      <div className="adm-row adm-row-values">
                        <span className="adm-chip" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3.5 18.5 9 12l4 3 7.5-8.5M15.5 6.5h5v5" /></svg></span>
                        <div className="adm-field">
                          <label htmlFor="f23" className="adm-sr">Item 5: title</label>
                          <input id="f23" type="text" defaultValue={"Driving Growth"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f24" className="adm-sr">Item 5: text</label>
                          <input id="f24" type="text" defaultValue={"Empowering organizations to achieve excellence."} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="about" aria-labelledby="about-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="about-title">About Altiora</h2>
                      <p>Introduces the firm next to the team photo.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">5 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-split">
                      <div className="adm-stack">
                        <div className="adm-field">
                          <label htmlFor="f25">Small heading</label>
                          <input id="f25" type="text" defaultValue={"Who We Are"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f26">Heading</label>
                          <input id="f26" type="text" defaultValue={"About Altiora"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f27">Intro text</label>
                          <textarea id="f27" rows="3" defaultValue={"We provide tailored learning and development solutions, professional development programs, organizational capability support, and career guidance designed to help individuals and organizations grow, perform, and succeed."}></textarea>
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f28">Second paragraph</label>
                          <textarea id="f28" rows="3" defaultValue={"From strengthening workforce capabilities to supporting individual career journeys, our approach is focused on creating meaningful learning experiences that translate into real-world value."}></textarea>
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f29">Button</label>
                          <input id="f29" type="text" defaultValue={"More About Us"} />
                        </div>
                      </div>
                      <figure className="adm-figure">
                        <img src="/assets/images/photo-team-whiteboard.jpg" alt="" />
                        <div className="adm-image-meta">
                          <p className="adm-file">photo-team-whiteboard.jpg</p>
                          <p className="adm-hint">Landscape, at least 1600 × 1067 px (3:2). JPG, PNG or WebP.</p>
                          <label className="adm-upload">
                            <input type="file" accept="image/jpeg,image/png,image/webp" />
                            <span>Change image</span>
                          </label>
                        </div>
                      </figure>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="services" aria-labelledby="services-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="services-title">Services</h2>
                      <p>Five service cards in a scrolling row.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">15 texts</span>
                      <span className="adm-count">5 images</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f30">Small heading</label>
                        <input id="f30" type="text" defaultValue={"What We Do"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f31">Heading</label>
                        <textarea id="f31" rows="2" defaultValue={"Solutions Designed to Develop People and Strengthen Performance"}></textarea>
                      </div>
                    </div>
                    <div className="adm-stack adm-mt">
                      <div className="adm-field">
                        <label htmlFor="f32">Text under heading</label>
                        <textarea id="f32" rows="2" defaultValue={"At Altiora, we turn development needs into focused, practical solutions."}></textarea>
                      </div>
                    </div>
                    <h3 className="adm-sub">Service cards</h3>
                    <div className="adm-items">
                      <div className="adm-item">
                        <div className="adm-item-media">
                          <img src="/assets/images/service-corporate-training.webp" alt="" />
                          <div className="adm-image-meta">
                            <p className="adm-file">service-corporate-training.webp</p>
                            <p className="adm-hint">Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP.</p>
                            <label className="adm-upload">
                              <input type="file" accept="image/jpeg,image/png,image/webp" />
                              <span>Change image</span>
                            </label>
                          </div>
                        </div>
                        <div className="adm-stack">
                          <div className="adm-field">
                            <label htmlFor="f33">Service 1: title</label>
                            <input id="f33" type="text" defaultValue={"Corporate Training & Learning and Development"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f34">Service 1: text</label>
                            <textarea id="f34" rows="3" defaultValue={"We support organizations in developing the capabilities required for stronger individual, team, and business performance through relevant and practical learning interventions."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-item">
                        <div className="adm-item-media">
                          <img src="/assets/images/service-customized-training.webp" alt="" />
                          <div className="adm-image-meta">
                            <p className="adm-file">service-customized-training.webp</p>
                            <p className="adm-hint">Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP.</p>
                            <label className="adm-upload">
                              <input type="file" accept="image/jpeg,image/png,image/webp" />
                              <span>Change image</span>
                            </label>
                          </div>
                        </div>
                        <div className="adm-stack">
                          <div className="adm-field">
                            <label htmlFor="f35">Service 2: title</label>
                            <input id="f35" type="text" defaultValue={"Customized Training Solutions"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f36">Service 2: text</label>
                            <textarea id="f36" rows="3" defaultValue={"Every organization has unique development requirements. We work with clients to understand their objectives, target audience, and expected outcomes before developing or recommending an appropriate learning solution."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-item">
                        <div className="adm-item-media">
                          <img src="/assets/images/service-professional-development.webp" alt="" />
                          <div className="adm-image-meta">
                            <p className="adm-file">service-professional-development.webp</p>
                            <p className="adm-hint">Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP.</p>
                            <label className="adm-upload">
                              <input type="file" accept="image/jpeg,image/png,image/webp" />
                              <span>Change image</span>
                            </label>
                          </div>
                        </div>
                        <div className="adm-stack">
                          <div className="adm-field">
                            <label htmlFor="f37">Service 3: title</label>
                            <input id="f37" type="text" defaultValue={"Professional Development"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f38">Service 3: text</label>
                            <textarea id="f38" rows="3" defaultValue={"We support professionals in strengthening the knowledge, skills, and capabilities required to progress in today’s evolving workplace."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-item">
                        <div className="adm-item-media">
                          <img src="/assets/images/service-organizational-capability.webp" alt="" />
                          <div className="adm-image-meta">
                            <p className="adm-file">service-organizational-capability.webp</p>
                            <p className="adm-hint">Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP.</p>
                            <label className="adm-upload">
                              <input type="file" accept="image/jpeg,image/png,image/webp" />
                              <span>Change image</span>
                            </label>
                          </div>
                        </div>
                        <div className="adm-stack">
                          <div className="adm-field">
                            <label htmlFor="f39">Service 4: title</label>
                            <input id="f39" type="text" defaultValue={"Organizational Capability Development"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f40">Service 4: text</label>
                            <textarea id="f40" rows="3" defaultValue={"We help organizations identify development priorities and capability gaps, and translate them into focused learning and development actions that support workforce performance."}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="adm-item">
                        <div className="adm-item-media">
                          <img src="/assets/images/service-career-guidance.webp" alt="" />
                          <div className="adm-image-meta">
                            <p className="adm-file">service-career-guidance.webp</p>
                            <p className="adm-hint">Landscape, at least 1200 × 900 px (4:3). JPG, PNG or WebP.</p>
                            <label className="adm-upload">
                              <input type="file" accept="image/jpeg,image/png,image/webp" />
                              <span>Change image</span>
                            </label>
                          </div>
                        </div>
                        <div className="adm-stack">
                          <div className="adm-field">
                            <label htmlFor="f41">Service 5: title</label>
                            <input id="f41" type="text" defaultValue={"Career Guidance & Development"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f42">Service 5: text</label>
                            <textarea id="f42" rows="3" defaultValue={"We provide career development support for professionals, graduates, and emerging talent through career planning, CV and profile development, interview preparation, and professional development guidance."}></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="adm-sub">Links</h3>
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f43">Card link label</label>
                        <input id="f43" type="text" defaultValue={"Learn More"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f44">View all button</label>
                        <input id="f44" type="text" defaultValue={"View All Services"} />
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="why" aria-labelledby="why-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="why-title">Why Altiora</h2>
                      <p>A short pitch with four highlights beside it.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">12 texts</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-stack">
                      <div className="adm-field">
                        <label htmlFor="f45">Small heading</label>
                        <input id="f45" type="text" defaultValue={"Why Altiora"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f46">Heading</label>
                        <input id="f46" type="text" defaultValue={"Development with purpose"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f47">Text</label>
                        <textarea id="f47" rows="3" defaultValue={"We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact."}></textarea>
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f48">Button</label>
                        <input id="f48" type="text" defaultValue={"Discover Why Altiora"} />
                      </div>
                    </div>
                    <h3 className="adm-sub">Highlights</h3>
                    <div className="adm-grid-2">
                      <div className="adm-pair">
                        <div className="adm-field">
                          <label htmlFor="f49">Highlight 1: value</label>
                          <input id="f49" type="text" defaultValue={"100%"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f50">Highlight 1: label</label>
                          <input id="f50" type="text" defaultValue={"Tailored Solutions"} />
                        </div>
                      </div>
                      <div className="adm-pair">
                        <div className="adm-field">
                          <label htmlFor="f51">Highlight 2: value</label>
                          <input id="f51" type="text" defaultValue={"Practical"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f52">Highlight 2: label</label>
                          <input id="f52" type="text" defaultValue={"Learning Impact"} />
                        </div>
                      </div>
                      <div className="adm-pair">
                        <div className="adm-field">
                          <label htmlFor="f53">Highlight 3: value</label>
                          <input id="f53" type="text" defaultValue={"Long-term"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f54">Highlight 3: label</label>
                          <input id="f54" type="text" defaultValue={"Client Partnership"} />
                        </div>
                      </div>
                      <div className="adm-pair">
                        <div className="adm-field">
                          <label htmlFor="f55">Highlight 4: value</label>
                          <input id="f55" type="text" defaultValue={"Every Time"} />
                        </div>
                        <div className="adm-field">
                          <label htmlFor="f56">Highlight 4: label</label>
                          <input id="f56" type="text" defaultValue={"Commitment to Excellence"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="approach" aria-labelledby="approach-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="approach-title">Our approach</h2>
                      <p>The four-step process on the dark band.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">11 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f57">Small heading</label>
                        <input id="f57" type="text" defaultValue={"Our Approach"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f58">Heading</label>
                        <input id="f58" type="text" defaultValue={"A Structured, Practical Methodology"} />
                      </div>
                    </div>
                    <div className="adm-stack adm-mt">
                      <div className="adm-field">
                        <label htmlFor="f59">Text under heading</label>
                        <textarea id="f59" rows="2" defaultValue={"Every engagement follows the same disciplined process, adapted to your organization."}></textarea>
                      </div>
                    </div>
                    <h3 className="adm-sub">Steps, in order</h3>
                    <ol className="adm-steps">
                      <li>
                        <span className="adm-step-no">1</span>
                        <div className="adm-pair">
                          <div className="adm-field">
                            <label htmlFor="f60">Step 1: title</label>
                            <input id="f60" type="text" defaultValue={"Understand"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f61">Step 1: text</label>
                            <textarea id="f61" rows="3" defaultValue={"Understand the organization's goals, challenges and people."}></textarea>
                          </div>
                        </div>
                      </li>
                      <li>
                        <span className="adm-step-no">2</span>
                        <div className="adm-pair">
                          <div className="adm-field">
                            <label htmlFor="f62">Step 2: title</label>
                            <input id="f62" type="text" defaultValue={"Design"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f63">Step 2: text</label>
                            <textarea id="f63" rows="3" defaultValue={"Build tailored solutions around actual business requirements."}></textarea>
                          </div>
                        </div>
                      </li>
                      <li>
                        <span className="adm-step-no">3</span>
                        <div className="adm-pair">
                          <div className="adm-field">
                            <label htmlFor="f64">Step 3: title</label>
                            <input id="f64" type="text" defaultValue={"Deliver"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f65">Step 3: text</label>
                            <textarea id="f65" rows="3" defaultValue={"Deliver practical, engaging and relevant programs."}></textarea>
                          </div>
                        </div>
                      </li>
                      <li>
                        <span className="adm-step-no">4</span>
                        <div className="adm-pair">
                          <div className="adm-field">
                            <label htmlFor="f66">Step 4: title</label>
                            <input id="f66" type="text" defaultValue={"Measure"} />
                          </div>
                          <div className="adm-field">
                            <label htmlFor="f67">Step 4: text</label>
                            <textarea id="f67" rows="3" defaultValue={"Focus on application, outcomes and sustainable impact."}></textarea>
                          </div>
                        </div>
                      </li>
                    </ol>
                    <h3 className="adm-sub">Background image</h3>
                    <div className="adm-image-row">
                      <img src="/assets/images/img-training.jpg" alt="" />
                      <div className="adm-image-meta">
                        <p className="adm-file">img-training.jpg</p>
                        <p className="adm-hint">Wide, at least 1600 × 900 px. A dark overlay is added on top. JPG, PNG or WebP.</p>
                        <label className="adm-upload">
                          <input type="file" accept="image/jpeg,image/png,image/webp" />
                          <span>Change image</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="training" aria-labelledby="training-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="training-title">Training programs</h2>
                      <p>Programme summary, headline numbers and category tags.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">16 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f68">Small heading</label>
                        <input id="f68" type="text" defaultValue={"Training Programs"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f69">Heading</label>
                        <input id="f69" type="text" defaultValue={"Learning Designed for Today’s Workplace"} />
                      </div>
                    </div>
                    <div className="adm-stack adm-mt">
                      <div className="adm-field">
                        <label htmlFor="f70">Text</label>
                        <textarea id="f70" rows="3" defaultValue={"Our training programs are designed to build practical skills, strengthen professional capabilities, and support better performance in the workplace."}></textarea>
                      </div>
                    </div>
                    <h3 className="adm-sub">Number labels</h3>
                    <div className="adm-grid-3">
                      <div className="adm-field">
                        <label htmlFor="f71">Number 1: label</label>
                        <input id="f71" type="text" defaultValue={"Ready Programs"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f72">Number 2: label</label>
                        <input id="f72" type="text" defaultValue={"Categories"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f73">Number 3: label</label>
                        <input id="f73" type="text" defaultValue={"Customizable"} />
                      </div>
                    </div>
                    <h3 className="adm-sub">Category tags</h3>
                    <div className="adm-grid-2">
                      <div className="adm-field">
                        <label htmlFor="f74" className="adm-sr">Category 1</label>
                        <input id="f74" type="text" defaultValue={"Communication & Professional Skills"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f75" className="adm-sr">Category 2</label>
                        <input id="f75" type="text" defaultValue={"Leadership & Management Development"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f76" className="adm-sr">Category 3</label>
                        <input id="f76" type="text" defaultValue={"Individual Development Planning"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f77" className="adm-sr">Category 4</label>
                        <input id="f77" type="text" defaultValue={"Banking & Financial Services"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f78" className="adm-sr">Category 5</label>
                        <input id="f78" type="text" defaultValue={"Compliance, Risk & Governance"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f79" className="adm-sr">Category 6</label>
                        <input id="f79" type="text" defaultValue={"Customer Experience & Service Excellence"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f80" className="adm-sr">Category 7</label>
                        <input id="f80" type="text" defaultValue={"Project & Change Management"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f81" className="adm-sr">Category 8</label>
                        <input id="f81" type="text" defaultValue={"Workplace Effectiveness"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f82" className="adm-sr">Category 9</label>
                        <input id="f82" type="text" defaultValue={"Customized Corporate Training"} />
                      </div>
                    </div>
                    <div className="adm-stack adm-mt">
                      <div className="adm-field">
                        <label htmlFor="f83">Button</label>
                        <input id="f83" type="text" defaultValue={"View Training Programs"} />
                      </div>
                    </div>
                    <h3 className="adm-sub">Section photo</h3>
                    <div className="adm-image-row">
                      <img src="/assets/images/img-home-why.jpg" alt="" />
                      <div className="adm-image-meta">
                        <p className="adm-file">img-home-why.jpg</p>
                        <p className="adm-hint">Landscape, at least 1600 × 1067 px (3:2). JPG, PNG or WebP.</p>
                        <label className="adm-upload">
                          <input type="file" accept="image/jpeg,image/png,image/webp" />
                          <span>Change image</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="adm-panel" id="cta" aria-labelledby="cta-title">
                  <header className="adm-panel-head">
                    <div>
                      <h2 id="cta-title">Closing banner</h2>
                      <p>The last call to action above the footer.</p>
                    </div>
                    <div className="adm-counts">
                      <span className="adm-count">3 texts</span>
                      <span className="adm-count">1 image</span>
                    </div>
                  </header>
                  <div className="adm-panel-body">
                    <div className="adm-stack">
                      <div className="adm-field">
                        <label htmlFor="f84">Heading</label>
                        <input id="f84" type="text" defaultValue={"Ready to Elevate Your People and Performance?"} />
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f85">Text</label>
                        <textarea id="f85" rows="2" defaultValue={"Let's build practical solutions that create meaningful and sustainable business impact."}></textarea>
                      </div>
                      <div className="adm-field">
                        <label htmlFor="f86">Button</label>
                        <input id="f86" type="text" defaultValue={"Request a Consultation"} />
                      </div>
                    </div>
                    <h3 className="adm-sub">Background image</h3>
                    <div className="adm-image-row">
                      <img src="/assets/images/img-approach.jpg" alt="" />
                      <div className="adm-image-meta">
                        <p className="adm-file">img-approach.jpg</p>
                        <p className="adm-hint">Wide, at least 1600 × 900 px. A dark overlay is added on top. JPG, PNG or WebP.</p>
                        <label className="adm-upload">
                          <input type="file" accept="image/jpeg,image/png,image/webp" />
                          <span>Change image</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <AdminSaveBar />
      </div>
    </div>
  );
};

export default HomeEditor;
