import * as React from "react";
import { Link } from "gatsby";
import Profile from "../components/profile";

const PageHeader = ({ pageTitle, children }) => {
  return (
    <div>
      <title>{pageTitle}</title>
      <nav className="bg-green-900 p-5 text-beige-900 font-spline">
        <div className="flex flex-wrap sm:flex-nowrap sm:justify-between">
          <ul className="flex">
            <li className="mr-3 h-fit">
              <Link to="/" activeClassName="active p-1">
                <span className="font-bold">{pageTitle}</span>
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/activities" activeClassName="active p-1">
                activities
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/zones" activeClassName="active p-1">
                zones
              </Link>
            </li>
            <li className="mr-3 h-fit">
              <Link to="/gear" activeClassName="active p-1">
                gear
              </Link>
            </li>
          </ul>
          <Profile margin="mt-5 sm:mt-0" profilePicSize="w-[100px] sm:w-auto" />
        </div>
      </nav>
    </div>
  );
};

export default PageHeader;
