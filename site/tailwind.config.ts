import type { Config } from "tailwindcss";

// Colour is driven entirely by CSS custom properties defined in globals.css,
// so a single token name resolves correctly in both themes and nothing has to
// be written twice as `x dark:y`.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        faint: "var(--faint)",
      },
      fontFamily: {
        sans: ["var(--font-kanit)", "Trebuchet MS", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
