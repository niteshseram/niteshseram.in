import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';

import { OG_THEME } from '@/config/og-theme';
import { AUTHOR } from '@/config/site';
import { loadGeistFont } from '@/lib/og-font';

export const alt = `${AUTHOR.name} — ${AUTHOR.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const {
  background: BACKGROUND,
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

const centerColumnStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const subtitleStyle: CSSProperties = {
  display: 'flex',
  marginTop: 20,
  fontSize: 26,
  color: MUTED,
};

const footerRowStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const authorColumnStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const authorNameStyle: CSSProperties = {
  display: 'flex',
  fontSize: 24,
  fontWeight: 500,
  color: FOREGROUND,
  letterSpacing: -0.2,
};

const authorTitleStyle: CSSProperties = {
  display: 'flex',
  marginTop: 4,
  fontFamily: 'Geist',
  fontSize: 18,
  color: MUTED,
};

const locationRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontFamily: 'Geist Mono',
  fontSize: 16,
  color: MUTED,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
};

const locationDotStyle: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
  background: BRAND,
};

export default async function Image() {
  const [geist, geistMedium, geistMono] = await Promise.all([
    loadGeistFont('sans', 'Regular'),
    loadGeistFont('sans', 'Medium'),
    loadGeistFont('mono', 'Regular'),
  ]);

  return new ImageResponse(
    <div style={rootStyle}>
      <div style={centerColumnStyle}>
        <svg width="104" height="114" viewBox="0 0 188 200">
          <g transform="translate(0,200) scale(0.1,-0.1)" fill={FOREGROUND}>
            <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
            <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
          </g>
        </svg>
        <div style={subtitleStyle}>My little corner of the internet.</div>
      </div>

      <div style={footerRowStyle}>
        <div style={authorColumnStyle}>
          <div style={authorNameStyle}>{AUTHOR.name}</div>
          <div style={authorTitleStyle}>{AUTHOR.jobTitle}</div>
        </div>
        <div style={locationRowStyle}>
          <div style={locationDotStyle} />
          <div style={{ display: 'flex' }}>{AUTHOR.location}</div>
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
