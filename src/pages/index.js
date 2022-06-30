import React, { useContext } from "react";
import Layout from "../components/layout";
import { authContext } from "../context/provider";

const IndexPage = () => {
  const { auth } = useContext(authContext);
  console.log(auth);
  return (
    <Layout pageTitle="upcycle">
      {!auth && (
        <div className="flex justify-center mt-3">
          <a
            href="https://www.strava.com/oauth/authorize?client_id=83167&redirect_uri=http://localhost:8000/auth&response_type=code&scope=activity:read_all,profile:read_all"
            className="font-spline bg-green-900 text-white p-3"
          >
            login
          </a>
        </div>
      )}
    </Layout>
  );
};

export default IndexPage;
