import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './__vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  silenceDeprecations: ['legacy-js-api'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Sora', ...defaultTheme.fontFamily.sans],
        monospace: ['monospace'],
      },
      // Кастомная палитра цветов должна быть внутри theme.extend.colors
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        purple: {
          100: '#e7dcfd',
          500: '#6248A1FF',
          700: '#830874',
          800: '#221a69',
          850: '#6b21a8',
        },
        gray: {
          100: '#f6f8fa',
        },
        blue: {
          100: '#3ce4f0',
        },
        fukcia: {
          100: '#f76ab0',
        },
        red: {
          550: '#860000',
        },
        emerald: {
          100: '#dbfcf8',
          700: '#0d9488',
        },
      },
    },
  },
  plugins: [forms],
};
