import "./src/scss/global.scss";
import "@fontsource/inter";
import Provider from "./src/context/provider";
// import "gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  // console.log("new pathname", location.pathname);
  // console.log("old pathname", prevLocation ? prevLocation.pathname : null);
};

export const wrapRootElement = Provider;
