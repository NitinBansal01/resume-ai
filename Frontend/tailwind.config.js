/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d1117',
        'dark-card': '#161b22',
        'dark-panel': '#1c2230',
        'dark-input': '#1e2535',
        'dark-border': '#2a3348',
        'dark-text': '#e6edf3',
        'dark-muted': '#7d8590',
        'dark-accent': '#ff2d78',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

