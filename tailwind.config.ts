import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#050508",
          900: "#0a0a10",
          850: "#0d0d15",
          800: "#12121c",
          700: "#1a1a26",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },
        accent: {
          DEFAULT: "#6d7cff",
          soft: "#8b96ff",
          purple: "#a06bff",
          cyan: "#5ce0d8",
        },
        ink: {
          DEFAULT: "#f4f5fa",
          muted: "#a2a5b8",
          dim: "#6f7284",
        },
      },
      fontFamily: {
        sans: ['"Inter var"', "Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ['"Sora"', '"Inter var"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        glow: "0 0 40px -12px rgba(109,124,255,0.45)",
        card: "0 24px 60px -24px rgba(0,0,0,0.7)",
        lift: "0 32px 80px -32px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,150,255,0.12)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(0,-18px,0) scale(1.05)" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "64px 64px" },
        },
        "tilt-float": {
          "0%, 100%": {
            transform: "perspective(1100px) rotateX(9deg) rotateY(-13deg) translateY(0px)",
          },
          "50%": {
            transform: "perspective(1100px) rotateX(6deg) rotateY(-10deg) translateY(-12px)",
          },
        },
        "chip-float": {
          "0%, 100%": { transform: "translate3d(0, 0, 60px) translateY(0px)" },
          "50%": { transform: "translate3d(0, 0, 60px) translateY(-9px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "drift-slow": "drift-slow 12s ease-in-out infinite",
        "grid-pan": "grid-pan 24s linear infinite",
        "tilt-float": "tilt-float 11s ease-in-out infinite",
        "chip-float": "chip-float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
