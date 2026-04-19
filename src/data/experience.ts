export type ExperienceRole = {
  title: string;
  brief: string;
  start: string;
  end: string;
  current?: boolean;
};

export type ExperienceCompany = {
  company: string;
  href?: string;
  roles: ExperienceRole[];
};

export const EXPERIENCES: ExperienceCompany[] = [
  {
    company: 'GreatFrontEnd',
    href: 'https://www.greatfrontend.com',
    roles: [
      {
        title: 'Senior Software Engineer',
        brief:
          'Leading the frontend for Socialmon — an AI-powered marketing intelligence product — owning the consumer surface end-to-end from zero to launch.',
        start: 'Mar 2026',
        end: 'Present',
        current: true,
      },
      {
        title: 'Software Engineer',
        brief:
          'Helped revamp GFE Interviews (1M+ pageviews), built GFE Projects end-to-end, and set up a dynamic MDX blog system for the GFE platform.',
        start: 'May 2024',
        end: 'Feb 2026',
      },
    ],
  },
  {
    company: 'Auzmor Inc.',
    href: 'https://auzmor.com',
    roles: [
      {
        title: 'Software Engineer III',
        brief:
          'Led performance work that lifted the app\u2019s Lighthouse score from 20 to 70, cutting load times and boosting engagement.',
        start: 'Jan 2023',
        end: 'Apr 2024',
      },
      {
        title: 'Software Engineer I',
        brief:
          'Shipped client-facing branding, email/authenticator 2FA, and an in-house real-time forum on Auzmor Learn. Named Most Valuable Performer.',
        start: 'Oct 2021',
        end: 'Dec 2022',
      },
    ],
  },
];
