/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
            },
            container: {
                center: true,
                padding: '1rem',
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            future: {
                hoverOnlyWhenSupported: true,
            },
        },
    },
    plugins: [],
};
