'use client';

import { useEffect, useRef, useState } from 'react';
import './marketing-base.css';
import './joomsy.css';

/**
 * JoomsyApp — a MOCK application page: Bar Moshe "applying" to Joomsy
 * (joomsy.com, interactive video calls for grandparents and grandkids),
 * where he already works as a full-stack engineer. A demo of the bar-for
 * pattern in the employer's own brand, built for fun.
 *
 * Joomsy's REAL visual language, read live off joomsy.com (computed styles
 * + section walk, 2026-07-05):
 *
 *   - #FFCC00 yellow nav with a white arched bubble behind the wordmark,
 *     and the same yellow as the full-bleed close band.
 *   - Roboto everywhere; 800-weight two-tone headlines: ink #111827 with
 *     accent words in green #7DB74B/#6EA642 or orange #F97316, some with a
 *     hand-drawn underline squiggle.
 *   - Confetti specks around the hero; two green-bordered video-call cards
 *     with dark name tags ("Grandparent"/"Grandchild" there, "Bar"/"Joomsy"
 *     here) over a warm glow.
 *   - The 3-step strip: tinted squircle tiles (blue #4096FF, green, yellow)
 *     joined by a blue-to-green-to-yellow gradient line, steps fading in on
 *     scroll, then a white "✨ ... ✨" pill badge.
 *   - "Sample Books" card row -> the work grid here, book-style cards with
 *     a cover and a caption.
 *   - The orange "falls short" vs green "new category" comparison pair.
 *   - FAQ cards with colored top borders and a faint matching tint.
 *   - The yellow close: a typewriter headline, floating circular doodle
 *     chips, and a dark pill button with a colorful gradient ring.
 *   - Thin navy #111827 footer.
 *
 * Every SVG below is drawn fresh in that style from the PUBLIC site's look:
 * no Joomsy assets, code, screens, or internals appear anywhere (employer
 * IP rule). Copy is Bar's plain first-person register. All motion is gated
 * on prefers-reduced-motion; the page is fully legible with no JS.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=bar-for-joomsy%20(the%20mock%20one)';
const CV = '/Bar_Moshe_CV_Joomsy.pdf';
const LINKEDIN = 'https://www.linkedin.com/in/barmoshe/';
const GITHUB = 'https://github.com/barmoshe';
const WHATSAPP = 'https://wa.me/972546561465';

/* ── Confetti specks (deterministic; % coordinates inside the hero). ──── */
const CONFETTI: { top: number; left: number; rot: number; c: string }[] = [
  { top: 8, left: 12, rot: 24, c: '#F97316' },
  { top: 18, left: 40, rot: -32, c: '#5856D6' },
  { top: 6, left: 63, rot: 12, c: '#e0559b' },
  { top: 14, left: 86, rot: -18, c: '#2bbcc9' },
  { top: 36, left: 5, rot: 45, c: '#FFCC00' },
  { top: 30, left: 55, rot: -40, c: '#7DB74B' },
  { top: 12, left: 74, rot: 30, c: '#F97316' },
  { top: 44, left: 92, rot: -25, c: '#5856D6' },
  { top: 58, left: 8, rot: 18, c: '#2bbcc9' },
  { top: 66, left: 42, rot: -12, c: '#e0559b' },
  { top: 52, left: 70, rot: 36, c: '#7DB74B' },
  { top: 72, left: 88, rot: -30, c: '#FFCC00' },
];

/* ── The 3-step strip, their Connect/Choose/Create motif reframed. ────── */
const STEPS: {
  n: string;
  tone: 'blue' | 'green' | 'yellow';
  h: string;
  accent: string;
  p: string;
}[] = [
  {
    n: '1',
    tone: 'blue',
    h: 'Connect',
    accent: 'Live',
    p: 'A brief, a call, or a ticket. I read the product, not just the task.',
  },
  {
    n: '2',
    tone: 'green',
    h: 'Choose an',
    accent: 'Activity',
    p: 'Frontend, backend, data, or infra. Pick a seam, I work across all of them.',
  },
  {
    n: '3',
    tone: 'yellow',
    h: 'Create',
    accent: 'Memories',
    p: 'Shipped, monitored, and debugged in production. The kind teams remember.',
  },
];

