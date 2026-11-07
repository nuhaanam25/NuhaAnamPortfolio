import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        "primary-pink": "#FF91A9",
        "secondary-pink": "#FFB1C1",
        "primary-text": "#F5F3F3",
        "secondary-text": "#A5A5A5",
        "card-bg": "#151515",
        border: "#303030",
      },
      fontFamily: {
        heading: ["'Bebas Neue'", "sans-serif"],
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-fade": "glowFade 3s ease-in-out infinite alternate",
      },
      keyframes: {
        glowFade: {
          "0%": { opacity: "0.4", transform: "scale(0.98)" },
          "100%": { opacity: "0.85", transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;