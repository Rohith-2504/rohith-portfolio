/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'milano-red': '#A90E02',
        'milano-red-dark': '#7A0A01',
        'milano-red-soft': '#C41408',
        chiffon: '#FFFBD4',
        'chiffon-soft': '#FFF9C4',
        'chiffon-muted': '#F5EFB8',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(169, 14, 2, 0.12)',
        hero: '0 28px 70px rgba(122, 10, 1, 0.35)',
        card: '0 16px 40px rgba(169, 14, 2, 0.1)',
        glow: '0 0 0 1px rgba(255, 251, 212, 0.25), 0 20px 50px rgba(169, 14, 2, 0.18)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'combo-gradient':
          'linear-gradient(165deg, #A90E02 0%, #8f0c02 28%, #c41408 42%, #FFFBD4 68%, #FFFBD4 100%)',
        'hero-gradient': 'linear-gradient(145deg, #A90E02 0%, #7A0A01 55%, #A90E02 100%)',
      },
    },
  },
  plugins: [],
};
