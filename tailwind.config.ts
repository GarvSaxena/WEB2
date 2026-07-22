import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Neutral / Clean Palette ───────────────────────────────
      colors: {
        // Primary neutral accent — deep charcoal
        accent: {
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b", // primary text / dark backgrounds
          950: "#09090b",
        },
        // Surface tokens — light mode first, dark mode via .dark
        surface: {
          DEFAULT: "#ffffff",   // page background (light)
          subtle:  "#fafafa",   // section backgrounds
          muted:   "#f4f4f5",   // cards / inputs
          border:  "#e4e4e7",   // dividers / borders
          // Dark mode equivalents (used with dark: prefix)
          dark:    "#18181b",
          "dark-card":   "#27272a",
          "dark-border": "#3f3f46",
        },
        // Keep a minimal brand token for the portal/dashboard only
        brand: {
          DEFAULT: "#18181b",
          subtle:  "#27272a",
          muted:   "#3f3f46",
        },
      },
      // ── Typography ────────────────────────────────────────────
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      // ── Animations ────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in":    "fade-in 0.4s ease-out forwards",
        "slide-in":   "slide-in 0.35s ease-out forwards",
        "slide-down": "slide-down 0.25s ease-out forwards",
      },
      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        xl:   "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      // ── Box Shadows — subtle, elevation-based ─────────────────
      boxShadow: {
        "xs":  "0 1px 2px rgba(0,0,0,0.05)",
        "sm":  "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "md":  "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
        "lg":  "0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -4px rgba(0,0,0,0.04)",
        "nav": "0 1px 0 0 #e4e4e7",           // bottom border shadow for navbar
      },
    },
  },
  plugins: [],
};

export default config;
