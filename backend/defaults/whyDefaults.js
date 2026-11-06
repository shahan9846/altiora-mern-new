// The original "Why Altiora" page wording.
// The backend uses these values until the admin saves something new.
// Lists (cards...) always keep the same number of entries.
const whyDefaults = {
  banner: {
    title: 'Why Altiora',
    image: '/assets/images/img-why.jpg',
  },

  intro: {
    smallHeading: 'Why Altiora?',
    heading: 'Development with purpose',
    paragraphOne:
      'At Altiora, every development journey begins with a clear purpose. Our approach is centered on identifying the right priorities and creating solutions that align with individual and organizational goals.',
    paragraphTwo:
      'We go beyond conventional training by delivering practical, relevant, and engaging development experiences designed to strengthen capabilities and create meaningful workplace impact.',
    image: '/assets/images/img-home-why.jpg',
  },

  strengths: {
    smallHeading: 'Our Strengths',
    heading: 'What Sets Us Apart',
    cards: [
      {
        title: 'Tailored to Your Needs',
        text: 'We recognize that every organization and individual is different. Our solutions can be adapted to specific objectives, audiences, industries, and development priorities.',
      },
      {
        title: 'Practical & Relevant',
        text: 'We focus on learning that participants can understand, relate to, and apply in their professional environment.',
      },
      {
        title: 'People-Focused Approach',
        text: 'Development is about people. We place the learner at the center of the experience while keeping organizational objectives in focus.',
      },
      {
        title: 'Flexible Solutions',
        text: 'From focused workshops to customized development programs, our approach allows us to respond to different learning requirements and delivery needs.',
      },
      {
        title: 'Quality-Driven',
        text: 'We are committed to maintaining professionalism, relevance, and quality throughout every stage of the learning journey.',
      },
      {
        title: 'Built for Continuous Growth',
        text: 'We look beyond a single training session and encourage development that supports continued learning, stronger capabilities, and long-term professional growth.',
      },
    ],
  },

  cta: {
    heading: 'Your Goals. Our Focus.',
    text: 'Whether you are developing a team, strengthening a specific capability, or investing in your own professional growth, Altiora works with you to create a development experience that has purpose and direction.',
    button: 'Request a Consultation',
    image: '/assets/images/img-approach.jpg',
  },
};

export default whyDefaults;
