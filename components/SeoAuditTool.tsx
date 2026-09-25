"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import {
  SearchIcon,
  CheckIcon,
  AlertIcon,
  ArrowRight,
  SpinnerIcon,
  GlobeIcon,
  SparklesIcon,
} from "./icons";
import type { SeoAuditResult } from "@/app/api/seo-audit/route";

const DEFAULT_AUDIT: SeoAuditResult = {
  url: "https://tradeboard-mu.vercel.app/",
  hostname: "tradeboard-mu.vercel.app",
  title: "TradeBoard | Job Search & Recruitment Platform for US Companies",
  titleLength: 62,
  titleStatus: "warning",
  titleFeedback: "Length is 62 chars (ideal: 30–60). Slightly long, but highly targeted with commercial keywords.",
  description: "Discover verified trade and tech jobs across top US companies. Search, apply, and manage job listings with modern real-time tracking.",
  descriptionLength: 135,
  descriptionStatus: "good",
  descriptionFeedback: "Optimal length (135 chars). Strong search intent alignment and clear call-to-action.",
  canonical: "https://tradeboard-mu.vercel.app/",
  canonicalStatus: "good",
  canonicalFeedback: "Self-referencing canonical tag verified. Prevents duplicate content indexation.",
  robots: "index, follow",
  robotsStatus: "good",
  robotsFeedback: "Search engines are instructed to crawl and index all public pages.",
  h1s: ["Find Your Next High-Impact Career Opportunity"],
  h1Status: "good",
  h1Feedback: "Single primary H1 found with strong search intent alignment.",
  ogTitle: "TradeBoard | Job Search & Recruitment Platform",
  ogDescription: "Discover verified jobs across top US companies. Search and apply seamlessly.",
  ogImage: "https://tradeboard-mu.vercel.app/og-image.png",
  ogStatus: "good",
  hasViewport: true,
  totalImages: 8,
  imagesMissingAlt: 0,
  overallScore: 94,
};

const PRESET_URLS = [
  { label: "Tradeboard (Job Platform)", url: "tradeboard-mu.vercel.app" },
  { label: "Arun Saini Portfolio", url: "arun-saini-portfolio.vercel.app" },
  { label: "CoxFuture Technologies", url: "coxfuture.com" },
];

