"use client";

import { useEffect, useState } from "react";

/**
 * Thin accent progress bar fixed to the top of the viewport showing
 * reading progress. Uses transform only (compositor-friendly) and
 * disables itself visually under prefers-reduced-motion.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent motion-reduce:hidden"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-accent-purple will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
