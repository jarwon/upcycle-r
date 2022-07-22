import * as React from "react";
import PageHeader from "../components/pageheader";
import { authContext } from "../context/provider";

const Layout = ({ children, location }) => {
  const locationParsed = (location) => {
    return location.pathname.slice(1);
  };

  return (
    <authContext.Consumer>
      {(context) => (
        <>
          <PageHeader pageTitle="upcycle" />
          <h1 className="bg-green-50 uppercase text-sm text-green-900 font-medium py-2 px-5">
            {locationParsed(location)}
          </h1>
          <main className="p-5">{children}</main>
        </>
      )}
    </authContext.Consumer>
  );
};

export default Layout;
