// The original Home wording.
// The backend uses these values until the admin saves something new.
// Each key below is one section of the Home page.
// Lists (slides, items, cards...) always keep the same number of entries.
const homeDefaults = {
  hero: {
    slides: [
      {
        image: '/assets/images/photo-team-meeting.jpg',
        smallHeading: 'Altiora Business Advisory',
        headingLine1: 'Elevating Potential.',
        headingLine2: 'Delivering Excellence.',
        text: 'At Altiora Business Advisory, we believe that meaningful growth begins with the right knowledge, skills, and direction.',
      },
      {
        image: '/assets/images/photo-training-session.jpg',
        smallHeading: 'Practical Learning',
        headingLine1: 'Training That',
        headingLine2: 'Creates Real Impact.',
        text: 'Hands-on programs designed to build skills your teams can put to work from day one.',
      },
      {
        image: '/assets/images/photo-advisory-discussion.jpg',
        smallHeading: 'Trusted Partnership',
        headingLine1: 'Advisory Built On',
        headingLine2: 'Lasting Relationships.',
        text: 'We work alongside your organization for the long term — not just for a single engagement.',
      },
    ],
    primaryButton: 'Explore Our Services',
    secondaryButton: 'Talk to Our Team',
  },

  valueStrip: {
    items: [
      { title: 'People Focussed', text: 'Developing talent and strengthening capabilities.' },
      { title: 'Custom Solutions', text: 'Tailored programs aligned to your business goals.' },
      { title: 'Practical & Impactful', text: 'Real-world learning for measurable results.' },
      { title: 'Trust & Partnership', text: 'Building long-term relationships you can rely on.' },
      { title: 'Driving Growth', text: 'Empowering organizations to achieve excellence.' },
    ],
  },

  about: {
    smallHeading: 'Who We Are',
    heading: 'About Altiora',
    intro:
      'We provide tailored learning and development solutions, professional development programs, organizational capability support, and career guidance designed to help individuals and organizations grow, perform, and succeed.',
    secondParagraph:
      'From strengthening workforce capabilities to supporting individual career journeys, our approach is focused on creating meaningful learning experiences that translate into real-world value.',
    button: 'More About Us',
    image: '/assets/images/photo-team-whiteboard.jpg',
  },

  // The service cards themselves come from the Services dashboard (not from this file)
  services: {
    smallHeading: 'What We Do',
    heading: 'Solutions Designed to Develop People and Strengthen Performance',
    text: 'At Altiora, we turn development needs into focused, practical solutions.',
    cardLinkLabel: 'Learn More',
    viewAllButton: 'View All Services',
  },

  why: {
    smallHeading: 'Why Altiora',
    heading: 'Development with purpose',
    text: 'We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact.',
    button: 'Discover Why Altiora',
    highlights: [
      { value: '100%', label: 'Tailored Solutions' },
      { value: 'Practical', label: 'Learning Impact' },
      { value: 'Long-term', label: 'Client Partnership' },
      { value: 'Every Time', label: 'Commitment to Excellence' },
    ],
  },

  approach: {
    smallHeading: 'Our Approach',
    heading: 'A Structured, Practical Methodology',
    text: 'Every engagement follows the same disciplined process, adapted to your organization.',
    steps: [
      { title: 'Understand', text: "Understand the organization's goals, challenges and people." },
      { title: 'Design', text: 'Build tailored solutions around actual business requirements.' },
      { title: 'Deliver', text: 'Deliver practical, engaging and relevant programs.' },
      { title: 'Measure', text: 'Focus on application, outcomes and sustainable impact.' },
    ],
    image: '/assets/images/img-training.jpg',
  },

  training: {
    smallHeading: 'Training Programs',
    heading: 'Learning Designed for Today’s Workplace',
    text: 'Our training programs are designed to build practical skills, strengthen professional capabilities, and support better performance in the workplace.',
    numbers: [
      { value: '50+', label: 'Ready Programs' },
      { value: '9', label: 'Categories' },
      { value: '100%', label: 'Customizable' },
    ],
    tags: [
      { text: 'Communication & Professional Skills' },
      { text: 'Leadership & Management Development' },
      { text: 'Individual Development Planning' },
      { text: 'Banking & Financial Services' },
      { text: 'Compliance, Risk & Governance' },
      { text: 'Customer Experience & Service Excellence' },
      { text: 'Project & Change Management' },
      { text: 'Workplace Effectiveness' },
      { text: 'Customized Corporate Training' },
    ],
    button: 'View Training Programs',
    image: '/assets/images/img-home-why.jpg',
  },

  cta: {
    heading: 'Ready to Elevate Your People and Performance?',
    text: "Let's build practical solutions that create meaningful and sustainable business impact.",
    button: 'Request a Consultation',
    image: '/assets/images/img-approach.jpg',
  },
};

export default homeDefaults;
