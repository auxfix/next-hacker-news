import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'darkblue': '#113740',
        'bluegradientstart': '#4facfe',
        'bluegradientend': '#00f2fe',
        'palegray': '#eee',
        'lightblue': '#4facfe',
        'normaltext': 'rgb(0 0 0 / 70%)',
      },
    },
  },
  plugins: [],
};
export default config;
