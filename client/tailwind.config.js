/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array tells Tailwind where to look for your classes
  content: [
    "./index.html", // Important for scanning your base HTML
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, TSX files in your src folder
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
