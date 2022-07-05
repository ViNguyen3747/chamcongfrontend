module.exports = {
    content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
    theme: {
        extend: {
            backgroundColor: ["active"],
        },
        borderWidth: {
            DEFAULT: "1px",
            2: "2px",
            10: "100px",
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            turquoise: {
                lightest: "#dafcfb",
                light: "#6acecc",
                DEFAULT: "#05aea6",
                dark: "#019091",
            },
            blue: {
                DEFAULT: "#132e48",
            },
            yellow: {
                DEFAULT: "#e8bc10",
            },
            green: {
                DEFAULT: "#056947",
            },
            brown: {
                light: "#ae4700",
                DEFAULT: "#802e0e",
                dark: "#802e0e",
            },
            gray: {
                darkest: "#1f2d3d",
                dark: "#3c4858",
                DEFAULT: "#c0ccda",
                light: "#e0e6ed",
                lightest: "#f9fafc",
            },
            white: {
                DEFAULT: "#FFFFFF",
            },
            slate: {
                DEFAULT: "rgb(209 213 219)",
                blue: "#7cabd6",
            },
            table: {
                first: "#a3cef1",
                second: "#6096ba"
            }
        },
    },
    variants: {
        textColor: ["hover", "active"],
    },
    plugins: [],
};