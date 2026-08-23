import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';

import { OG_THEME } from '@/config/og-theme';
import { AUTHOR } from '@/config/site';
import { loadGeistFont } from '@/lib/og-font';
import { getAllPosts, getPostBySlug } from '@/lib/writing';

export const alt = `${AUTHOR.name} — Writing`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugs[0] }));
}

const {
  background: BACKGROUND,
  border: BORDER,
  foreground: FOREGROUND,
  muted: MUTED,
  brand: BRAND,
} = OG_THEME;

const rootStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 72,
  background: BACKGROUND,
  color: FOREGROUND,
  fontFamily: 'Geist',
};

const topRowStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const topRightLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontFamily: 'Geist Mono',
  fontSize: 16,
  color: MUTED,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
};

const topAccentBarStyle: CSSProperties = {
  width: 24,
  height: 2,
  background: BRAND,
};

const titleAreaStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: 32,
};

const titleStyle: CSSProperties = {
  display: 'flex',
  fontFamily: 'Geist',
  fontSize: 54,
  fontWeight: 500,
  lineHeight: 1.08,
  letterSpacing: -1.8,
  color: FOREGROUND,
};

const summaryStyle: CSSProperties = {
  display: 'flex',
  marginTop: 28,
  maxWidth: 1000,
  fontSize: 22,
  lineHeight: 1.4,
  color: MUTED,
};

const footerRowStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 24,
  borderTop: `1px solid ${BORDER}`,
};

const authorColumnStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const authorNameStyle: CSSProperties = {
  display: 'flex',
  fontSize: 20,
  fontWeight: 500,
  color: FOREGROUND,
  letterSpacing: -0.2,
};

const authorRoleStyle: CSSProperties = {
  display: 'flex',
  marginTop: 2,
  fontFamily: 'Geist',
  fontSize: 18,
  color: MUTED,
};

const metaRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  fontFamily: 'Geist Mono',
  fontSize: 16,
  color: MUTED,
  letterSpacing: 1,
  textTransform: 'uppercase',
};

const metaDotStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRadius: 999,
  background: BORDER,
};

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, summary, publishedAt } = post.data;
  const publishedLabel = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const minutes = Math.max(1, Math.round(post.data.readingTime.minutes));

  const titleCap = 100;
  const displayTitle =
    title.length > titleCap ? `${title.slice(0, titleCap).trimEnd()}…` : title;

  const summaryCap = 260;
  const displaySummary =
    summary && summary.length > summaryCap
      ? `${summary.slice(0, summaryCap).trimEnd()}…`
      : summary;

  const [geist, geistMedium, geistMono] = await Promise.all([
    loadGeistFont('sans', 'Regular'),
    loadGeistFont('sans', 'Medium'),
    loadGeistFont('mono', 'Regular'),
  ]);

  return new ImageResponse(
    <div style={rootStyle}>
      <div style={topRowStyle}>
        <svg width="40" height="44" viewBox="0 0 188 200">
          <g transform="translate(0,200) scale(0.1,-0.1)" fill={FOREGROUND}>
            <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
            <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
          </g>
        </svg>
        <div style={topRightLabelStyle}>
          <div style={topAccentBarStyle} />
          <div style={{ display: 'flex' }}>Writing</div>
        </div>
      </div>

      <div style={titleAreaStyle}>
        <div style={titleStyle}>{displayTitle}</div>
        {displaySummary ? (
          <div style={summaryStyle}>{displaySummary}</div>
        ) : null}
      </div>

      <div style={footerRowStyle}>
        <div style={authorColumnStyle}>
          <div style={authorNameStyle}>{AUTHOR.name}</div>
          <div style={authorRoleStyle}>Software Engineer</div>
        </div>
        <div style={metaRowStyle}>
          <div style={{ display: 'flex' }}>{publishedLabel}</div>
          <div style={metaDotStyle} />
          <div style={{ display: 'flex' }}>{minutes} min read</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geist, weight: 400, style: 'normal' },
        { name: 'Geist', data: geistMedium, weight: 500, style: 'normal' },
        {
          name: 'Geist Mono',
          data: geistMono,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}
