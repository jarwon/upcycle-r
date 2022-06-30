import * as React from "react";
import PageHeader from "../components/pageheader";
import { authContext } from "../context/provider";

const Layout = ({ children }) => {
  return (
    <authContext.Consumer>
      {(context) => (
        <>
          <PageHeader pageTitle="upcycle" />
          <main>{children}</main>
        </>
      )}
    </authContext.Consumer>
  );
};

export default Layout;
