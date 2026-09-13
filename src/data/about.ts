import { AUTHOR } from '@/config/site';

export const ABOUT_PROSE: readonly string[] = [
  `I didn't grow up planning to write CSS for a living. As far as plans go in a small town in ${AUTHOR.location}, mine was medicine. Engineering snuck up on me in 2015. By the time I realized I'd chosen it for real, it already felt like the right wrong turn.`,
  'What pulled me toward the **frontend** specifically was the feedback loop. Backends have their own elegance, but the frontend let me see immediately whether a shape, color, or transition felt right. I spent the first few years learning how to make things work. The last few have been about making them feel good.',
  "I work best when I can trace a thread from a rough idea to the interaction that expresses it and the edge cases nobody asks about until they hit one. I've come to trust boring code that never surprises anyone, and careful restraint over another dependency. Most of the craft, I think, is in what you choose to leave out.",
];

export type Principle = {
  title: string;
  description: string;
};

export const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Make the interface feel right.',
    description:
      "The frontend gives immediate feedback: a shape, color, or transition either feels right or it doesn't. That yes-or-no keeps me honest.",
  },
  {
    title: 'The craft is in what you leave out.',
    description:
      'I trust boring code that never surprises anyone over a clever abstraction. Every dependency adds another moving part. Fewer moving parts, fewer regrets.',
  },
  {
    title: 'Trace the thread end to end.',
    description:
      'I want to own the path from a rough idea to the interaction that expresses it and the edge cases nobody asks about until they hit one.',
  },
];

export type AboutFact = {
  key: string;
  value: string;
};

export const ABOUT_FACTS: readonly AboutFact[] = [
  { key: 'location', value: `${AUTHOR.location}` },
  { key: 'timezone', value: `${AUTHOR.timeZone} · GMT+5:30` },
  { key: 'role', value: `Senior SWE at ${AUTHOR.employer.name}` },
  { key: 'focus', value: 'UI systems, motion, performance' },
  {
    key: 'off_the_clock',
    value: 'Gym, the couch, Netflix with nothing to prove',
  },
  { key: 'uptime', value: `${AUTHOR.yearsExperience} yrs shipping` },
];
