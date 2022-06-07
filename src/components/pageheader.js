import * as React from "react";
import { Link } from "gatsby";
import Profile from "../components/profile";

const PageHeader = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title>
      <nav className="bg-orange-500">
        <div className="flex">
          <ul className="flex-auto">
            <li>
              <h1>{pageTitle}</h1>
            </li>
            <li>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/activities" activeClassName="active">
                Activities
              </Link>
            </li>
          </ul>
          <Profile />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default PageHeader;
