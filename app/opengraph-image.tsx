import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-joomsy mock application page, matching
// the page's look — Joomsy's real brand, read live off joomsy.com: the
// #FFCC00 yellow field, ink #111827, green #7DB74B and orange #F97316 accent
// words, white card surfaces, and confetti specks. Rendered at build time by
// next/og (Satori), so it uses a flexbox-only subset of CSS and plain hex
// colours. Latin text only (Satori's default font).

export const alt =
  'Bar Moshe for Joomsy — a mock application in Joomsy\'s own brand. Real shipped work, live links.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CONFETTI: { top: number; left: number; rot: number; color: string }[] = [
  { top: 80, left: 90, rot: 24, color: '#F97316' },
  { top: 150, left: 1080, rot: -30, color: '#5856D6' },
  { top: 330, left: 60, rot: 45, color: '#4096FF' },
  { top: 90, left: 620, rot: -18, color: '#e0559b' },
  { top: 420, left: 1120, rot: 30, color: '#7DB74B' },
  { top: 500, left: 160, rot: -40, color: '#2bbcc9' },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 48px',
          backgroundColor: '#FFCC00',
          color: '#111827',
          fontFamily: 'sans-serif',
        }}
      >
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              position: 'absolute',
              top: c.top,
              left: c.left,
              width: 18,
              height: 10,
              borderRadius: 3,
              backgroundColor: c.color,
              transform: `rotate(${c.rot}deg)`,
            }}
          />
        ))}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#ffffff',
              borderRadius: 999,
              padding: '10px 26px',
            }}
          >
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 800 }}>
              bar
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                fontWeight: 800,
                color: '#7DB74B',
              }}
            >
              for Joomsy
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#111827' }}>
            a mock application
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            Share the work you&apos;ve been missing
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.45,
              color: '#374151',
              maxWidth: 940,
            }}
          >
            Bar Moshe already builds Joomsy. This is how he applies everywhere
            else: he builds the thing instead of writing about it, in your brand.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#111827',
              color: '#ffffff',
              padding: '16px 40px',
              borderRadius: 999,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            bar-for-joomsy.vercel.app
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#374151' }}>
            TypeScript · React · Node · Cloud
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
