// The original About page wording.
// The backend uses these values until the admin saves something new.
// Each key below is one section of the About page.
// Lists (cards, points...) always keep the same number of entries.
const aboutDefaults = {
  banner: {
    title: 'About Us',
    image: '/assets/images/photo-doha-sunset.jpg',
  },

  intro: {
    smallHeading: 'Who We Are',
    heading: 'About Altiora',
    paragraphOne:
      'Altiora Business Advisory was established with a clear purpose — to create meaningful development opportunities that enable people and organizations to move forward with confidence. Based in Qatar, Altiora brings a practical and people-focused approach to development.',
    paragraphTwo:
      'We believe that meaningful progress comes from understanding where you are today, recognizing where you want to go, and building the right capabilities to get there.',
    button: 'Talk To Our Team',
    image: '/assets/images/photo-team-whiteboard.jpg',
  },

  foundation: {
    smallHeading: 'Our Foundation',
    heading: 'Vision, Mission & Belief',
    text: 'Our approach is centered on relevance, quality, and continuous improvement. We aim to create development experiences that go beyond learning — helping individuals strengthen their potential and organizations build capable, confident, and future-ready teams.',
    image: '/assets/images/img-approach.jpg',
    cards: [
      {
        title: 'Our Vision',
        text: 'To be a trusted partner in developing people, strengthening organizations, and enabling continuous professional growth.',
      },
      {
        title: 'Our Mission',
        text: 'To create practical, relevant, and meaningful development experiences that strengthen capabilities, encourage continuous learning, and support individuals and organizations in achieving their goals.',
      },
      {
        title: 'Our Belief',
        text: 'At Altiora, we believe progress begins with potential — and the right development can elevate it.',
      },
    ],
  },

  beliefs: {
    smallHeading: 'What We Believe',
    heading: 'Principles behind every engagement',
    points: [
      { text: 'Learning should be practical, not theoretical for its own sake.' },
      { text: "Every organization's context is different, and solutions should reflect that." },
      { text: 'Long-term partnerships create better outcomes than one-off projects.' },
      { text: 'Quality and professionalism matter in every engagement, large or small.' },
    ],
    image: '/assets/images/photo-doha-aerial.jpg',
  },

  values: {
    smallHeading: 'What Guides Us',
    heading: 'Our Values',
    cards: [
      { title: 'Excellence', text: 'We strive for quality and professionalism in everything we deliver.' },
      { title: 'Integrity', text: 'We build relationships based on trust, transparency, and accountability.' },
      {
        title: 'Collaboration',
        text: 'We believe the strongest solutions are created by listening, understanding, and working together.',
      },
      {
        title: 'Growth',
        text: 'We believe continuous learning is fundamental to individual and organizational progress.',
      },
      { title: 'Impact', text: 'We focus on development that creates meaningful and practical outcomes.' },
    ],
  },

  reasons: {
    smallHeading: 'Why Organizations Choose Us',
    heading: 'A practical, people-first approach',
    cards: [
      { title: 'Tailored, Not Templated', text: 'Solutions built around your organization, not generic packages.' },
      { title: 'Practical Delivery', text: 'Programs designed for real application, not just awareness.' },
      { title: 'Long-Term Partnership', text: 'Relationships that extend beyond a single project.' },
      {
        title: 'Professional Standards',
        text: 'Quality and rigour applied consistently across every engagement.',
      },
    ],
  },

  cta: {
    heading: 'Ready to Elevate Your People and Performance?',
    text: "Let's build practical solutions that create meaningful and sustainable business impact.",
    button: 'Request a Consultation',
    image: '/assets/images/img-home-why.jpg',
  },
};

export default aboutDefaults;
