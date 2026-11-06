// The five original services.
// They are added to the database once, the first time the server starts with no services.
// After that, the admin manages the services in the dashboard.
const servicesDefaults = [
  {
    slug: 'corporate-training-learning-and-development',
    title: 'Corporate Training & Learning and Development',
    text: 'We support organizations in developing the capabilities required for stronger individual, team, and business performance through relevant and practical learning interventions.',
    image: '/assets/images/service-corporate-training.webp',
  },
  {
    slug: 'customized-training-solutions',
    title: 'Customized Training Solutions',
    text: 'Every organization has unique development requirements. We work with clients to understand their objectives, target audience, and expected outcomes before developing or recommending an appropriate learning solution.',
    image: '/assets/images/service-customized-training.webp',
  },
  {
    slug: 'professional-development',
    title: 'Professional Development',
    text: 'We support professionals in strengthening the knowledge, skills, and capabilities required to progress in today’s evolving workplace.',
    image: '/assets/images/service-professional-development.webp',
  },
  {
    slug: 'organizational-capability-development',
    title: 'Organizational Capability Development',
    text: 'We help organizations identify development priorities and capability gaps, and translate them into focused learning and development actions that support workforce performance.',
    image: '/assets/images/service-organizational-capability.webp',
  },
  {
    slug: 'career-guidance-development',
    title: 'Career Guidance & Development',
    text: 'We provide career development support for professionals, graduates, and emerging talent through career planning, CV and profile development, interview preparation, and professional development guidance.',
    image: '/assets/images/service-career-guidance.webp',
  },
];

export default servicesDefaults;
