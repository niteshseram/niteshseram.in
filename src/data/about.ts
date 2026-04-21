import type { IconType } from 'react-icons';
import { PiBarbell, PiFilmSlate } from 'react-icons/pi';

import { AUTHOR } from '@/config/site';

export const ABOUT_PROSE: readonly string[] = [
  `I didn't grow up planning to write CSS for a living. The plan — as far as plans go in a small town in ${AUTHOR.location} — was medicine. Engineering snuck up on me in 2015, and by the time I realized I'd chosen it for real, it already felt like the right wrong turn.`,
  "What pulled me toward the **frontend** specifically was the feedback loop. Backends have their own elegance, but the frontend gave me something immediate — a shape, a color, a transition that either feels right or doesn't. I spent the first few years learning how to make things work. The last few have been about making them feel good.",
  "I work best when I can trace a thread all the way through — from a rough idea, to the interaction that expresses it, to the edge cases nobody asks about until they hit one. I've come to trust boring code that never surprises anyone, and careful restraint over another dependency. Most of the craft, I think, is in what you choose to leave out.",
];

export type OffTheClockItem = {
  title: string;
  description: string;
  icon: IconType;
};

export const OFF_THE_CLOCK: readonly OffTheClockItem[] = [
  {
    title: 'At the gym',
    description:
      "A lot of my week runs through the gym. It's where I clear my head.",
    icon: PiBarbell,
  },
  {
    title: 'On the couch',
    description:
      'A legitimate hobby. Netflix, slow evenings, and nothing to prove.',
    icon: PiFilmSlate,
  },
];
