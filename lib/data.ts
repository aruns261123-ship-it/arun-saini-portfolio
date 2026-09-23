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
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
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
