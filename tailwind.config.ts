import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        prompt: {
          yellow: '#facc15',
          burgundy: '#7c1d1d',
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
