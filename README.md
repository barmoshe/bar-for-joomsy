# bar for Joomsy

A **mock** application page: Bar Moshe "applying" to **Joomsy** (joomsy.com,
interactive video calls for grandparents and grandkids), where he already
works as a full-stack engineer. Built as a demo of the bar-for pattern, in
the employer's own brand, for fun.

Built in Joomsy's visual language, read live off joomsy.com: the `#FFCC00`
yellow nav and close band, ink `#111827`, greens `#7DB74B`/`#6EA642`, orange
`#F97316` accent words, Roboto 800 headlines, confetti specks, green-bordered
video-call cards, the gradient three-step strip, book-style work cards,
colored-top FAQ cards, and the typewriter close. Every graphic is drawn fresh
for this page from the public site's look; no company assets, code, screens,
or internals appear anywhere.

Stack: Next.js + React + TypeScript, plain scoped CSS, IntersectionObserver
reveals (reduced-motion safe).

Live at **bar-for-joomsy.vercel.app** (noindex; a shareable demo link).
Not an official Joomsy page; the Joomsy brand belongs to Joomsy.

## Run

```bash
npm install
npm run dev
```

## Map

- `app/page.tsx` — fonts (Roboto), metadata, mounts the app
- `app/opengraph-image.tsx` — brand-styled share card
- `src/marketing/joomsy/JoomsyApp.tsx` — the whole page
- `src/marketing/joomsy/joomsy.css` — Joomsy's extracted token system, scoped to `.jm-root`
- `public/Bar_Moshe_Resume.pdf` — one-page CV
