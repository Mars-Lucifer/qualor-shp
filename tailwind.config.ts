import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'q-dark': '#1F2128',
        'q-accent': '#D6FF33',
        'q-muted': '#7E8395',
        'q-surface': '#F5F5F5',
        'q-danger': '#FF3333',
        'q-star': '#FFBE33',
        'q-border': '#D6D6DB',
      },
      borderRadius: {
        'q-input': '14px',
        'q-card': '20px',
        'q-panel': '32px',
        'q-hero': '40px',
        'q-pill': '9999px',
      },
    },
  },
  plugins: [],
};

export default config;