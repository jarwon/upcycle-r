import * as React from "react";
import { Link } from "gatsby";
import Profile from "../components/profile";

const PageHeader = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title>
      <nav className="bg-green-900 p-5">
        <div className="flex">
          <ul className="flex flex-auto">
            <li className="mr-5 h-fit">
              <h1 className="font-bold">{pageTitle}</h1>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/" activeClassName="active p-1">
                home
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/activities" activeClassName="active p-1">
                activities
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/gear" activeClassName="active p-1">
                gear
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/heatmap" activeClassName="active p-1">
                heatmap
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/zones" activeClassName="active p-1">
                zones
              </Link>
            </li>
          </ul>
          <Profile className="flex" />
        </div>
      </nav>
    </div>
  );
};

export default PageHeader;
