import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desa: {
          green: "#0f766e",
          dark: "#064e3b",
          gold: "#d4af37",
          cream: "#f7f7f2",
          light: "#ecfdf5",
        },
      },
      boxShadow: {
        soft: "0 12px 28px rgba(15, 118, 110, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
