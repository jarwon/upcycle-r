module.exports = {
  siteMetadata: {
    title: `upcycle-r`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Configure SASS to process Tailwind
        postCssPlugins: [require("tailwindcss")],
      },
    },
    "gatsby-plugin-postcss",
  ],
};