/* ── Sample Builds. The honeybook grid roster, as Joomsy book cards. ──── */
type Glyph =
  | 'deck'
  | 'flow'
  | 'logic'
  | 'harness'
  | 'film'
  | 'home'
  | 'plane'
  | 'flower'
  | 'wave'
  | 'silk';

const BUILDS: {
  name: string;
  tag: string;
  href: string;
  glyph: Glyph;
  tone: string;
}[] = [
  {
    name: 'MDP',
    tag: 'Compiler · AI tooling',
    href: 'https://barmoshe.github.io/mdp/',
    glyph: 'deck',
    tone: '#FFCC00',
  },
  {
    name: 'Temporal Data Service',
    tag: 'Durable workflows',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    glyph: 'flow',
    tone: '#4096FF',
  },
  {
    name: 'Entailer',
    tag: 'AI + formal logic',
    href: 'https://barmoshe.github.io/entailer/',
    glyph: 'logic',
    tone: '#5856D6',
  },
  {
    name: 'Creative Harness',
    tag: 'AI agents · Systems',
    href: 'https://github.com/barmoshe/claude-creative-stack',
    glyph: 'harness',
    tone: '#7DB74B',
  },
  {
    name: 'Catalogue Orchestrator',
    tag: 'AI video · Orchestration',
    href: 'https://barmoshe.github.io/catalogue-orchestrator/',
    glyph: 'film',
    tone: '#F97316',
  },
  {
    name: 'Apartment Hunter',
    tag: 'Product · Web app',
    href: 'https://apartment-hunter-one.vercel.app',
    glyph: 'home',
    tone: '#2bbcc9',
  },
  {
    name: 'Trip Planner',
    tag: 'Product · Web app',
    href: 'https://trip-planner-six-iota.vercel.app',
    glyph: 'plane',
    tone: '#4096FF',
  },
  {
    name: 'Bloom Garden',
    tag: 'Computer vision · Game',
    href: 'https://bloom-garden-five.vercel.app',
    glyph: 'flower',
    tone: '#e0559b',
  },
  {
    name: 'Biome Synth',
    tag: 'Generative · Audio',
    href: 'https://biome-synth.lovable.app',
    glyph: 'wave',
    tone: '#7DB74B',
  },
  {
    name: 'Aurora',
    tag: 'WebGL · Graphics',
    href: 'https://aurora-eight-iota.vercel.app',
    glyph: 'silk',
    tone: '#F97316',
  },
];

/* ── FAQ, their colored-top-border card grammar. ──────────────────────── */
const FAQ: { tone: string; q: string; a: string }[] = [
  {
    tone: '#7DB74B',
    q: 'Does he need onboarding?',
    a: 'Not usually. Someone may help the first time, but Bar is designed to ship independently once connected to the repo.',
  },
  {
    tone: '#FFCC00',
    q: 'What stack does it work best with?',
    a: 'TypeScript, React, Next.js, and Node, with the cloud around them: AWS, Docker, Kubernetes, CI/CD. AI tooling is a first-class habit, not a bolt-on.',
  },
  {
    tone: '#4096FF',
    q: 'Do I need to install anything?',
    a: 'No. Bar works in your web browser: every project on this page opens live, without complicated setup.',
  },
  {
    tone: '#5856D6',
    q: 'Does he work across the stack?',
    a: 'Yes. Frontend, backend, data, and the deploy pipeline. At Joomsy he is the primary full-stack and DevOps engineer on a team of five.',
  },
  {
    tone: '#F97316',
    q: 'Does it work on phones?',
    a: 'Partially. He answers WhatsApp anywhere, but the best experience is a laptop with a terminal open.',
  },
  {
    tone: '#7DB74B',
    q: 'Can I use him across time zones?',
    a: 'Absolutely. He already ships with people across countries and continents, whenever it is a good time for you.',
  },
];

