/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#eef2f7',
          100: '#d0deec',
          200: '#a1bee0',
          300: '#729ed3',
          400: '#4d7abf',
          500: '#345ca3',
          600: '#1a365d', // Primary
          700: '#14294a',
          800: '#0e1d37',
          900: '#091223',
        },
        // Secondary colors
        secondary: {
          50: '#f0f7f7',
          100: '#d6eaea',
          200: '#add5d5',
          300: '#84c0c0',
          400: '#5ba9a9',
          500: '#3e8a8a',
          600: '#2c6363',
          700: '#1f4545',
          800: '#132828',
          900: '#050a0a',
        },
        // Accent colors
        accent: {
          50: '#fef7ee',
          100: '#fde6cf',
          200: '#f6ad55', // Accent
          300: '#f69e3b',
          400: '#f38b0e',
          500: '#d47508',
          600: '#a45a06',
          700: '#733f04',
          800: '#432503',
          900: '#150c01',
        },
        // Success colors
        success: {
          50: '#ebfdf4',
          100: '#c7f9e2',
          200: '#8bf0c3',
          300: '#50e6a5',
          400: '#22bd7d',
          500: '#0d9f67',
          600: '#007c50',
          700: '#005a3d',
          800: '#00372a',
          900: '#001512',
        },
        // Warning colors
        warning: {
          50: '#fefbeb',
          100: '#fcf3cd',
          200: '#f9e49b',
          300: '#f6d168',
          400: '#f2bc36',
          500: '#d99e11',
          600: '#a87a0c',
          700: '#765607',
          800: '#453304',
          900: '#151001',
        },
        // Error colors
        error: {
          50: '#fdeeee',
          100: '#f9cdcd',
          200: '#f29b9b',
          300: '#eb6969',
          400: '#e33737',
          500: '#c41c1c',
          600: '#991616',
          700: '#6d1010',
          800: '#410a0a',
          900: '#150303',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"SF Pro Display"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};