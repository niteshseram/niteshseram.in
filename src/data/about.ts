import { AUTHOR } from '@/config/site';

export const ABOUT_PROSE: readonly string[] = [
  `I didn't grow up planning to write CSS for a living. The plan — as far as plans go in a small town in ${AUTHOR.location} — was medicine. Engineering snuck up on me in 2015, and by the time I realized I'd chosen it for real, it already felt like the right wrong turn.`,
  "What pulled me toward the **frontend** specifically was the feedback loop. Backends have their own elegance, but the frontend gave me something immediate — a shape, a color, a transition that either feels right or doesn't. I spent the first few years learning how to make things work. The last few have been about making them feel good.",
  "I work best when I can trace a thread all the way through — from a rough idea, to the interaction that expresses it, to the edge cases nobody asks about until they hit one. I've come to trust boring code that never surprises anyone, and careful restraint over another dependency. Most of the craft, I think, is in what you choose to leave out.",
];

export type Principle = {
  hash: string;
  type: string;
  title: string;
  description: string;
};

export const PRINCIPLES: readonly Principle[] = [
  {
    hash: 'a1f3c82',
    type: 'feat(feel)',
    title: 'Make it feel right, not just work.',
    description:
      "Working is the floor. A shape, a color, a transition that feels right is what I'm actually aiming at — the frontend's immediate yes-or-no is what keeps me honest.",
  },
  {
    hash: '7d94b15',
    type: 'refactor(restraint)',
    title: 'The craft is in what you leave out.',
    description:
      'Boring code that never surprises anyone beats a clever abstraction, and most dependencies I add come back to haunt me. Fewer moving parts, fewer regrets.',
  },
  {
    hash: '3e6f2ab',
    type: 'chore(threads)',
    title: 'Trace the thread end to end.',
    description:
      "From a rough idea, to the interaction that expresses it, to the edge cases nobody asks about until they hit one — I'd rather own the whole thread than hand off half of it.",
  },
];

export type AboutFact = {
  key: string;
  value: string;
};

export const ABOUT_FACTS: readonly AboutFact[] = [
  { key: 'location', value: `${AUTHOR.location}` },
  { key: 'timezone', value: 'Asia/Kolkata — GMT+5:30' },
  { key: 'role', value: `Senior SWE at ${AUTHOR.employer.name}` },
  { key: 'focus', value: 'UI systems, motion, performance' },
  {
    key: 'off_the_clock',
    value: 'Gym, the couch, Netflix with nothing to prove',
  },
  { key: 'uptime', value: `${AUTHOR.yearsExperience} yrs shipping` },
];
