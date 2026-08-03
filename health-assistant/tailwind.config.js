/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#fb6666',
          500: '#f13a3a',
          600: '#dd1f1f',
          700: '#b91414',
          800: '#991414',
          900: '#7f1717',
          950: '#450707'
        },
        ink: {
          50: '#f6f6f7',
          100: '#e1e1e3',
          200: '#c3c3c8',
          300: '#9d9da5',
          400: '#77777f',
          500: '#5c5c64',
          600: '#48484f',
          700: '#38383e',
          800: '#222226',
          900: '#131315',
          950: '#0a0a0b'
        }
      },
      fontFamily: {
        display: ['Vazirmatn', 'system-ui', 'sans-serif'],
        body: ['Vazirmatn', 'system-ui', 'sans-serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-10px) rotate(4deg)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 }
        }
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        wiggle: 'wiggle 2.2s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
