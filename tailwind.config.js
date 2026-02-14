/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                surface: "var(--surface)",
                primary: "var(--primary)",
                accent: "var(--accent)",
                "accent-dim": "var(--accent-dim)",
                grid: "var(--grid-line)",
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
