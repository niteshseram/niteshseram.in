export const AUTHOR = {
  name: 'Nitesh Seram',
  jobTitle: 'Software Engineer',
  location: 'Assam, India',
  yearsExperience: '5+',
  employer: {
    name: 'GreatFrontEnd',
    url: 'https://www.greatfrontend.com',
    description: 'a platform for engineers prepping for frontend interviews',
  },
} as const;

export const WRITING = {
  path: '/writing',
  title: 'Writing',
  description: 'Notes on frontend, craft, and the small details.',
} as const;

export const SITE_URL = 'https://niteshseram.in';

export const SITE_DESCRIPTION = `Frontend engineer based in ${AUTHOR.location}. Building for the web with a soft spot for performance, restraint, and the small details that make software feel considered.`;

export const SITE_TAGLINE = {
  primary: 'Engineering for the web.',
  accent: 'Polished to the pixel.',
} as const;

export const SITE_LANGUAGE = 'en';
