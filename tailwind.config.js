/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        avalon: {
          dark: '#04081f',
          darkalt: '#070d2e',
          mid: '#0c1338',
          blue: '#1e2a5e',
          glow: '#3b4fff',
          orange: '#ff7a18',
          orangebr: '#ffa726',
          orangedk: '#e85d04',
          white: '#e8f4ff',
          whiteblue: '#b4d5ff',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        body: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'star-twinkle': 'twinkle 4s ease-in-out infinite',
        'scan-line': 'scanLine 8s linear infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-reverse': 'rotateReverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        rotateReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '47%': { opacity: '1' },
          '48%': { opacity: '0.4' },
          '49%': { opacity: '1' },
          '52%': { opacity: '0.6' },
          '53%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
