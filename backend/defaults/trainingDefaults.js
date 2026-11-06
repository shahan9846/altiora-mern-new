// The original training areas and their programs.
// They are added to the database once, the first time the server starts with no categories.
// After that, the admin manages them in the dashboard.
const trainingDefaults = [
  {
    name: 'Communication & Professional Skills',
    description:
      'Developing essential workplace capabilities including communication, presentation, business writing, negotiation, collaboration, and interpersonal effectiveness',
    programs: [
      {
        title: 'Presentation & Business Writing Skills',
        text: 'Building the confidence and technique to present ideas and write clearly for business audiences.',
        tags: ['Plan and structure a presentation', 'Deliver with confidence and impact', 'Write clear emails, reports and proposals'],
      },
      {
        title: 'Negotiation & Influencing Skills',
        text: 'Practical techniques for negotiating outcomes and influencing stakeholders without formal authority.',
        tags: ['Prepare and structure a negotiation', 'Identify shared interests and trade-offs', 'Influence with credibility and rapport'],
      },
    ],
  },
  {
    name: 'Leadership & Management Development',
    description:
      'Building confident leaders with the skills to lead people, make effective decisions, manage performance, and navigate workplace challenges.',
    programs: [
      {
        title: 'Strategic Decision-Making for Managers',
        text: 'Equipping managers to evaluate options, weigh trade-offs and make sound decisions under pressure.',
        tags: ['Apply structured decision-making frameworks', 'Balance risk, data and judgement', 'Communicate decisions with clarity'],
      },
      {
        title: 'Managing Performance & Developing Teams',
        text: 'Practical skills for setting expectations, giving feedback and managing performance across a team.',
        tags: ['Set clear, measurable performance expectations', 'Give constructive feedback and coach for improvement', 'Run effective one-to-ones and reviews'],
      },
    ],
  },
  {
    name: 'Individual Development Planning',
    description:
      'A structured approach to professional growth, designed around individual strengths, development needs, and career goals.',
    programs: [
      {
        title: 'Career Goals & Development Pathways',
        text: 'Linking individual aspirations with organizational priorities to create focused development pathways.',
        tags: ['Clarify career aspirations and priorities', 'Align personal goals with organizational needs', 'Map the skills and experience needed for progression'],
      },
      {
        title: 'Tracking Progress & Sustaining Growth',
        text: 'Helping professionals review their progress, adjust their plans and keep learning after the training ends.',
        tags: ['Measure progress against development goals', 'Review and adjust the plan regularly', 'Build habits that support continuous learning'],
      },
    ],
  },
  {
    name: 'Banking & Financial Services',
    description:
      'Industry-focused learning designed to strengthen knowledge and professional capabilities within the banking and financial services sector',
    programs: [
      {
        title: 'Financial Services Regulatory Essentials',
        text: 'Foundational awareness of the regulatory environment and professional standards in banking and financial services.',
        tags: ['Outline the main regulatory expectations of the sector', 'Understand professional and ethical standards', 'Recognise regulatory risk in daily activities'],
      },
      {
        title: 'Customer Needs & Financial Product Knowledge',
        text: 'Building the product knowledge and conversation skills needed to serve banking and financial customers well.',
        tags: ['Explain key financial products clearly', 'Identify customer needs through effective questioning', 'Match solutions to customer situations'],
      },
    ],
  },
  {
    name: 'Compliance, Risk & Governance',
    description:
      'Programs supporting awareness and understanding across compliance, financial crime, risk management, governance, ethics, and responsible business practices.',
    programs: [
      {
        title: 'Financial Crime Awareness: AML & Fraud Prevention',
        text: 'Awareness of financial crime risks and the warning signs staff should recognise and report.',
        tags: ['Describe money laundering and fraud risks', 'Recognise red flags and suspicious activity', 'Follow reporting and escalation procedures'],
      },
      {
        title: 'Risk Management, Governance & Ethics',
        text: 'An introduction to managing risk, good governance and ethical decision-making in the workplace.',
        tags: ['Identify and assess common business risks', 'Understand governance roles and accountability', 'Apply ethical principles to workplace decisions'],
      },
    ],
  },
  {
    name: 'Customer Experience & Service Excellence',
    description:
      'Developing the skills and mindset required to deliver professional, consistent, and customer-focused experiences.',
    programs: [
      {
        title: 'Delivering a Consistent Customer Experience',
        text: 'Building the mindset and habits behind a reliable, customer-focused experience at every touchpoint.',
        tags: ['Understand what customers expect at each touchpoint', 'Set and keep service standards', 'Work across teams to resolve customer issues'],
      },
      {
        title: 'Handling Difficult Customers & Complaints',
        text: 'Practical techniques for de-escalating tension and resolving complaints in a professional way.',
        tags: ['Stay composed in challenging interactions', 'De-escalate frustration through active listening', 'Resolve complaints and follow up effectively'],
      },
    ],
  },
  {
    name: 'Project & Change Management',
    description:
      'Building practical capabilities in project execution, stakeholder management, change readiness, adaptability, and implementation.',
    programs: [
      {
        title: 'Stakeholder Management & Engagement',
        text: 'Identifying, understanding and engaging stakeholders to support successful project delivery.',
        tags: ['Identify and prioritise stakeholders', 'Understand stakeholder needs and influence', 'Plan effective engagement and communication'],
      },
      {
        title: 'Leading Change & Building Adaptability',
        text: 'Helping teams prepare for, adopt and sustain change with greater readiness and resilience.',
        tags: ['Understand how people respond to change', 'Build change readiness within teams', 'Communicate change clearly and consistently'],
      },
    ],
  },
  {
    name: 'Workplace Effectiveness',
    description:
      'Programs designed to strengthen practical workplace capabilities including time management, problem-solving, decision-making, collaboration, emotional intelligence, and productivity.',
    programs: [
      {
        title: 'Personal Effectiveness & Time Management',
        text: 'Helping professionals prioritise, focus and manage workload with less friction and more consistency.',
        tags: ['Prioritise using proven planning frameworks', 'Reduce time lost to low-value tasks', 'Build sustainable daily work habits'],
      },
      {
        title: 'Problem Solving & Critical Thinking',
        text: 'A practical toolkit for identifying root causes and developing workable solutions at work.',
        tags: ['Apply root-cause analysis techniques', 'Evaluate options objectively', 'Make well-reasoned decisions'],
      },
    ],
  },
  {
    // Has no programs yet, so it does not show on the Training page (the admin can add some)
    name: 'Customized Corporate Training',
    description:
      'Have a specific development need? We can work with your organization to understand the requirement and develop a training solution aligned with your objectives, audience, and desired outcomes.',
    programs: [],
  },
];

export default trainingDefaults;
