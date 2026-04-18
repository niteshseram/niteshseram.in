export type Talk = {
  title: string;
  event: string;
  year: string;
  brief: string;
  youtubeId: string;
  href: string;
};

export const TALKS: Talk[] = [
  {
    title: 'Langnostic: Translating React apps with AI at scale',
    event: 'React India',
    year: '2025',
    brief:
      'Translating web apps has long been a painful, manual effort — strings scattered across code, Markdown, and more. I walked through Langnostic, a fast, scalable translation system built at GreatFrontEnd that continuously translates thousands of strings across React components and Markdown docs using AI — now powering all of GreatFrontEnd\u2019s localized content.',
    youtubeId: '4WawRIS85yo',
    href: 'https://youtu.be/4WawRIS85yo',
  },
];
