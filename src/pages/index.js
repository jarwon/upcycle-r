import React, { useContext } from "react";
import Layout from "../components/layout";
import { authContext } from "../context/provider";

const IndexPage = ({ location }) => {
  const { auth } = useContext(authContext);

  const loginURL = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_API_CLIENT_ID}&redirect_uri=${process.env.STRAVA_API_REDIRECT_URI}/auth&response_type=code&scope=activity:read_all,profile:read_all`;
  return (
    <Layout pageTitle="upcycle" location={location}>
      {!auth && (
        <div className="flex justify-center mt-3">
          <a href={loginURL} className="spline bg-green-900 text-white p-3">
            login
          </a>
        </div>
      )}
    </Layout>
  );
};

export default IndexPage;
