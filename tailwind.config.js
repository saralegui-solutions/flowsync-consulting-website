/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk,md,js}",
    "../portfolio/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#145250',      // Deep Teal
          medium: '#1a6b68',       // Ocean Teal
          light: '#e8f4f3',        // Whisper Teal
          dark: '#0f3d3b'          // Deep Teal Dark (for footer)
        },
        copper: {
          DEFAULT: '#b86832',      // Burnished Copper
          dark: '#8c4f26',         // Dark Copper (AA-safe for text)
          light: '#f0d4a8'         // Soft Amber
        },
        gold: {
          DEFAULT: '#9a7b2e'       // Deep Gold (for metrics)
        },
        bg: {
          warm: '#faf8f5',         // Warm White
          sand: '#f2ede5',         // Pale Sand
          dark: '#0f3d3b'          // Deep Teal Dark
        },
        text: {
          primary: '#1c2526',      // Dark Charcoal
          secondary: '#4d5c5b',    // Warm Slate
          ondark: '#f5f0ea'        // Warm White Light
        },
        success: '#2d6b4f',        // Forest Green
        border: '#d4cec4'          // Warm Gray
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Segoe UI', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
