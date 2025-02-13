import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navBg: "rgba(5, 37, 44, 0.40)",
        ticketBtn: "rgba(213, 234, 0, 0.10)",
        transparent: "transparent",
        imageBg: "rgba(0, 0, 0, 0.20)",
        borderColor: "rgba(36, 160, 181, 0.50)",
        lightBorder: "rgba(36, 160, 181, 0.50)",
      },
      fontFamily: {
        sans: ["var(--font-rage)"],
        mono: ["var(--font-roboto)"],
        serif: ["var(--font-alatsi)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
