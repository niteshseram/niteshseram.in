export type TimelineEntry = {
  tag: string;
  title: string;
  description: string;
  highlights?: string[];
};

export type TimelineYear = {
  year: string;
  entries: TimelineEntry[];
};

export const TIMELINE: TimelineYear[] = [
  {
    year: '2026',
    entries: [
      {
        tag: 'Role',
        title: 'Senior Software Engineer at GreatFrontEnd',
        description:
          'Promoted to Senior and started building a new consumer product.',
        highlights: [
          'Building the consumer frontend for Socialmon, a marketing intelligence platform for discovering, saving, and sharing viral content from LinkedIn, Instagram, and X.',
          'Working on product decisions, frontend architecture, component abstractions, API integrations, and implementation.',
          'Tech stack: Next.js, TypeScript, Tailwind, Base UI, Prisma, Supabase, Zod, tRPC, React Query, Cloudflare, Upstash, Motion',
        ],
      },
    ],
  },
  {
    year: '2025',
    entries: [
      {
        tag: 'Talk',
        title: 'Spoke at React India',
        description:
          'Presented Langnostic - a fast, scalable translation system built at GreatFrontEnd that continuously translates thousands of strings across React components and Markdown docs using AI, now powering all of GFE\u2019s localized content.',
      },
    ],
  },
  {
    year: '2024',
    entries: [
      {
        tag: 'Role',
        title: 'Software Engineer at GreatFrontEnd',
        description:
          'Joined GreatFrontEnd and spent a couple of years deep in product and platform work.',
        highlights: [
          'Helped rebuild GreatFrontEnd Interviews (1M+ pageviews), including its UI, UX flows, and accessibility.',
          'Built the frontend and backend for GreatFrontEnd Projects, a collection of 50+ real-world frontend challenges used by thousands of people each month.',
          'Built the MDX blog system for the GFE platform with Next.js and Contentlayer.',
          'Wrote frontend technical content for marketing pages and helped increase sign-ups by 15%.',
          'Mentored an engineering intern through day-to-day implementation, code review, and unblocking.',
        ],
      },
    ],
  },
  {
    year: '2023',
    entries: [
      {
        tag: 'Promotion',
        title: 'Software Engineer III at Auzmor',
        description:
          'Promoted to SE III and moved from individual features to platform work.',
        highlights: [
          'Led performance work across Auzmor Learn and raised its Lighthouse score from 20 to 70.',
        ],
      },
    ],
  },
  {
    year: '2022',
    entries: [
      {
        tag: 'Award',
        title: 'Most Valuable Performer at Auzmor',
        description:
          'Recognized for contributions across features, security, and team processes during the year.',
      },
    ],
  },
  {
    year: '2021',
    entries: [
      {
        tag: 'Role',
        title: 'Software Engineer I at Auzmor',
        description:
          "Started my first real engineering role, shipping features for Auzmor Learn, the company's LMS product.",
        highlights: [
          'Implemented client-facing branding across Auzmor Learn, including colors, favicons, logos, login layouts, and banners, adopted by 100% of clients.',
          'Added email-based OTP and authenticator-app 2FA.',
          'Designed and built an in-house real-time forum for Auzmor Learn.',
          'Changed the sprint process and reduced project delivery time by 25%.',
        ],
      },
      {
        tag: 'Open source',
        title: 'First open source contributions',
        description:
          'Started contributing to Kubernetes docs and learned its review culture and versioned release process.',
      },
    ],
  },
  {
    year: '2020',
    entries: [
      {
        tag: 'First job',
        title: 'Programmer Analyst Trainee at Cognizant',
        description:
          'Joined Cognizant during the pandemic as my first industry role. I got my first look at how a large software organization builds software and learned Java full-stack in the deep end.',
      },
      {
        tag: 'Milestone',
        title: 'Graduated in Computer Science',
        description:
          'Finished my degree at Assam Don Bosco University with a virtual convocation, courtesy of COVID.',
      },
    ],
  },
  {
    year: '2016',
    entries: [
      {
        tag: 'Milestone',
        title: 'Moved from Silchar for university',
        description:
          'Packed up and left home for the first time to study Computer Science at Assam Don Bosco University.',
      },
    ],
  },
  {
    year: '2015',
    entries: [
      {
        tag: 'Choice',
        title: 'Chose engineering over medicine',
        description:
          'I thought I\u2019d be a doctor. Turned out engineering was the better fit — and the choice that shaped everything since.',
      },
    ],
  },
  {
    year: '2013',
    entries: [
      {
        tag: 'Milestone',
        title: 'Started higher secondary',
        description:
          'Started the two years of higher secondary that led to the choice between medicine and engineering.',
      },
    ],
  },
];
