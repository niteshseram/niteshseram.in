import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function loadOgFonts() {
  const [medium, regular] = await Promise.all([
    readFile(
      path.join(
        process.cwd(),
        'node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf',
      ),
    ),
    readFile(
      path.join(
        process.cwd(),
        'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf',
      ),
    ),
  ]);

  return [
    {
      name: 'Geist',
      data: medium,
      weight: 500 as const,
      style: 'normal' as const,
    },
    {
      name: 'Geist',
      data: regular,
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}
