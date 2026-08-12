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
        primary: {
          DEFAULT: "#2F6BFF",
          dark: "#1E4FD6",
          light: "#EAF0FF",
        },
        ink: {
          DEFAULT: "#1A1D29",
          soft: "#4B5265",
          faint: "#8A91A5",
        },
        accent: {
          DEFAULT: "#10B981",
          dark: "#0B8F64",
          light: "#E7FBF3",
        },
        warn: {
          DEFAULT: "#F59E0B",
          light: "#FEF3E2",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEEBEB",
        },
      },
      fontFamily: {
        display: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        brutal: "5px 5px 0px 0px #1A1D29",
        "brutal-sm": "3px 3px 0px 0px #1A1D29",
        "brutal-primary": "5px 5px 0px 0px #1E4FD6",
        "brutal-lg": "8px 8px 0px 0px #1A1D29",
      },
      borderRadius: {
        brutal: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