/* ── Floating doodle chips for the yellow close band. ─────────────────── */
const CHIPS: {
  top: number;
  left: number;
  size: number;
  bg: string;
  glyph: 'note' | 'term' | 'flower' | 'book' | 'wave' | 'spark' | 'gear' | 'plane';
  dur: number;
  delay: number;
}[] = [
  { top: 12, left: 5, size: 62, bg: '#fdeef5', glyph: 'note', dur: 7, delay: 0 },
  { top: 55, left: 3, size: 48, bg: '#e8f4ff', glyph: 'term', dur: 9, delay: 1.2 },
  { top: 78, left: 12, size: 56, bg: '#efe9ff', glyph: 'gear', dur: 8, delay: 0.5 },
  { top: 26, left: 16, size: 40, bg: '#eaf6df', glyph: 'spark', dur: 6, delay: 2 },
  { top: 8, left: 88, size: 56, bg: '#eaf6df', glyph: 'book', dur: 8, delay: 0.8 },
  { top: 38, left: 94, size: 44, bg: '#fdeef5', glyph: 'flower', dur: 7, delay: 1.6 },
  { top: 64, left: 90, size: 60, bg: '#e8f4ff', glyph: 'wave', dur: 9, delay: 0.2 },
  { top: 84, left: 82, size: 44, bg: '#fff3d6', glyph: 'plane', dur: 6, delay: 2.4 },
  { top: 82, left: 30, size: 40, bg: '#efe9ff', glyph: 'spark', dur: 7, delay: 1 },
  { top: 80, left: 66, size: 48, bg: '#fdeef5', glyph: 'term', dur: 8, delay: 1.8 },
];

/* ── Scroll reveal: adds .is-in when a [data-reveal] enters the viewport. */
function useReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/* ── Typewriter headline for the close band (their exact trick). ──────── */
function Typewriter({ plain, accent }: { plain: string; accent: string }) {
  const full = plain + accent;
  const [n, setN] = useState(full.length);
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches;
    if (!motionOk || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setN(0);
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!armed || n >= full.length) return;
    const t = setTimeout(() => setN(n + 1), 55);
    return () => clearTimeout(t);
  }, [armed, n, full.length]);

  const shownPlain = full.slice(0, Math.min(n, plain.length));
  const shownAccent = n > plain.length ? full.slice(plain.length, n) : '';
  const done = n >= full.length;

  return (
    <h2 ref={ref} className="jm-close-h" aria-label={full}>
      <span aria-hidden="true">
        {shownPlain}
        <span className="jm-close-accent">{shownAccent}</span>
        {armed && !done && <span className="jm-caret" />}
      </span>
    </h2>
  );
}

/* ── Original doodles: the "oo" googly eyes for the wordmark. ─────────── */
function Eyes() {
  return (
    <svg
      className="jm-eyes"
      viewBox="0 0 44 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="12" r="10" fill="#fff" stroke="#111827" strokeWidth="2" />
      <circle cx="33" cy="12" r="10" fill="#fff" stroke="#111827" strokeWidth="2" />
      <circle cx="13.5" cy="14" r="4.2" fill="#111827" />
      <circle cx="35.5" cy="14" r="4.2" fill="#111827" />
    </svg>
  );
}

