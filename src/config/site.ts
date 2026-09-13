export const AUTHOR = {
  name: 'Nitesh Seram',
  jobTitle: 'Software Engineer',
  location: 'Assam, India',
  timeZone: 'Asia/Kolkata',
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
  description:
    'Notes on frontend engineering, from the interface to the systems behind it.',
} as const;

export const PROJECTS_LABEL = 'Projects';

export const SITE_URL = 'https://niteshseram.in';

export const SITE_DESCRIPTION = `Senior software engineer based in ${AUTHOR.location}. I build frontend products and write about state, data flow, performance, browser behavior, and the systems behind interfaces.`;

export const SITE_LANGUAGE = 'en';

export const FEED = {
  path: '/rss.xml',
  title: `${WRITING.title} by ${AUTHOR.name}`,
  description: WRITING.description,
} as const;
