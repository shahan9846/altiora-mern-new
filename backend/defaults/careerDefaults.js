// The original Career Guidance page wording.
// The backend uses these values until the admin saves something new.
// Lists (cards, steps...) always keep the same number of entries.
const careerDefaults = {
  banner: {
    title: 'Career Guidance',
    image: '/assets/images/svc-compliance-new.jpg',
  },

  intro: {
    smallHeading: 'Career Guidance & Development',
    heading: 'Build Your Career With Clarity and Confidence',
    text: 'Career development is more than finding the next job. It is about understanding your strengths, identifying the right direction, and preparing yourself for future opportunities. Whether you are beginning your career, looking to progress professionally, considering a career transition, or exploring further qualifications, Altiora provides personalized guidance to support informed career and development decisions.',
    primaryButton: 'Book a Career Consultation',
    secondaryButton: 'Explore Our Services',
    image: '/assets/images/svc-compliance-new.jpg',
  },

  support: {
    smallHeading: 'Our Career Services',
    heading: 'Practical Support for Your Next Step',
    text: 'Our aim is to help individuals make informed career decisions and present their skills and experience with greater confidence.',
    cards: [
      {
        title: 'Leadership & Management Development',
        text: 'Building confident leaders with the skills to lead people, make effective decisions, manage performance, and navigate workplace challenges.',
      },
      {
        title: 'Communication & Professional Skills',
        text: 'Developing essential workplace capabilities including communication, presentation, business writing, negotiation, collaboration, and interpersonal effectiveness.',
      },
      {
        title: 'Individual Development Planning',
        text: 'A structured approach to professional growth, designed around individual strengths, development needs, and career goals. Altiora supports the creation of personalized development plans that identify key areas for growth and translate them into clear learning objectives, recommended training, and practical actions.',
      },
      {
        title: 'Banking & Financial Services',
        text: 'Industry-focused learning designed to strengthen knowledge and professional capabilities within the banking and financial services sector.',
      },
      {
        title: 'Compliance, Risk & Governance',
        text: 'Programs supporting awareness and understanding across compliance, financial crime, risk management, governance, ethics, and responsible business practices',
      },
      {
        title: 'Customer Experience & Service Excellence',
        text: 'Developing the skills and mindset required to deliver professional, consistent, and customer-focused experiences.',
      },
      {
        title: 'Project & Change Management',
        text: 'Building practical capabilities in project execution, stakeholder management, change readiness, adaptability, and implementation.',
      },
      {
        title: 'Workplace Effectiveness',
        text: 'Programs designed to strengthen practical workplace capabilities including time management, problem-solving, decision-making, collaboration, emotional intelligence, and productivity.',
      },
      {
        title: 'Customized Corporate Training',
        text: 'Have a specific development need? We can work with your organization to understand the requirement and develop a training solution aligned with your objectives, audience, and desired outcomes.',
      },
    ],
  },

  approach: {
    smallHeading: 'Our Approach',
    heading: 'Your Goals. A Clearer Way Forward.',
    text: 'A structured, personalized approach to help you make informed career decisions.',
    steps: [
      { title: 'Understand Your Goals', text: 'We take the time to understand your aspirations, interests and current situation.' },
      { title: 'Identify Your Strengths', text: 'We help you recognize your strengths and the areas you want to develop.' },
      { title: 'Create a Personalized Plan', text: 'We build a practical action plan tailored to your goals.' },
      {
        title: 'Prepare for Your Next Step',
        text: 'We provide the guidance and support you need to move forward with confidence.',
      },
    ],
  },

  why: {
    smallHeading: 'Why Choose Altiora',
    heading: 'Guidance That Goes Beyond the Next Job',
    text: 'We combine practical expertise with a people-focused approach to help you make meaningful progress in your career journey.',
    points: [
      { text: 'Personalized guidance built around your goals' },
      { text: 'Support at every stage of your career' },
      { text: 'Practical help with CVs, profiles and interviews' },
      { text: 'A focus on informed decisions and greater confidence' },
    ],
    image: '/assets/images/img-why.jpg',
  },

  cta: {
    heading: "Let's Build Something Meaningful",
    text: 'Tell us what you are looking for, and our team will connect with you to discuss your requirements and explore the right way forward.',
    button: 'Send Enquiry',
    image: '/assets/images/img-home-why.jpg',
  },
};

export default careerDefaults;
