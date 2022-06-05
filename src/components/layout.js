import * as React from "react";
import { Link } from "gatsby";
import PageHeader from "../components/pageheader";

const Layout = ({ children }) => {
  return (
    <div>
      <PageHeader pageTitle="upcycle" />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
