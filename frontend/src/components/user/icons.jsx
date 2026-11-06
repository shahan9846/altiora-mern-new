// Small drawings shared by the public pages.
// They are fixed (the admin edits text and images, not icons).
// Each icon takes its color from the text color around it.

const lineProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 };

export const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const shieldIcon = (
  <svg {...lineProps}><path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" /></svg>
);

export const shieldCheckIcon = (
  <svg {...lineProps}>
    <path d="M12 3 5 6.5V11c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6.5L12 3Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

export const growthIcon = (
  <svg {...lineProps}>
    <path d="M3.5 18.5 9 12l4 3 7.5-8.5" />
    <path d="M15.5 6.5H20.5V11.5" />
  </svg>
);

export const ringsIcon = (
  <svg {...lineProps}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /></svg>
);

export const targetIcon = (
  <svg {...lineProps}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);

export const awardIcon = (
  <svg {...lineProps}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M9 14 7.5 21 12 18.5 16.5 21 15 14" />
  </svg>
);

export const peopleIcon = (
  <svg {...lineProps}>
    <circle cx="9" cy="8" r="3" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M16 14.2c2.6.4 4.5 2.4 4.5 5.3" />
  </svg>
);

export const handshakeIcon = (
  <svg {...lineProps}>
    <path d="M8 12.5 6 11a2.4 2.4 0 0 0-3 3.7l5 4.8 5-4.8m-3-2.2 1.8-1.7a2.4 2.4 0 0 1 3.4 3.4L14 17.5" />
  </svg>
);

export const bookIcon = (
  <svg {...lineProps}>
    <path d="M4 5.5c2.5-1 5.5-1 8 0v13c-2.5-1-5.5-1-8 0v-13Z" />
    <path d="M20 5.5c-2.5-1-5.5-1-8 0v13c2.5-1 5.5-1 8 0v-13Z" />
  </svg>
);

// The building icon shown on every service card
export const serviceIcon = (
  <svg {...lineProps}>
    <path d="M4 18V9l8-4 8 4v9" /><path d="M9 21v-6h6v6" /><path d="M4 10.5h16" />
  </svg>
);

// Contact details and social links
export const pinIcon = (
  <svg {...lineProps}>
    <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.4" />
  </svg>
);

export const phoneIcon = (
  <svg {...lineProps}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3.3a1 1 0 0 1-.5 1.1l-1.6.9a12 12 0 0 0 6.6 6.6l.9-1.6a1 1 0 0 1 1.1-.5l3.3.7a1 1 0 0 1 .8 1v2.2A1.5 1.5 0 0 1 18.5 20 14.5 14.5 0 0 1 4 5.5Z" />
  </svg>
);

export const mailIcon = (
  <svg {...lineProps}>
    <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" />
    <path d="m4.5 6.5 7.5 6 7.5-6" />
  </svg>
);

export const whatsappIcon = (
  <svg {...lineProps}>
    <path d="M6 18.5 6.9 15A7.5 7.5 0 1 1 9.8 17.6L6 18.5Z" />
    <path d="M9.3 9.7c0 2.9 2.4 5.3 5.3 5.3" />
  </svg>
);

export const instagramIcon = (
  <svg {...lineProps}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const facebookIcon = (
  <svg {...lineProps}>
    <path d="M14 8.5h2.5V5H14c-2.2 0-4 1.8-4 4v2H8v3h2v6.5h3V14h2.4l.6-3H13V9c0-.8.2-1.5 1-1.5Z" />
  </svg>
);

export const chevronDownIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
);
