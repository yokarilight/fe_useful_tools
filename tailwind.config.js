/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Indigo-600
          hover: '#4F46E5',   // Indigo-700
          focus: '#4338CA',   // Indigo-500
        },
        secondary: {
          DEFAULT: '#E5E7EB', // Gray-200
          hover: '#D1D5DB',   // Gray-300
          focus: '#9CA3AF',   // Gray-400
        },
        danger: {
          DEFAULT: '#EF4444', // Red-600
          hover: '#DC2626',   // Red-700
          focus: '#B91C1C',   // Red-500
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.border-solid-slate-300': {
          border: '1px solid #cbd5e1',
        },
        '.flex-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      };

      addUtilities(newUtilities);
    },
  ],
}

