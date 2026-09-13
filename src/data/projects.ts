export type Project = {
  name: string;
  tagline: string;
  summary: string;
  featured: boolean;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'OGCanvas',
    tagline: 'Open Graph image editor',
    summary: 'An Open Graph image editor with reusable templates.',
    featured: true,
    description:
      'An Open Graph image generator with a drag-and-drop editor and a curated set of templates for social previews.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Zustand', 'Konva.js'],
    liveUrl: 'https://www.theogcanvas.com?utm_source=portfolio',
  },
  {
    name: 'Masonix',
    tagline: 'React library',
    summary:
      'A React masonry library with correct reading order and optional virtualization.',
    featured: true,
    description:
      'A React masonry layout library with correct reading order, balanced columns, and optional virtualization for feeds with 10k+ items.',
    tech: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/niteshseram/masonix',
    liveUrl: 'https://masonix.vercel.app?utm_source=portfolio',
  },
  {
    name: 'niteshseram.in',
    tagline: 'Personal site',
    summary: 'My portfolio and writing about frontend engineering.',
    featured: false,
    description:
      'This portfolio and writing site, built with Next.js, React, TypeScript, and Tailwind CSS.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/niteshseram/niteshseram.in',
    liveUrl: 'https://niteshseram.in?utm_source=portfolio',
  },
];
