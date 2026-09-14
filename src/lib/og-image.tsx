import { ImageResponse } from 'next/og';

import { OG_THEME } from '@/config/og-theme';
import { AUTHOR, SITE_URL } from '@/config/site';
import { loadOgFonts } from '@/lib/og-font';
import { getOgTitleLayout } from '@/lib/og-title';

export const OG_SIZE = { width: 1200, height: 630 };

const siteDomain = new URL(SITE_URL).hostname;

type OgImageOptions = { title?: string };

function ReadingPattern() {
  const strokes = [];

  for (let row = 0; row < 46; row++) {
    const vertical = row * 14;
    // Leave a paragraph break after every seven lines.
    if (row % 8 === 7) continue;
    const lineScale = row % 8 === 6 ? 0.67 : 1;
    const leftWidth =
      (55 +
        370 * Math.exp(-1 * ((vertical - 64) / 112) ** 2) +
        110 * Math.exp(-1 * ((vertical - 595) / 100) ** 2)) *
      lineScale;
    const rightWidth =
      (55 +
        350 * Math.exp(-1 * ((vertical - 571) / 110) ** 2) +
        105 * Math.exp(-1 * ((vertical - 10) / 100) ** 2)) *
      lineScale;

    strokes.push(
      <line
        key={`left-${row}`}
        x1={0}
        y1={vertical}
        x2={leftWidth}
        y2={vertical}
      />,
      <line
        key={`right-${row}`}
        x1={1200 - rightWidth}
        y1={vertical}
        x2={1200}
        y2={vertical}
      />,
    );
  }

  return (
    <svg
      width={1200}
      height={630}
      viewBox="0 0 1200 630"
      style={{ position: 'absolute', left: 0, top: 0 }}
    >
      <g fill="none" stroke={OG_THEME.line} strokeWidth={1.5}>
        {strokes}
      </g>
    </svg>
  );
}

export async function createOgImage({ title }: OgImageOptions = {}) {
  const isArticle = title !== undefined;
  const { lines, fontSize } = isArticle
    ? getOgTitleLayout(title)
    : { lines: [AUTHOR.name], fontSize: 108 };

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: OG_THEME.background,
        color: OG_THEME.foreground,
        fontFamily: 'Geist',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReadingPattern />
      <div
        style={{
          display: 'flex',
          width: 1020,
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: -8,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 23,
            color: OG_THEME.muted,
            marginBottom: 30,
          }}
        >
          {isArticle ? `Writing / ${AUTHOR.name}` : 'Software engineer'}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize,
            fontWeight: 500,
            lineHeight: 1.13,
            letterSpacing: isArticle ? -2 : -4.5,
            textAlign: 'center',
          }}
        >
          {lines.map((line, index) => (
            <div key={index} style={{ display: 'flex' }}>
              {line}
            </div>
          ))}
        </div>
        {!isArticle && (
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 24,
              color: OG_THEME.muted,
            }}
          >
            Projects, notes, and things I’m figuring out.
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: 53,
          width: '100%',
          justifyContent: 'center',
          fontSize: 20,
          color: OG_THEME.footer,
        }}
      >
        {siteDomain}
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
