import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic tokens (flip between dark/light automatically)
        fg: "rgb(var(--fg-rgb) / <alpha-value>)",
        foreground: "rgb(var(--fg-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        canvas: "var(--bg)",
        // adaptive brand accent text tokens
        brand: "rgb(var(--accent-violet-rgb) / <alpha-value>)",
        brandember: "rgb(var(--accent-ember-rgb) / <alpha-value>)",
        // Brand — pulled directly from the handbook artwork
        violet: {
          DEFAULT: "#6D4DF2",
          50: "#F1EEFE",
          100: "#E3DBFD",
          200: "#C6B7FB",
          300: "#A892F8",
          400: "#8B6EF5",
          500: "#6D4DF2",
          600: "#5733E0",
          700: "#4727B8",
          800: "#371F8F",
          900: "#281766",
        },
        ember: {
          DEFAULT: "#FF7A1A",
          50: "#FFF3E9",
          100: "#FFE3CC",
          200: "#FFC799",
          300: "#FFAB66",
          400: "#FF8F33",
          500: "#FF7A1A",
          600: "#E0640A",
          700: "#B34E05",
          800: "#853A04",
          900: "#572602",
        },
        ink: {
          DEFAULT: "#070711",
          900: "#070711",
          800: "#0B0B18",
          700: "#101024",
          600: "#171734",
          500: "#22224A",
        },
        mist: "#C9C9E6",
        glass: "rgba(255,255,255,0.06)",
        verde: "#22C55E",
        scarlet: "#F4435B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(109,77,242,0.55)",
        "glow-ember": "0 0 60px -12px rgba(255,122,26,0.55)",
        float: "0 30px 80px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee-x": {
          to: { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        aurora: "aurora-shift 16s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "marquee-x": "marquee-x 36s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
