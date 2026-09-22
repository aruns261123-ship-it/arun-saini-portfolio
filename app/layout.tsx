import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import { CONTACT } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arunsaini.dev"),
  title: "Arun Saini | SEO Expert & Front-End Developer",
  description:
    "Arun Saini is an SEO professional specializing in technical, on-page, local and multi-region SEO, with hands-on experience in modern web development.",
  keywords: [
    "SEO Expert",
    "Technical SEO",
    "On-Page SEO",
    "Local SEO",
    "SEO Consultant",
    "SEO Specialist",
    "Next.js Developer",
    "Frontend Developer",
    "India SEO Professional",
  ],
  authors: [{ name: "Arun Saini", url: CONTACT.linkedin }],
  creator: "Arun Saini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunsaini.dev",
    siteName: "Arun Saini — Portfolio",
    title: "Arun Saini | SEO Expert & Front-End Developer",
    description:
      "SEO professional combining technical SEO, content optimization and modern web development. Based in India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Saini | SEO Expert & Front-End Developer",
    description:
      "SEO professional specializing in technical, on-page, local and multi-region SEO.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://arunsaini.dev/#person",
      name: "Arun Saini",
      jobTitle: "SEO Expert",
      description:
        "SEO professional specializing in technical, on-page, local and multi-region SEO, with hands-on experience in modern web development.",
      email: `mailto:${CONTACT.email}`,
      telephone: CONTACT.phoneDisplay,
      url: "https://arunsaini.dev",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: [CONTACT.linkedin, CONTACT.github],
      knowsAbout: [
        "Technical SEO",
        "On-Page SEO",
        "Local SEO",
        "Multi-Region SEO",
        "Keyword Research",
        "Next.js",
        "TypeScript",
        "Python",
        "Flutter",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Teerthanker Mahaveer University (TMU)",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://arunsaini.dev/#website",
      url: "https://arunsaini.dev",
      name: "Arun Saini — SEO Expert & Front-End Developer",
      publisher: { "@id": "https://arunsaini.dev/#person" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-base-950"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
