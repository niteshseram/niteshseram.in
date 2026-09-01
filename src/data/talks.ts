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
      'At React India, I talked about Langnostic, a translation system built at GreatFrontEnd that translates thousands of strings across React components and Markdown docs using AI. It now powers GreatFrontEnd\u2019s localized content.',
    youtubeId: '4WawRIS85yo',
    href: 'https://youtu.be/4WawRIS85yo',
  },
];
