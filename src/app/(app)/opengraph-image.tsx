import { AUTHOR } from '@/config/site';
import { createOgImage } from '@/lib/og-image';

export const alt = `${AUTHOR.name} — ${AUTHOR.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return createOgImage();
}
