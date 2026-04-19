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
          'Promoted to Senior and handed the reins on a new consumer product.',
        highlights: [
          'Leading the end-to-end frontend for Socialmon — an AI-powered marketing intelligence platform for discovering, sharing, and saving viral content from LinkedIn, Instagram, and X.',
          'Sole engineer on the consumer product surface — architecting and building the frontend from zero to launch.',
          'Establishing the frontend architecture patterns, component abstractions, and API design decisions that will scale with the product.',
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
          'Presented Langnostic — a fast, scalable translation system built at GreatFrontEnd that continuously translates thousands of strings across React components and Markdown docs using AI, now powering all of GFE\u2019s localized content.',
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
          'Contributed to the revamp of GreatFrontEnd Interviews (1M+ pageviews) — modernizing the UI, restructuring UX flows, and improving accessibility and engagement.',
          'Built both frontend and backend for GreatFrontEnd Projects — a platform of 50+ curated real-world frontend challenges serving thousands of monthly active users.',
          'Developed a dynamic, scalable MDX blog system (Next.js + Contentlayer) powering the GFE platform.',
          'Wrote frontend-focused technical content for marketing pages, contributing to a 15% increase in sign-ups.',
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
          'Promoted to SE III — moved from shipping individual features to broader platform work.',
        highlights: [
          'Led performance optimization across Auzmor Learn, lifting the Lighthouse score from 20 to 70 — meaningfully improving load time and user engagement.',
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
          'Started my first real engineering role, shipping features for Auzmor Learn — their LMS.',
        highlights: [
          'Implemented client-facing branding across Auzmor Learn — primary/secondary colors, favicon, logo, login layouts, and banners — adopted by 100% of clients.',
          'Built email-based OTP and authenticator-app 2FA, strengthening the platform\u2019s security posture.',
          'Designed and built an in-house real-time forum for Auzmor Learn, enabling peer interaction and knowledge sharing.',
          'Optimized the sprint lifecycle process, reducing project delivery time by 25% and improving team throughput.',
        ],
      },
      {
        tag: 'Open source',
        title: 'First open source contributions',
        description:
          'Started contributing to Kubernetes docs. First real taste of collaborating at scale — review culture, versioned releases, and all.',
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
          'Joined Cognizant during the pandemic as my first industry role. Got my first taste of how software gets built at scale and learned Java full-stack in the deep end.',
      },
      {
        tag: 'Milestone',
        title: 'Graduated in Computer Science',
        description:
          'Finished my degree at Assam Don Bosco University — with a virtual convocation, courtesy of COVID.',
      },
    ],
  },
  {
    year: '2016',
    entries: [
      {
        tag: 'Milestone',
        title: 'Moved to Silchar for university',
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
          'Thought I\u2019d be a doctor. Turned out engineering was the better fit — and the choice that shaped everything since.',
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
          'The two-year stretch that would quietly decide what I\u2019d study for the rest of my twenties.',
      },
    ],
  },
];
