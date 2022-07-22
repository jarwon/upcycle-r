require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `upcycle-r`,
    siteUrl: `http://localhost:8000`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Configure SASS to process Tailwind
        postCssPlugins: [require("tailwindcss")],
      },
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        // defaultCrumb: optional To create a default crumb
        // see Click Tracking default crumb example below
        // defaultCrumb: {
        //   location: {
        //     pathname: "/",
        //   },
        //   crumbLabel: "HomeCustom",
        //   crumbSeparator: " / ",
        // },
        // usePathPrefix: optional, if you are using pathPrefix above
        // usePathPrefix: "/blog",
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-use-query-params",
  ],
};
