"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/data";
import { Reveal } from "./Reveal";
import { LiveLocationLabel } from "./LiveLocation";
import {
  PinIcon,
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  LinkedInIcon,
  GitHubIcon,
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
  AlertIcon,
  SpinnerIcon,
} from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message" | "company", string>>;

function validate(values: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject (at least 3 characters).";
  }
  if (values.message.trim().length < 20) {
    errors.message = "Please write a message of at least 20 characters.";
  }
  return errors;
}

const inputCls =
  "w-full rounded-xl border border-line bg-base-900/70 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-dim/70 transition-colors duration-200 hover:border-line-strong focus:border-accent/60 focus:outline-none aria-[invalid=true]:border-red-400/60";

export function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "", company: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // guard against duplicate submissions
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      const first = document.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("submitting");
    // Posted to the site's own API route (app/api/contact), which validates
    // and sends the notification email server-side through Resend. The API
    // key never reaches the browser.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          company: values.company,
        }),
      });
      const data: { ok?: boolean; errors?: FieldErrors } = await res
        .json()
        .catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", email: "", subject: "", message: "", company: "" });
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        const first = Object.keys(data.errors)[0];
        document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden border-t border-line/60 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-drift-slow" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(60% 60% at 50% 40%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(60% 60% at 50% 40%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-x">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="section-label">Contact</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s Build Something That{" "}
            <span className="text-gradient">Gets Found.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Whether you need technical SEO, on-page optimization, website audits or a
            developer who understands both code and search — let&apos;s connect.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* left: contact details */}
          <Reveal delay={80}>
            <div className="flex h-full flex-col">
              <ul className="space-y-4">
                <li>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-emerald-500/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/20">
                      <WhatsAppIcon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                        WhatsApp — fastest reply
                      </span>
                      <span className="block text-[14.5px] font-medium text-ink">
                        {CONTACT.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="card-surface group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft">
                      <PhoneIcon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                        Phone
                      </span>
                      <span className="block text-[14.5px] font-medium text-ink">
                        {CONTACT.phoneDisplay}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="card-surface group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft">
                      <MailIcon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                        Email
                      </span>
                      <span className="block truncate text-[14.5px] font-medium text-ink">
                        {CONTACT.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <div className="card-surface flex items-center gap-4 p-5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-accent/10 text-accent-soft">
                      <PinIcon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                        Location
                      </span>
                      <span className="block text-[14.5px] font-medium text-ink">
                        <LiveLocationLabel />
                      </span>
                    </span>
                  </div>
                </li>
              </ul>

              <div className="card-surface mt-4 flex-1 p-5">
                <span className="block text-[11px] font-medium uppercase tracking-widest2 text-ink-dim">
                  Profiles
                </span>
                <div className="mt-3.5 flex gap-3">
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-[13.5px] font-medium text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                  <a
                    href={CONTACT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.03] px-4 py-2.5 text-[13.5px] font-medium text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-ink"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    GitHub
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right: form */}
          <Reveal delay={160}>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="card-surface relative p-7 sm:p-8"
              aria-label="Contact form"
            >
              {/* honeypot — visually hidden, only bots fill this */}
              <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={set("company")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-[12.5px] font-medium text-ink-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={set("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputCls}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-2 text-[12.5px] text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[12.5px] font-medium text-ink-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputCls}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" role="alert" className="mt-2 text-[12.5px] text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-[12.5px] font-medium text-ink-muted"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={values.subject}
                  onChange={set("subject")}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  className={inputCls}
                />
                {errors.subject ? (
                  <p id="contact-subject-error" role="alert" className="mt-2 text-[12.5px] text-red-400">
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[12.5px] font-medium text-ink-muted"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your website, goals or project…"
                  value={values.message}
                  onChange={set("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${inputCls} resize-y`}
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="mt-2 text-[12.5px] text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-base-950 shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <SpinnerIcon className="h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <div aria-live="polite">
                {status === "success" ? (
                  <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[13.5px] text-emerald-300">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                ) : null}
                {status === "error" ? (
                  <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.5px] text-red-300">
                    <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    Unable to send your message right now. Please try again or
                    contact me directly by email.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
