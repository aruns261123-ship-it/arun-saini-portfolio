export const CONTACT = {
  name: "Arun Saini",
  email: "aruns261123@gmail.com",
  phoneDisplay: "+91 6397733545",
  phoneHref: "tel:+916397733545",
  whatsapp: "https://wa.me/916397733545",
  location: "India",
  linkedin: "https://linkedin.com/in/arun-saini-419a60320",
  github: "https://github.com/aruns261123-ship-it",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "SEO Tool", href: "#seo-tool" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const PROFILE_STRIP = [
  {
    title: "SEO",
    lines: ["Technical • On-Page • Off-Page", "Local • Multi-Region"],
    icon: "trending",
  },
  {
    title: "Development",
    lines: ["React • Next.js • TypeScript", "Python"],
    icon: "code",
  },
  {
    title: "Tools",
    lines: ["Semrush • GSC • GA4", "Screaming Frog • Lighthouse"],
    icon: "tool",
  },
  {
    title: "Based In",
    lines: ["India", "Open to remote work"],
    icon: "pin",
  },
] as const;

export const PROFILE_CARD = [
  { label: "Role", value: "SEO Expert" },
  { label: "Focus", value: "Technical SEO" },
  { label: "Also", value: "Frontend Development" },
  { label: "Education", value: "BCA Graduate — 2025" },
  { label: "Location", value: "India" },
] as const;

export type Service = {
  id: string;
  icon: "search" | "code" | "globe" | "zap";
  badge: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
};

export const SERVICES: Service[] = [
  {
    id: "technical-seo",
    icon: "search",
    badge: "Core Focus",
    title: "Technical SEO Audits & Health",
    tagline: "Fix the crawl, speed, and architecture issues stopping Google from indexing your site.",
    description:
      "Deep technical audits to diagnose and resolve crawl bottlenecks, indexing issues, and core architecture flaws. I ensure search engine bots can discover, render, and index your high-value pages effortlessly.",
    deliverables: [
      "Full crawl audit (Screaming Frog, Sitebulb)",
      "Robots.txt, XML sitemaps & crawl budget optimization",
      "Core Web Vitals & mobile page-speed optimization",
      "Canonicalization, redirect chains & 404 cleanup",
      "Structured data implementation (Schema.org / JSON-LD)",
    ],
    tools: ["Screaming Frog", "Google Search Console", "Lighthouse"],
  },
  {
    id: "on-page-strategy",
    icon: "zap",
    badge: "Traffic Growth",
    title: "On-Page & Keyword Strategy",
    tagline: "Target high-intent keywords that bring actual customers, not just vanity clicks.",
    description:
      "Strategic keyword research and content optimization mapped directly to search intent. I optimize titles, metadata, heading hierarchies, and internal link structures so your content dominates target queries.",
    deliverables: [
      "Commercial & transactional keyword clustering",
      "Competitor content gap & SERP analysis",
      "Click-through rate (CTR) optimized titles & meta descriptions",
      "Heading architecture & content readability optimization",
      "Strategic internal linking structure",
    ],
    tools: ["Semrush", "Google Search Console", "GA4"],
  },
  {
    id: "multi-region-local",
    icon: "globe",
    badge: "Global & Local",
    title: "Multi-Region & Local SEO",
    tagline: "Dominate search results in specific regions, cities, and international markets.",
    description:
      "Hands-on experience managing SEO for live websites across India and the US/Canada markets. I configure geo-targeting, regional keyword variants, and local search presence.",
    deliverables: [
      "International geo-targeting & hreflang configuration",
      "Region-specific keyword & competitor analysis",
      "Google Business Profile setup, audit & local ranking",
      "Local citation consistency & review signals",
      "Localized landing page content strategy",
    ],
    tools: ["Google Business Profile", "Semrush", "GA4"],
  },
  {
    id: "seo-web-dev",
    icon: "code",
    badge: "Engineering + Search",
    title: "SEO-First Web Development",
    tagline: "Web applications built from day one to be lightning fast and search-ready.",
    description:
      "Unlike pure marketers, I write code. I build clean, modern web applications using Next.js and TypeScript that pass Core Web Vitals with flying colors, ship with dynamic metadata, and render seamlessly for crawlers.",
    deliverables: [
      "Next.js App Router & Server-Side Rendering (SSR)",
      "Dynamic OpenGraph previews & social cards",
      "Automated sitemap.xml & robots.txt pipelines",
      "Programmatic SEO architecture for scalable page generation",
      "Clean semantic HTML & accessibility (WCAG) compliance",
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
  },
] as const;

export const EXPERIENCE = {
  role: "SEO Expert (Intern)",
  company: "CoxFuture Technologies Pvt. Ltd.",
  period: "March 2026 – Present",
  highlight:
    "Managing end-to-end SEO for two live, multi-region company websites — CoxFuture (India) and Denmaq (US/Canada).",
  groups: [
    {
      title: "Strategy & Research",
      items: [
        "Conducting keyword research and targeting region-specific audiences using Semrush.",
        "Tracking traffic, rankings and user behavior across both markets.",
        "Improving organic visibility through iterative optimization.",
      ],
    },
    {
      title: "On-Page & Content",
      items: [
        "Implementing on-page SEO: metadata, headings, internal linking and image optimization.",
        "Optimizing content for region-specific audiences on both websites.",
        "Writing and publishing SEO blog content targeting regional keywords.",
      ],
    },
    {
      title: "Technical SEO",
      items: [
        "Handling XML sitemaps, robots.txt and crawlability improvements.",
        "Auditing key pages using Screaming Frog and Lighthouse.",
        "Working on page speed, SEO scores and accessibility improvements.",
      ],
    },
    {
      title: "Analytics, Local & Paid",
      items: [
        "Monitoring indexing and search performance with Google Search Console.",
        "Managing Google Business Profile and GA4.",
        "Running Meta Ads campaigns for leads and traffic.",
      ],
    },
  ],
} as const;

export type Project = {
  number: string;
  title: string;
  tech: string[];
  description: string;
  highlight?: string;
  liveUrl: string | null;
  cta: string;
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Job Board Web Platform",
    tech: ["Next.js", "TypeScript", "SEO"],
    description:
      "A job search, application and posting platform with dashboard management functionality, targeting US companies.",
    highlight: "Personally handled the SEO implementation.",
    liveUrl: "https://tradeboard-mu.vercel.app/",
    cta: "View Live Project",
  },
  {
    number: "02",
    title: "AI Resume Analyzer",
    tech: ["Python", "spaCy", "Scikit-learn", "Flask", "PostgreSQL"],
    description:
      "An NLP-based resume analysis platform using vectorization pipelines and database indexing for fast resume matching.",
    liveUrl: "https://hirematch-ai-9lfe.onrender.com/",
    cta: "View Live Project",
  },
  {
    number: "03",
    title: "Flutter Team App",
    tech: ["Dart", "Flutter"],
    description:
      "Built core application screens and UI as part of a two-person development team. Backend integration is currently in progress.",
    liveUrl: null,
    cta: "Development Project",
  },
] as const;

export const SEO_SKILLS = {
  seo: [
    "Keyword Research",
    "On-Page SEO",
    "Off-Page SEO",
    "Technical SEO",
    "Local SEO",
    "Multi-Region SEO",
    "Content Optimization",
  ],
  tools: [
    "Semrush",
    "Google Search Console",
    "Google Analytics 4",
    "Screaming Frog",
    "Lighthouse",
    "Google Business Profile",
  ],
  marketing: ["Meta Ads", "Lead Generation", "SEO Blogging"],
} as const;

export const DEV_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "Dart",
  "Flutter",
  "Git",
  "GitHub",
  "UI/UX",
] as const;

export const EDUCATION = [
  {
    title: "BCA — Bachelor of Computer Applications",
    institution: "Teerthanker Mahaveer University (TMU)",
    location: "Moradabad",
    year: "2025",
    detail: "CGPA: 7.4",
  },
  {
    title: "AWS Cloud Workshop",
    institution: "Certified Program",
    location: null,
    year: null,
    detail: "10-day certified program",
  },
] as const;

export const WHY_CARDS = [
  {
    icon: "search",
    title: "Technical SEO Mindset",
    text: "Understands how search engines crawl, render and rank pages — and treats technical health as the foundation of every optimization.",
  },
  {
    icon: "code",
    title: "Development Knowledge",
    text: "Practical experience with modern technologies such as Next.js, TypeScript, Python and Flutter.",
  },
  {
    icon: "globe",
    title: "Multi-Region SEO",
    text: "Hands-on experience working with websites targeting different geographic markets, including India and US/Canada.",
  },
] as const;
