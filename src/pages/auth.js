import React, { useEffect, useContext } from "react";
import { useQueryParam } from "use-query-params";
import { exchangeToken, getAccessToken } from "../../utilities/strava";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import { authContext } from "../context/provider";
import { expiresAt } from "../../utilities/date";

const Auth = ({ location }) => {
  const [code] = useQueryParam("code");
  const { setAuth, setStravaToken } = useContext(authContext);

  useEffect(async () => {
    if (code) {
      try {
        const res = await exchangeToken(code);
        if (res.ok) {
          const data = await res.json();
          setStravaToken(data);
          // setAuth(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [code]);

  return (
    <Layout location={location}>
      <div></div>
    </Layout>
  );
};

export default Auth;
