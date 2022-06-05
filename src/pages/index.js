// Step 1: Import React
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
// Step 2: Define your component
const IndexPage = () => {
  //define state
  const [Auth, setAuth] = useState();

  const getUser = () => {
    const clientId = 83167;
    const clientSecret = "36073471fd5bf8f963ade25fe5642a5699c0dc4d";
    const token = "c6ec1af1bd27a74fced84a48bd0e1558504bfb52";

    const url =
      "https://www.strava.com/oauth/authorize?client_id=83167&redirect_uri=http://localhost:8000&response_type=code&scope=read_all";
  };

  useEffect(() => {
    // getUser();
  }, []);

  //early return
  // if (!Auth) {
  //   return <div>Loading</div>;
  // }

  return (
    <Layout pageTitle="upcycle">
      <a href="https://www.strava.com/oauth/authorize?client_id=83167&redirect_uri=http://localhost:8000/exchange_token&response_type=code&scope=activity:read_all">
        pls login
      </a>
    </Layout>
  );
};
// Step 3: Export your component
export default IndexPage;
