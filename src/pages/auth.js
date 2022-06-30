import React, { useEffect, useContext } from "react";
import { useQueryParam } from "use-query-params";
import { exchangeToken, getAccessToken } from "../../utilities/strava";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import { authContext } from "../context/provider";

const Auth = () => {
  const [code] = useQueryParam("code");

  const { setAuth, setTokens } = useContext(authContext);

  useEffect(async () => {
    if (code) {
      try {
        const res = await exchangeToken(code);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const { refresh_token, access_token } = data;
          console.log(
            "refresh token:",
            refresh_token,
            "access token:",
            access_token
          );
          setTokens({
            access_token: access_token,
            refresh_token: refresh_token,
          });
          setAuth(true);
          //use refresh token (if not expired) to get new access token
          const expiresAt = data.expires_at * 1000;
          console.log(expiresAt, Date.now());

          if (expiresAt < Date.now()) {
            console.log("expired!");
            const resNewTokenObj = await getAccessToken(refresh_token);
            if (resNewTokenObj.ok) {
              const dataNewTokenObj = await resNewTokenObj.json();
              const newAccessToken = dataNewTokenObj.access_token;
              setTokens({
                access_token: newAccessToken,
              });
            }
          }
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [code]);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
};

export default Auth;