/* ── Hero: the two green-bordered "video call" cards, drawn fresh. ────── */
function CallCardBar() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <rect width="220" height="150" fill="#fff7e6" />
      {/* window + wall */}
      <rect x="132" y="18" width="64" height="46" rx="6" fill="#dcedff" />
      <rect x="132" y="38" width="64" height="3" fill="#ffffff" />
      <rect x="161" y="18" width="3" height="46" fill="#ffffff" />
      {/* desk */}
      <rect x="0" y="112" width="220" height="38" fill="#eadfc8" />
      {/* laptop */}
      <rect x="24" y="84" width="58" height="34" rx="4" fill="#374151" />
      <rect x="28" y="88" width="50" height="24" rx="2" fill="#a5d8ff" />
      <rect x="16" y="116" width="74" height="6" rx="3" fill="#4b5563" />
      {/* Bar: head, headphones, waving arm */}
      <circle cx="146" cy="74" r="22" fill="#f4c8a8" />
      <path d="M124 72 a22 22 0 0 1 44 0" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
      <rect x="120" y="66" width="9" height="16" rx="4.5" fill="#111827" />
      <rect x="163" y="66" width="9" height="16" rx="4.5" fill="#111827" />
      <circle cx="139" cy="74" r="2.6" fill="#111827" />
      <circle cx="153" cy="74" r="2.6" fill="#111827" />
      <path d="M139 84 q7 5 14 0" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="126" y="96" width="40" height="30" rx="10" fill="#7DB74B" />
      <path d="M166 104 q14 -6 16 -22" stroke="#7DB74B" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="183" cy="76" r="7.5" fill="#f4c8a8" />
    </svg>
  );
}

function CallCardJoomsy() {
  return (
    <svg viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <rect width="220" height="150" fill="#eef7e4" />
      {/* soft shelf */}
      <rect x="14" y="22" width="52" height="10" rx="3" fill="#d6e9c2" />
      <rect x="20" y="10" width="8" height="12" rx="2" fill="#F97316" />
      <rect x="31" y="8" width="8" height="14" rx="2" fill="#4096FF" />
      <rect x="42" y="11" width="8" height="11" rx="2" fill="#e0559b" />
      {/* two readers sharing a story: grown-up + kid, generic and fresh */}
      <circle cx="86" cy="72" r="20" fill="#f7d9bd" />
      <path d="M70 62 a20 20 0 0 1 32 0" fill="none" stroke="#c9c2b6" strokeWidth="7" strokeLinecap="round" />
      <circle cx="80" cy="72" r="2.4" fill="#111827" />
      <circle cx="92" cy="72" r="2.4" fill="#111827" />
      <circle cx="80" cy="68" r="6.5" fill="none" stroke="#111827" strokeWidth="2" />
      <circle cx="92" cy="68" r="6.5" fill="none" stroke="#111827" strokeWidth="2" />
      <path d="M80 81 q6 4 12 0" stroke="#111827" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <rect x="68" y="92" width="36" height="28" rx="9" fill="#5856D6" />
      <circle cx="142" cy="82" r="16" fill="#f4c8a8" />
      <path d="M129 74 a16 16 0 0 1 26 0" fill="none" stroke="#8a5a3b" strokeWidth="6" strokeLinecap="round" />
      <circle cx="137" cy="82" r="2.2" fill="#111827" />
      <circle cx="147" cy="82" r="2.2" fill="#111827" />
      <path d="M137 89 q5 4 10 0" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <rect x="127" y="98" width="30" height="22" rx="8" fill="#F97316" />
      {/* the shared book */}
      <path d="M96 118 q14 -8 28 0 l0 16 q-14 -8 -28 0 z" fill="#ffffff" stroke="#7DB74B" strokeWidth="3" />
      <path d="M110 112 l0 20" stroke="#7DB74B" strokeWidth="2.4" />
      {/* floor */}
      <rect x="0" y="132" width="220" height="18" fill="#dcedcb" />
    </svg>
  );
}

/* ── Step icons in the squircle tiles. ────────────────────────────────── */
function StepIcon({ tone }: { tone: 'blue' | 'green' | 'yellow' }) {
  if (tone === 'blue') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <rect x="6" y="13" width="24" height="22" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M30 21 l12 -6 v18 l-12 -6 z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }
  if (tone === 'green') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M24 12 q-8 -5 -16 -2 v26 q8 -3 16 2 q8 -5 16 -2 v-26 q-8 -3 -16 2 z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M24 12 v26" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 6 l4.6 11.2 12.1 1 -9.2 7.9 2.8 11.8 -10.3 -6.3 -10.3 6.3 2.8 -11.8 -9.2 -7.9 12.1 -1 z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Book covers: one original mini-poster per project. ───────────────── */
