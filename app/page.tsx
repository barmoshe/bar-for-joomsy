import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import JoomsyApp from "@/src/marketing/joomsy/JoomsyApp";

// Joomsy's face (read live off joomsy.com, 2026-07-05) is Roboto all the way
// down: 800-weight headlines, 400/500 body. Same font here, no substitute
// needed.
const sans = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-jm-sans",
  display: "swap",
});

// A MOCK application page: Bar Moshe "applying" to Joomsy (joomsy.com,
// interactive video calls for grandparents and grandkids), where he already
// works as a full-stack engineer. Built as a demo of the bar-for pattern in
// Joomsy's own visual language, read live off joomsy.com: the #FFCC00 yellow,
// ink #111827, greens #7DB74B/#6EA642, orange #F97316, Roboto 800 headlines
// with accent words, confetti, video-call cards, the gradient 3-step strip,
// book cards, colored FAQ cards, and the yellow typewriter close. Everything
// drawn fresh: public-site look only, no company assets or internals.
// Noindex, a shareable demo link.
const ogTitle = "Bar Moshe × Joomsy — a mock application, in your brand";
const ogDescription =
  "Bar Moshe, 'applying' to Joomsy, where he already builds the product. A demo of the working-site-instead-of-CV pattern, in Joomsy's own visual language. Real shipped work, live links.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function JoomsyPage() {
  return (
    <div className={sans.variable}>
      <JoomsyApp />
    </div>
  );
}
