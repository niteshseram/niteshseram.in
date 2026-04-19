import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

import { SITE_NAME } from '@/config/site';
import { loadGoogleFont } from '@/lib/og-font';
import { getAllPosts, getPostBySlug } from '@/lib/writing';

export const alt = `${SITE_NAME} — Writing`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugs[0] }));
}

const BACKGROUND = '#17140f';
const BORDER = '#2a2520';
const FOREGROUND = '#e8e2d9';
const MUTED = '#9c938b';
const BRAND = '#d17948';

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
        backgroundImage: `radial-gradient(circle at 0% 0%, ${BRAND}1f 0%, transparent 45%), radial-gradient(${BORDER} 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 28px 28px',
        color: FOREGROUND,
        fontFamily: 'DM Sans',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="40" height="44" viewBox="0 0 188 200">
            <g transform="translate(0,200) scale(0.1,-0.1)" fill={FOREGROUND}>
              <path d="M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z" />
              <path d="M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84 165 -239 238 -526 249 l-148 6 0 -912z" />
            </g>
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 500,
              color: FOREGROUND,
              letterSpacing: -0.2,
            }}
          >
            {SITE_NAME}
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
          <div style={{ width: 24, height: 2, background: BRAND }} />
          <div style={{ display: 'flex' }}>Writing</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 32,
        }}
      >
        <div
          style={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            fontFamily: 'Instrument Serif',
            fontSize: title.length > 70 ? 60 : title.length > 40 ? 72 : 88,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: FOREGROUND,
          }}
        >
          {title}
        </div>
        {summary ? (
          <div
            style={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              marginTop: 28,
              maxWidth: 1000,
              fontSize: summary.length > 120 ? 22 : 26,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {summary}
          </div>
        ) : null}
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 24,
          borderTop: `1px solid ${BORDER}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              fontWeight: 500,
              color: FOREGROUND,
              letterSpacing: -0.2,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 2,
              fontFamily: 'Instrument Serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: MUTED,
            }}
          >
            Software Engineer
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontFamily: 'JetBrains Mono',
            fontSize: 16,
            color: MUTED,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>{publishedLabel}</div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: 999,
              background: BORDER,
            }}
          />
          <div style={{ display: 'flex' }}>{minutes} min read</div>
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
