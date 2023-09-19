/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        't-base': '#111827',
        't-alt-1': '#e5f6f8',
        'c-base': '#ebf7f8',
        'c-select-1': '#5e2b2b',
        'c-hover-1': '#ffeecf',
        'c-error': '#dc3030',
        '1a': 'rgba(169,169,169,0.31)',
        '2a': 'rgba(161,161,161,0.18)',
      },
    },
    screens: {
      xl: {max: "1279px"},
      // => @media (max-width: 1279px) { ... }

      lg: {max: "1023px"},
      // => @media (max-width: 1023px) { ... }

      md: {max: "767px"},
      // => @media (max-width: 767px) { ... }

      sm: {max: "639px"},
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};

