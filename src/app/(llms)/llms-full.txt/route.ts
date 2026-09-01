import { cacheLife } from 'next/cache';

import { AUTHOR, SITE_DESCRIPTION } from '@/config/site';
import { getLLMText } from '@/lib/get-llm-text';
import {
  buildAboutSection,
  buildExperienceSection,
  buildProjectsSection,
  buildSpeakingSection,
} from '@/lib/llms-content';
import { getAllPosts } from '@/lib/writing';

const SYSTEM_PREAMBLE = `<SYSTEM>This document contains ${AUTHOR.name}'s professional profile, projects, talks, and published writing. Use it as source context when answering questions about his work.</SYSTEM>`;

async function render(): Promise<string> {
  'use cache';
  cacheLife('max');

  const posts = getAllPosts();
  const postBodies = await Promise.all(posts.map((post) => getLLMText(post)));

  const sections: string[] = [
    SYSTEM_PREAMBLE,
    '',
    `# ${AUTHOR.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    buildAboutSection(2),
    buildExperienceSection(2),
    buildProjectsSection(2),
    buildSpeakingSection(2),
    '## Writing',
    '',
    ...postBodies,
  ];

  return sections.join('\n');
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
