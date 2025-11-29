/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
        colors: { surface:'#0B0F14', card:'#121821', ink:'#E6EDF3', sub:'#9AA7B2', accent:'#7C9CFF' },
        boxShadow: { soft:'0 6px 24px rgba(0,0,0,0.25)' },
        maxWidth: { gem:'960px' }
        },
    },
    plugins: [],
}