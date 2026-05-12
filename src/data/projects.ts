export type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'OGCanvas',
    tagline: 'Open Graph image editor',
    description:
      'An Open Graph image generator with a drag-and-drop editor and a curated set of beautiful templates for stunning social previews.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Zustand', 'Konva.js'],
    liveUrl: 'https://ogcanvas.niteshseram.in?utm_source=portfolio',
  },
  {
    name: 'Masonix',
    tagline: 'React library',
    description:
      'A React masonry layout library that gets the fundamentals right — correct reading order, balanced columns, and optional virtualization for 10k+ item feeds.',
    tech: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/niteshseram/masonix',
    liveUrl: 'https://masonix.vercel.app?utm_source=portfolio',
  },
  {
    name: 'niteshseram.in',
    tagline: 'Personal site',
    description:
      'This very site — a personal portfolio built with care for typography, motion, and the small details.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/niteshseram/niteshseram.in',
    liveUrl: 'https://niteshseram.in?utm_source=portfolio',
  },
];
