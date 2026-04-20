import { ImageResponse } from 'next/og';

import { AUTHOR, SITE_TAGLINE } from '@/config/site';
import { loadGoogleFont } from '@/lib/og-font';

export const alt = `${AUTHOR.name} — ${AUTHOR.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BACKGROUND = '#070504';
const BORDER = '#2a2520';
const FOREGROUND = '#e8e2d9';
const MUTED = '#9c938b';
const BRAND = '#8cb6db';

export default async function Image() {
  const [
    dmSans,
    dmSansMedium,
    instrumentSerif,
    instrumentSerifItalic,
    jetBrainsMono,
  ] = await Promise.all([
    loadGoogleFont('DM Sans', 400),
    loadGoogleFont('DM Sans', 500),
    loadGoogleFont('Instrument Serif', 400),
    loadGoogleFont('Instrument Serif', 400, 'italic'),
    loadGoogleFont('JetBrains Mono', 400),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 72,
        background: BACKGROUND,
        backgroundImage: `radial-gradient(circle at 50% 38%, ${BRAND}33 0%, transparent 55%), radial-gradient(${BORDER} 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 28px 28px',
        color: FOREGROUND,
        fontFamily: 'DM Sans',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="104" height="114" viewBox="0 0 188 200">
          <g transform="translate(0,200) scale(0.1,-0.1)" fill={FOREGROUND}>
            <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
            <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
          </g>
        </svg>
        <div
          style={{
            display: 'flex',
            marginTop: 56,
            fontFamily: 'Instrument Serif',
            fontStyle: 'italic',
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: -1.2,
            color: BRAND,
          }}
        >
          {SITE_TAGLINE.accent}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 16,
            fontSize: 26,
            color: MUTED,
          }}
        >
          My little corner of the internet.
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 500,
              color: FOREGROUND,
              letterSpacing: -0.2,
            }}
          >
            {AUTHOR.name}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 4,
              fontFamily: 'Instrument Serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: MUTED,
            }}
          >
            {AUTHOR.jobTitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'JetBrains Mono',
            fontSize: 16,
            color: MUTED,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: BRAND,
            }}
          />
          <div style={{ display: 'flex' }}>{AUTHOR.location}</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' },
        { name: 'DM Sans', data: dmSansMedium, weight: 500, style: 'normal' },
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
          name: 'JetBrains Mono',
          data: jetBrainsMono,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
}
