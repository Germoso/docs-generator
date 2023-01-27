/** @type {import('next').NextConfig} */
const path = require("path")

module.exports = {
    // ...next config
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["lh3.googleusercontent.com"],
    },
}
