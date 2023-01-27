module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-blue": "linear-gradient(0deg,#fff,#eef7ff)",
                "secondary-blue": "#eef5fa",
                "terciary-blue": "#388ffe",
            },
        },
    },

    plugins: [require("tailwind-scrollbar")],
}
