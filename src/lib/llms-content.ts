import { AUTHOR, SITE_URL } from '@/config/site';
import { ABOUT_FACTS, ABOUT_PROSE } from '@/data/about';
import { EXPERIENCES } from '@/data/experience';
import { PROJECTS } from '@/data/projects';
import { SOCIAL_LINKS } from '@/data/social-links';
import { TALKS } from '@/data/talks';
import { TECH_STACK_GROUPS } from '@/data/tech-stack';

const ABOUT_BULLETS = [
  `${AUTHOR.jobTitle} with ${AUTHOR.yearsExperience} years of experience, based in ${AUTHOR.location}.`,
  `Currently at [${AUTHOR.employer.name}](${AUTHOR.employer.url}), building the consumer frontend for Socialmon.`,
  'Works across frontend architecture, state, data flow, performance, interaction design, and implementation.',
];

export function buildAboutSection(headingLevel: 1 | 2 = 2): string {
  const headingPrefix = '#'.repeat(headingLevel);
  const subheadingPrefix = '#'.repeat(headingLevel + 1);

  const lines: string[] = [
    `${headingPrefix} About`,
    '',
    ...ABOUT_BULLETS.map((bullet) => `- ${bullet}`),
    '',
    `${subheadingPrefix} Personal Information`,
    '',
    `- Name: ${AUTHOR.name}`,
    `- Role: ${AUTHOR.jobTitle} at ${AUTHOR.employer.name}`,
    `- Location: ${AUTHOR.location}`,
    `- Website: ${SITE_URL}`,
    '',
    `${subheadingPrefix} Social Links`,
    '',
    ...Object.values(SOCIAL_LINKS).map(
      (link) => `- [${link.label}](${link.href})`,
    ),
    '',
    `${subheadingPrefix} Tech Stack`,
    '',
    ...TECH_STACK_GROUPS.flatMap((group) => [
      `**${group.label}**`,
      '',
      ...group.items.map((item) => `- ${item.label}`),
      '',
    ]),
    `${subheadingPrefix} Background`,
    '',
    ...ABOUT_PROSE.flatMap((paragraph) => [paragraph, '']),
    '',
    `${subheadingPrefix} Quick Facts`,
    '',
    ...ABOUT_FACTS.map(
      (fact) => `- ${fact.key.replaceAll('_', ' ')}: ${fact.value}`,
    ),
    '',
  ];

  return lines.join('\n');
}

export function buildExperienceSection(headingLevel: 1 | 2 = 2): string {
  const headingPrefix = '#'.repeat(headingLevel);
  const subheadingPrefix = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${headingPrefix} Experience`, ''];

  for (const company of EXPERIENCES) {
    for (const role of company.roles) {
      const companyLabel = company.href
        ? `[${company.company}](${company.href})`
        : company.company;
      lines.push(`${subheadingPrefix} ${role.title} | ${companyLabel}`);
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
  const headingPrefix = '#'.repeat(headingLevel);
  const subheadingPrefix = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${headingPrefix} Projects`, ''];

  for (const project of PROJECTS) {
    lines.push(`${subheadingPrefix} ${project.name}`);
    lines.push('');
    if (project.liveUrl) lines.push(`Project URL: ${project.liveUrl}`);
    if (project.githubUrl) lines.push(`GitHub URL: ${project.githubUrl}`);
    lines.push(`Tech: ${project.tech.join(', ')}`);
    lines.push('');
    lines.push(`${project.tagline}. ${project.description}`);
    lines.push('');
  }

  return lines.join('\n');
}

export function buildSpeakingSection(headingLevel: 1 | 2 = 2): string {
  const headingPrefix = '#'.repeat(headingLevel);
  const subheadingPrefix = '#'.repeat(headingLevel + 1);

  const lines: string[] = [`${headingPrefix} Speaking`, ''];

  for (const talk of TALKS) {
    lines.push(`${subheadingPrefix} ${talk.title}`);
    lines.push('');
    lines.push(`Event: ${talk.event} ${talk.year}`);
    lines.push(`URL: ${talk.href}`);
    lines.push('');
    lines.push(talk.brief);
    lines.push('');
  }

  return lines.join('\n');
}