function Cover({ glyph, tone }: { glyph: Glyph; tone: string }) {
  return (
    <svg className="jm-cover" viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <rect width="120" height="160" rx="6" fill="#fffdf6" />
      <rect x="0" y="0" width="10" height="160" rx="5" fill={tone} opacity="0.55" />
      {glyph === 'deck' && (
        <g>
          <rect x="30" y="46" width="64" height="44" rx="5" fill={tone} opacity="0.25" />
          <rect x="38" y="56" width="64" height="44" rx="5" fill={tone} opacity="0.55" />
          <rect x="46" y="66" width="64" height="44" rx="5" fill="#fff" stroke={tone} strokeWidth="3" />
          <path d="M54 80 h30 M54 90 h40" stroke={tone} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {glyph === 'flow' && (
        <g stroke={tone} strokeWidth="3.5" fill="#fff">
          <path d="M36 60 h20 M62 84 h20 M36 108 h20" fill="none" />
          <path d="M56 60 q14 0 14 12 v0 q0 12 12 12 M82 84 q-26 0 -26 24" fill="none" />
          <circle cx="30" cy="60" r="9" />
          <circle cx="88" cy="84" r="9" />
          <circle cx="30" cy="108" r="9" />
          <circle cx="60" cy="132" r="9" fill={tone} />
        </g>
      )}
      {glyph === 'logic' && (
        <g>
          <path d="M42 52 v56 M42 66 h34 M42 94 h34" stroke={tone} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M52 128 l10 10 20 -22" stroke="#7DB74B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}
      {glyph === 'harness' && (
        <g stroke={tone} strokeWidth="3.5" fill="none" strokeLinecap="round">
          <path d="M60 46 l4.2 10.4 11 .9 -8.4 7.2 2.6 10.7 -9.4 -5.7 -9.4 5.7 2.6 -10.7 -8.4 -7.2 11 -.9 z" />
          <path d="M34 100 q26 20 52 0" />
          <circle cx="34" cy="100" r="5" fill={tone} />
          <circle cx="86" cy="100" r="5" fill={tone} />
          <path d="M60 118 v16" />
        </g>
      )}
      {glyph === 'film' && (
        <g>
          <rect x="32" y="56" width="56" height="48" rx="6" fill="none" stroke={tone} strokeWidth="3.5" />
          <path d="M32 68 h56 M32 92 h56" stroke={tone} strokeWidth="2.5" />
          <path d="M54 74 l16 6 -16 6 z" fill={tone} />
          <circle cx="40" cy="62" r="2.4" fill={tone} />
          <circle cx="52" cy="62" r="2.4" fill={tone} />
          <circle cx="64" cy="62" r="2.4" fill={tone} />
          <circle cx="76" cy="62" r="2.4" fill={tone} />
        </g>
      )}
      {glyph === 'home' && (
        <g stroke={tone} strokeWidth="3.5" fill="none" strokeLinejoin="round">
          <path d="M34 84 l26 -22 26 22" />
          <path d="M42 80 v30 h36 v-30" />
          <rect x="54" y="94" width="12" height="16" fill={tone} stroke="none" />
        </g>
      )}
      {glyph === 'plane' && (
        <g>
          <path d="M32 92 l56 -28 -18 44 -10 -14 -12 8 z" fill="none" stroke={tone} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M40 116 q6 -4 12 0 M56 124 q6 -4 12 0" stroke={tone} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      )}
      {glyph === 'flower' && (
        <g>
          <circle cx="60" cy="74" r="8" fill={tone} />
          <circle cx="60" cy="56" r="9" fill={tone} opacity="0.45" />
          <circle cx="60" cy="92" r="9" fill={tone} opacity="0.45" />
          <circle cx="42" cy="74" r="9" fill={tone} opacity="0.45" />
          <circle cx="78" cy="74" r="9" fill={tone} opacity="0.45" />
          <path d="M60 100 v28 M60 116 q-12 -4 -16 -12" stroke="#7DB74B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      )}
      {glyph === 'wave' && (
        <path d="M30 84 q7 -26 15 0 q7 26 15 0 q7 -26 15 0 q7 26 15 0" stroke={tone} strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
      {glyph === 'silk' && (
        <g stroke={tone} strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M28 60 q32 18 64 0" />
          <path d="M28 78 q32 18 64 0" opacity="0.7" />
          <path d="M28 96 q32 18 64 0" opacity="0.45" />
          <path d="M28 114 q32 18 64 0" opacity="0.25" />
        </g>
      )}
    </svg>
  );
}

/* ── Doodles inside the floating close-band chips. ────────────────────── */
function ChipGlyph({ g }: { g: (typeof CHIPS)[number]['glyph'] }) {
  const s = { stroke: '#111827', strokeWidth: 2.6, fill: 'none', strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      {g === 'note' && (
        <g {...s}>
          <path d="M16 28 V12 l12 -3 v16" />
          <circle cx="12.5" cy="28" r="3.5" fill="#111827" />
          <circle cx="24.5" cy="25" r="3.5" fill="#111827" />
        </g>
      )}
      {g === 'term' && (
        <g {...s}>
          <rect x="7" y="9" width="26" height="22" rx="4" />
          <path d="M13 17 l5 4 -5 4 M21 26 h7" />
        </g>
      )}
      {g === 'flower' && (
        <g>
          <circle cx="20" cy="18" r="4" fill="#111827" />
          <circle cx="20" cy="9.5" r="4.4" {...s} />
          <circle cx="20" cy="26.5" r="4.4" {...s} />
          <circle cx="11.5" cy="18" r="4.4" {...s} />
          <circle cx="28.5" cy="18" r="4.4" {...s} />
          <path d="M20 31 v4" {...s} />
        </g>
      )}
      {g === 'book' && (
        <g {...s}>
          <path d="M20 12 q-6 -4 -12 -1.5 v18 q6 -2.5 12 1.5 q6 -4 12 -1.5 v-18 q-6 -2.5 -12 1.5 z" />
          <path d="M20 12 v18" />
        </g>
      )}
      {g === 'wave' && <path d="M7 20 q4 -12 8 0 q4 12 8 0 q4 -12 8 0" {...s} />}
      {g === 'spark' && (
        <path d="M20 7 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" {...s} strokeLinejoin="round" />
      )}
      {g === 'gear' && (
        <g {...s}>
          <circle cx="20" cy="20" r="6.5" />
          <path d="M20 8 v4 M20 28 v4 M8 20 h4 M28 20 h4 M11.5 11.5 l2.8 2.8 M25.7 25.7 l2.8 2.8 M28.5 11.5 l-2.8 2.8 M14.3 25.7 l-2.8 2.8" />
        </g>
      )}
      {g === 'plane' && (
        <path d="M8 22 l24 -11 -8 18 -4.5 -6 -6 3.5 z" {...s} strokeLinejoin="round" />
      )}
    </svg>
  );
}

/* ── Underline squiggles (their hand-drawn accents). ──────────────────── */
function Squiggle({ tone }: { tone: string }) {
  return (
    <svg className="jm-squiggle" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 8 q15 -7 30 -1 q15 6 30 -1 q15 -7 30 -1 q12 5 24 0" stroke={tone} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function JoomsyApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef);

  return (
    <div ref={rootRef} className="mp-root jm-root">
      <a href="#jm-main" className="jm-skip">
        Skip to content
      </a>

      {/* ── Nav: the yellow bar + white arched logo bubble. ────────────── */}
      <header className="jm-nav">
        <div className="jm-nav-inner">
          <a className="jm-brand" href="#jm-main" aria-label="bar for Joomsy, back to top">
            <span className="jm-brand-bubble">
              <span className="jm-brand-bar">bar</span>
              <span className="jm-brand-for">
                for J<Eyes />
                msy
              </span>
            </span>
          </a>
          <nav className="jm-nav-links" aria-label="Page sections">
            <a href="#jm-how">How Bar Works</a>
            <a href="#jm-builds">Sample Builds</a>
            <a href="#jm-faq">FAQ</a>
          </nav>
          <div className="jm-nav-cta">
            <a className="jm-btn-outline" href={EMAIL}>
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </header>

      <main id="jm-main">
        {/* ── Hero. ──────────────────────────────────────────────────── */}
        <section className="jm-hero" aria-labelledby="jm-hero-h">
          <div className="jm-confetti" aria-hidden="true">
            {CONFETTI.map((c, i) => (
              <span
                key={i}
                style={{
                  top: `${c.top}%`,
                  left: `${c.left}%`,
                  background: c.c,
                  transform: `rotate(${c.rot}deg)`,
                }}
              />
            ))}
          </div>
          <div className="jm-hero-inner">
            <div className="jm-hero-copy">
              <h1 id="jm-hero-h">
                Share <span className="jm-green">the work</span>
                <br />
                you&apos;ve been <span className="jm-orange">missing</span>
              </h1>
              <p>
                I build Joomsy every day as its full-stack engineer. This page
                is a mock: the same working-site-instead-of-a-CV pattern I send
                everyone else, rebuilt in your brand, for fun. Real projects,
                live links, plain words.
              </p>
              <div className="jm-hero-cta">
                <a className="jm-btn-cream" href="#jm-builds">
                  See the Work <span aria-hidden="true">→</span>
                </a>
                <small>Free to browse · No sign-up required</small>
              </div>
            </div>
            <div className="jm-hero-cards" aria-hidden="true">
              <div className="jm-call-card jm-call-a">
                <CallCardBar />
                <span className="jm-call-tag">Bar</span>
              </div>
              <div className="jm-call-card jm-call-b">
                <CallCardJoomsy />
                <span className="jm-call-tag">Joomsy</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Privacy strip. ─────────────────────────────────────────── */}
        <div className="jm-privacy">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="#7DB74B" strokeWidth="2" />
            <path d="M8 10 V8 a4 4 0 0 1 8 0 v2" fill="none" stroke="#7DB74B" strokeWidth="2" />
          </svg>
          <p>
            Private and secure. Built from the public site only, no company
            code, screens, or internals. <strong>Ever.</strong>
          </p>
        </div>

        {/* ── How Bar works: the 3-step gradient strip. ──────────────── */}
        <section className="jm-how" id="jm-how" aria-labelledby="jm-how-h">
          <h2 id="jm-how-h">
            How <span className="jm-green">Bar</span> Works
          </h2>
          <p className="jm-sub">
            From brief to production in{' '}
            <span className="jm-green-strong">three simple steps</span>
          </p>
          <div className="jm-steps">
            <div className="jm-steps-line" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`jm-step jm-step-${s.tone}`}
                data-reveal
                style={{ transitionDelay: `${i * 0.14}s` }}
              >
                <div className="jm-step-tile">
                  <StepIcon tone={s.tone} />
                  <span className="jm-step-n">{s.n}</span>
                </div>
                <h3>
                  {s.h} <span className="jm-step-accent">{s.accent}</span>
                </h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <p className="jm-badge" data-reveal>
            <span aria-hidden="true">✨</span> Built with production habits, in
            a real five-person startup. <span aria-hidden="true">✨</span>
          </p>
        </section>

        {/* ── Sample Builds: the book-card grid. ─────────────────────── */}
        <section className="jm-builds" id="jm-builds" aria-labelledby="jm-builds-h">
          <h2 id="jm-builds-h">Sample Builds</h2>
          <p className="jm-sub">
            Explore some of the curated work. Every card opens live.
          </p>
          <ul className="jm-shelf">
            {BUILDS.map((b, i) => (
              <li key={b.name} data-reveal style={{ transitionDelay: `${(i % 5) * 0.1}s` }}>
                <a className="jm-book" href={b.href} target="_blank" rel="noreferrer">
                  <Cover glyph={b.glyph} tone={b.tone} />
                  <span className="jm-book-name">{b.name}</span>
                  <span className="jm-book-tag">{b.tag}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="jm-builds-cta" data-reveal>
            <a className="jm-btn-dark" href={CV} target="_blank" rel="noreferrer">
              Download the CV <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── Why: the orange-vs-green comparison pair. ──────────────── */}
        <section className="jm-why" aria-labelledby="jm-why-h">
          <h2 id="jm-why-h">
            Why generic CVs{' '}
            <span className="jm-orange jm-underlined">
              don&apos;t work
              <Squiggle tone="#F97316" />
            </span>{' '}
            for hiring teams
          </h2>
          <p className="jm-sub">
            Engineers connect through <span className="jm-green-strong">shipped work</span>, not keyword lists
          </p>
          <div className="jm-compare">
            <article className="jm-compare-card jm-compare-orange" data-reveal>
              <h3>
                Standard CVs <span className="jm-orange">fall short</span>
              </h3>
              <p>
                A CV is written for keyword scanners. Engineers engage
                differently, so screening turns short, awkward, and
                ineffective. It hides exactly the signal you need during the
                most critical hiring weeks.
              </p>
            </article>
            <article className="jm-compare-card jm-compare-green" data-reveal>
              <h3>
                A working site introduces{' '}
                <span className="jm-green-strong">a new category</span>
              </h3>
              <p>
                Proof-based, role-appropriate, designed specifically for hiring
                connection. Real projects, live links, and purpose-built pages
                like this one.
              </p>
            </article>
          </div>
        </section>

        {/* ── FAQ: colored-top cards. ────────────────────────────────── */}
        <section className="jm-faq" id="jm-faq" aria-labelledby="jm-faq-h">
          <h2 id="jm-faq-h">
            Frequently Asked{' '}
            <span className="jm-green-strong jm-underlined">
              Questions
              <Squiggle tone="#7DB74B" />
            </span>
          </h2>
          <p className="jm-sub">
            Everything you need to know about hiring{' '}
            <span className="jm-green-strong">Bar</span>
          </p>
          <div className="jm-faq-grid">
            {FAQ.map((f, i) => (
              <article
                key={f.q}
                className="jm-faq-card"
                style={{ ['--jm-faq-tone' as string]: f.tone, transitionDelay: `${(i % 2) * 0.1}s` }}
                data-reveal
              >
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Close: the yellow typewriter band. ─────────────────────── */}
        <section className="jm-close" aria-labelledby="jm-close-h-label">
          <span id="jm-close-h-label" className="jm-visually-hidden">
            Make hiring time feel real
          </span>
          <div className="jm-chips" aria-hidden="true">
            {CHIPS.map((c, i) => (
              <span
                key={i}
                className="jm-chip"
                style={{
                  top: `${c.top}%`,
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size,
                  background: c.bg,
                  animationDuration: `${c.dur}s`,
                  animationDelay: `${c.delay}s`,
                }}
              >
                <ChipGlyph g={c.glyph} />
              </span>
            ))}
          </div>
          <div className="jm-close-inner">
            <Typewriter plain="Make hiring time " accent="feel real" />
            <p className="jm-close-sub">
              Built for product teams • Made for Joomsy • Designed by a builder
            </p>
            <a className="jm-btn-dark jm-btn-ring" href={EMAIL}>
              Say Hi <span aria-hidden="true">→</span>
            </a>
            <p className="jm-close-micro">
              A mock application · Bar already works here ·{' '}
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp
              </a>{' '}
              works too
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer. ──────────────────────────────────────────────────── */}
      <footer className="jm-footer">
        <p>
          Bar Moshe © 2026. A mock application demo. Joomsy and its brand
          belong to Joomsy; this is not an official Joomsy page.
        </p>
        <nav aria-label="Contact links">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={CV} target="_blank" rel="noreferrer">
            CV
          </a>
          <a href={EMAIL}>Email</a>
        </nav>
      </footer>
    </div>
  );
}
