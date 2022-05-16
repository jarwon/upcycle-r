import * as React from "react";
import { Link } from "gatsby";

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
          {pageTitle}
        </h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
