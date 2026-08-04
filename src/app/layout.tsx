import type { Metadata } from "next";
import { Inter, Martian_Mono } from "next/font/google";
import { Backdrop, NoiseFilter } from "@/components/aura/Backdrop";
import { SiteFooter } from "@/components/sections/SiteFooter";
import "./globals.css";

// Stand-in for the PolySans optical-size family. One typeface, weight 400 for
// body and display, 600 where PolySans-Bulky would carry links and CTAs.
const sans = Inter({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// The one exception to the single-family rule: every number is set here, so
// animated counters resolve without a pixel of jitter.
const num = Martian_Mono({
  variable: "--font-num-family",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Set NEXT_PUBLIC_SITE_URL in the Vercel project once the domain is known, so
// share cards resolve to absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rkaran.vercel.app";

const title = "R.Karan · systems and performance engineering";
const description =
  "Projects by R.Karan, each written up as a problem, an approach and an outcome: cost-based cache routing in cacheopt, a million-row virtualized grid in lattice, and exactly-once side effects in relay.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "R.Karan",
  authors: [{ name: "R.Karan", url: "https://github.com/rkaran112" }],
  keywords: [
    "software engineer",
    "performance engineering",
    "distributed systems",
    "data engineering",
    "full-stack",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "R.Karan",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${num.variable}`}>
      <body>
        {/* overflow-x-clip rather than -hidden: `hidden` turns this element into
            a scroll container, which breaks smooth scrolling and scroll-margin. */}
        <div className="relative min-h-screen overflow-x-clip bg-[#0c0c0c] text-white">
          <Backdrop />
          <NoiseFilter />
          <div className="relative z-10">
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
