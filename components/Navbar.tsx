"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, CONTACT } from "@/lib/data";
import { CloseIcon, LinkedInIcon, GitHubIcon, MailIcon, MenuIcon, DownloadIcon } from "./icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the menu and returns focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Minimal focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const panel = menuPanelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
      );
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKeydown);
    // Move focus into the menu when it opens.
    const raf = requestAnimationFrame(() => focusables()[0]?.focus());
    return () => {
      panel.removeEventListener("keydown", onKeydown);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-base-950/85 shadow-card backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between sm:h-[72px]"
      >
        <a
          href="#home"
          className="font-display text-base font-bold tracking-[0.14em] text-ink transition-colors hover:text-accent-soft sm:text-lg"
        >
          ARUN&nbsp;SAINI
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-gradient-to-r from-accent to-accent-purple transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href="/resume.pdf"
            download="Arun_Saini_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Arun Saini's Resume (PDF)"
            className="hidden items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent-soft md:inline-flex"
          >
            <DownloadIcon className="h-3.5 w-3.5 text-accent-soft" />
            Resume
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lift sm:inline-flex"
          >
            Let&apos;s Talk
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink transition-colors hover:border-line-strong lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        } fixed inset-x-0 top-16 bottom-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-base-950/80 backdrop-blur-md"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          ref={menuPanelRef}
          className={`absolute inset-x-4 top-4 rounded-2xl border border-line bg-base-850/95 p-4 shadow-card transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-ink-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-xs font-semibold text-base-950"
              >
                Let&apos;s Talk
              </a>
              <a
                href="/resume.pdf"
                download="Arun_Saini_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-ink"
              >
                <DownloadIcon className="h-3.5 w-3.5 text-accent-soft" />
                Resume
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-ink-muted">
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                tabIndex={open ? 0 : -1}
                className="rounded-full p-2.5 hover:text-ink"
              >
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                tabIndex={open ? 0 : -1}
                className="rounded-full p-2.5 hover:text-ink"
              >
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Send email"
                tabIndex={open ? 0 : -1}
                className="rounded-full p-2.5 hover:text-ink"
              >
                <MailIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
