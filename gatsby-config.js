require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `upcycle-r`,
    siteUrl: process.env.GATSBY_STRAVA_API_REDIRECT_URI,
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
    "gatsby-plugin-use-query-params",
    "gatsby-plugin-gatsby-cloud",
  ],
};
