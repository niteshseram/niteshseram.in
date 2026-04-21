import { AUTHOR, SITE_URL } from '@/config/site';
import { ABOUT_PROSE, OFF_THE_CLOCK } from '@/data/about';
import { EXPERIENCES } from '@/data/experience';
import { PROJECTS } from '@/data/projects';
import { SOCIAL_LINKS } from '@/data/social-links';
import { TALKS } from '@/data/talks';
import { TECH_STACKS } from '@/data/tech-stack';

const ABOUT_BULLETS = [
  `${AUTHOR.jobTitle} with ${AUTHOR.yearsExperience} years of experience, based in ${AUTHOR.location}.`,
  `Currently Senior Software Engineer at [${AUTHOR.employer.name}](${AUTHOR.employer.url}) — ${AUTHOR.employer.description} — leading the frontend for Socialmon, an AI-powered marketing intelligence product.`,
  'Focused on frontend craft — performance, typography, motion, and the small details that make software feel considered.',
];

export function buildAboutSection(headingLevel: 1 | 2 = 2): string {
  const h = '#'.repeat(headingLevel);
  const sub = '#'.repeat(headingLevel + 1);

  const lines: string[] = [
    `${h} About`,
    '',
    ...ABOUT_BULLETS.map((b) => `- ${b}`),
    '',
    `${sub} Personal Information`,
    '',
    `- Name: ${AUTHOR.name}`,
    `- Role: ${AUTHOR.jobTitle} at ${AUTHOR.employer.name}`,
    `- Location: ${AUTHOR.location}`,
    `- Website: ${SITE_URL}`,
    '',
    `${sub} Social Links`,
    '',
    ...Object.values(SOCIAL_LINKS).map(
      (link) => `- [${link.label}](${link.href})`,
    ),
    '',
    `${sub} Tech Stack`,
    '',
    ...TECH_STACKS.map((t) => `- ${t.label}`),
    '',
    `${sub} Background`,
    '',
    ...ABOUT_PROSE.flatMap((p) => [p, '']),
    `${sub} Off the Clock`,
    '',
    ...OFF_THE_CLOCK.map((item) => `- **${item.title}** — ${item.description}`),
    '',
  ];

  return lines.join('\n');
}

export function buildExperienceSection(headingLevel: 1 | 2 = 2): string {
  const h = '#'.repeat(headingLevel);
  const sub = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${h} Experience`, ''];

  for (const company of EXPERIENCES) {
    for (const role of company.roles) {
      const companyLabel = company.href
        ? `[${company.company}](${company.href})`
        : company.company;
      lines.push(`${sub} ${role.title} | ${companyLabel}`);
      lines.push('');
      lines.push(`Duration: ${role.start} - ${role.end}`);
      lines.push('');
      lines.push(role.brief);
      lines.push('');
    }
  }

  return lines.join('\n');
}

export function buildProjectsSection(headingLevel: 1 | 2 = 2): string {
  const h = '#'.repeat(headingLevel);
  const sub = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${h} Projects`, ''];

  for (const project of PROJECTS) {
    lines.push(`${sub} ${project.name}`);
    lines.push('');
    if (project.liveUrl) lines.push(`Project URL: ${project.liveUrl}`);
    lines.push(`GitHub URL: ${project.githubUrl}`);
    lines.push(`Tech: ${project.tech.join(', ')}`);
    lines.push('');
    lines.push(`${project.tagline}. ${project.description}`);
    lines.push('');
  }

  return lines.join('\n');
}

export function buildSpeakingSection(headingLevel: 1 | 2 = 2): string {
  const h = '#'.repeat(headingLevel);
  const sub = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${h} Speaking`, ''];

  for (const talk of TALKS) {
    lines.push(`${sub} ${talk.title}`);
    lines.push('');
    lines.push(`Event: ${talk.event} ${talk.year}`);
    lines.push(`URL: ${talk.href}`);
    lines.push('');
    lines.push(talk.brief);
    lines.push('');
  }

  return lines.join('\n');
}
