import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';

import { AUTHOR, SITE_TAGLINE } from '@/config/site';
import { loadGeistFont, loadGoogleFont } from '@/lib/og-font';

export const alt = `${AUTHOR.name} — ${AUTHOR.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BACKGROUND = '#070504';
const BORDER = '#2a2520';
const FOREGROUND = '#e8e2d9';
const MUTED = '#9c938b';
const BRAND = '#8cb6db';

const rootStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 72,
  background: BACKGROUND,
  backgroundImage: `radial-gradient(circle at 50% 38%, ${BRAND}33 0%, transparent 55%), radial-gradient(${BORDER} 1px, transparent 1px)`,
  backgroundSize: '100% 100%, 28px 28px',
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

const taglineStyle: CSSProperties = {
  display: 'flex',
  marginTop: 56,
  fontFamily: 'Instrument Serif',
  fontStyle: 'italic',
  fontSize: 64,
  lineHeight: 1,
  letterSpacing: -1.2,
  color: BRAND,
};

const subtitleStyle: CSSProperties = {
  display: 'flex',
  marginTop: 16,
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
  fontFamily: 'Instrument Serif',
  fontStyle: 'italic',
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
  const [
    geist,
    geistMedium,
    instrumentSerif,
    instrumentSerifItalic,
    geistMono,
  ] = await Promise.all([
    loadGeistFont('sans', 'Regular'),
    loadGeistFont('sans', 'Medium'),
    loadGoogleFont('Instrument Serif', 400),
    loadGoogleFont('Instrument Serif', 400, 'italic'),
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
        <div style={taglineStyle}>{SITE_TAGLINE.accent}</div>
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
          name: 'Instrument Serif',
          data: instrumentSerif,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Instrument Serif',
          data: instrumentSerifItalic,
          weight: 400,
          style: 'italic',
        },
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