export function SeoAuditTool() {
  const [inputUrl, setInputUrl] = useState("");
  const [audit, setAudit] = useState<SeoAuditResult>(DEFAULT_AUDIT);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  async function handleAudit(urlToTest?: string) {
    const target = (urlToTest ?? inputUrl).trim();
    if (!target) {
      setErrorMsg("Please enter a website URL to audit.");
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error || "Unable to audit the website. Please check the URL.");
        setLoading(false);
        return;
      }

      setAudit(json.data);
      if (urlToTest) setInputUrl(urlToTest);
    } catch {
      setErrorMsg("Network error while auditing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    audit.overallScore >= 90
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : audit.overallScore >= 75
      ? "text-amber-300 border-amber-500/30 bg-amber-500/10"
      : "text-red-400 border-red-500/30 bg-red-500/10";

  return (
    <section
      id="seo-tool"
      aria-label="Interactive SEO Audit and SERP Preview Tool"
      className="relative border-t border-line/60 py-24 sm:py-28"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />
      </div>

      <div className="container-x">
        <Reveal className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-medium text-accent-soft">
            <SparklesIcon className="h-3.5 w-3.5" />
            Interactive Tool
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Live SEO Snippet &amp; Audit Simulator
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            See how search engines crawl, render, and display your website in real Google search
            results. Test any URL or select a preset demo below.
          </p>
        </Reveal>

        {/* Input Bar & Presets */}
        <Reveal delay={80} className="mt-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAudit();
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-ink-dim">
                <GlobeIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter any domain or URL (e.g. yourwebsite.com)"
                className="w-full rounded-2xl border border-line bg-base-900/80 py-3.5 pl-11 pr-4 text-[14px] text-ink placeholder:text-ink-dim/60 transition-all duration-200 hover:border-line-strong focus:border-accent/60 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-7 py-3.5 text-sm font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white disabled:opacity-70 sm:w-auto"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="h-4 w-4" />
                  Analyzing...
                </>
              ) : (
                <>
                  <SearchIcon className="h-4 w-4" />
                  Analyze SEO
                </>
              )}
            </button>
          </form>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-ink-dim">Try quick demo:</span>
            {PRESET_URLS.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  setInputUrl(preset.url);
                  handleAudit(preset.url);
                }}
                className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-ink"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {errorMsg ? (
            <p className="mt-3 flex items-center gap-2 text-xs text-red-400">
              <AlertIcon className="h-3.5 w-3.5 shrink-0" />
              {errorMsg}
            </p>
          ) : null}
        </Reveal>

        {/* Results Showcase Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Live Google SERP Simulator */}
          <Reveal delay={120}>
            <div className="card-surface h-full p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 font-mono text-xs text-ink-dim">
                    Google Search Snippet Preview
                  </span>
                </div>

                {/* Device toggle */}
                <div className="inline-flex rounded-lg border border-line bg-base-900/60 p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeviceMode("desktop")}
                    className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                      deviceMode === "desktop"
                        ? "bg-white/[0.08] text-ink"
                        : "text-ink-dim hover:text-ink-muted"
                    }`}
                  >
                    Desktop SERP
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceMode("mobile")}
                    className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                      deviceMode === "mobile"
                        ? "bg-white/[0.08] text-ink"
                        : "text-ink-dim hover:text-ink-muted"
                    }`}
                  >
                    Mobile SERP
                  </button>
                </div>
              </div>

              {/* SERP Preview Box */}
              <div
                className={`mt-6 rounded-xl border border-line/70 bg-[#202124] p-5 shadow-inner transition-all ${
                  deviceMode === "mobile" ? "max-w-sm mx-auto" : "w-full"
                }`}
              >
                {/* Google Result URL Breadcrumb */}
                <div className="flex items-center gap-2.5 text-xs text-[#bdc1c6]">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#303134] text-[11px] font-bold text-white">
                    {audit.hostname.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate font-medium text-[#e8eaed]">
                      {audit.hostname}
                    </span>
                    <span className="block truncate text-[11px] text-[#9aa0a6]">
                      {audit.url}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="mt-2.5 font-sans text-[18px] leading-snug text-[#8ab4f8] hover:underline cursor-pointer">
                  {audit.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#bdc1c6] line-clamp-2">
                  {audit.description}
                </p>
              </div>

              {/* Length diagnostics counters */}
              <div className="mt-6 space-y-4 rounded-xl border border-line bg-base-900/40 p-4">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink-muted">Title Tag Length</span>
                    <span
                      className={`font-mono font-semibold ${
                        audit.titleLength >= 30 && audit.titleLength <= 60
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {audit.titleLength} / 60 characters
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-base-950">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        audit.titleLength >= 30 && audit.titleLength <= 60
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                      style={{
                        width: `${Math.min(100, (audit.titleLength / 60) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[11.5px] text-ink-dim">{audit.titleFeedback}</p>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-ink-muted">Meta Description Length</span>
                    <span
                      className={`font-mono font-semibold ${
                        audit.descriptionLength >= 120 && audit.descriptionLength <= 160
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {audit.descriptionLength} / 160 characters
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-base-950">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        audit.descriptionLength >= 120 && audit.descriptionLength <= 160
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                      style={{
                        width: `${Math.min(100, (audit.descriptionLength / 160) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[11.5px] text-ink-dim">{audit.descriptionFeedback}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Technical SEO Health Checklist */}
          <Reveal delay={180}>
            <div className="card-surface flex h-full flex-col p-6 sm:p-7">
              {/* Header with Health Score */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Technical SEO Score
                  </h3>
                  <span className="text-xs text-ink-dim">Based on crawl signals</span>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border font-display text-lg font-bold ${scoreColor}`}
                >
                  {audit.overallScore}
                </div>
              </div>

              {/* Checklist items */}
              <ul className="mt-4 flex-1 space-y-3.5">
                <li className="rounded-xl border border-line bg-base-900/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">H1 Heading</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        audit.h1Status === "good"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {audit.h1Status === "good" ? <CheckIcon className="h-3 w-3" /> : <AlertIcon className="h-3 w-3" />}
                      {audit.h1s.length} detected
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-dim leading-snug">
                    {audit.h1s[0] ?? "None"}
                  </p>
                </li>

                <li className="rounded-xl border border-line bg-base-900/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Canonical URL</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        audit.canonicalStatus === "good"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {audit.canonical ? "Configured" : "Missing"}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-dim leading-snug">
                    {audit.canonicalFeedback}
                  </p>
                </li>

                <li className="rounded-xl border border-line bg-base-900/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Search Robots Directive</span>
                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                      {audit.robots}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-dim leading-snug">
                    {audit.robotsFeedback}
                  </p>
                </li>

                <li className="rounded-xl border border-line bg-base-900/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Social Sharing (OpenGraph)</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        audit.ogStatus === "good"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {audit.ogTitle ? "Active" : "Partial"}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-dim leading-snug">
                    {audit.ogTitle ? `Preview: ${audit.ogTitle}` : "Missing og:title or og:image tags."}
                  </p>
                </li>

                <li className="rounded-xl border border-line bg-base-900/40 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-ink">Image Alt Attributes</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        audit.imagesMissingAlt === 0
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {audit.imagesMissingAlt === 0
                        ? "All Alt Tags Present"
                        : `${audit.imagesMissingAlt} Missing Alt`}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-ink-dim leading-snug">
                    {audit.totalImages} images scanned. Descriptive alt text helps image search ranking.
                  </p>
                </li>
              </ul>

              {/* Conversion prompt */}
              <div className="mt-5 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <p className="text-xs font-medium text-ink-muted">
                  Want a comprehensive 40-point manual audit covering Core Web Vitals, site speed,
                  and keyword competitors?
                </p>
                <a
                  href="#contact"
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-soft hover:underline"
                >
                  Request a Complete Technical Audit
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
