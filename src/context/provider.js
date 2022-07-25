import React, { useEffect, useState } from "react";
import Auth from "../pages/auth";
import { getAccessToken, getAccessTokenEndpoint } from "../../utilities/strava";
import { expiresAt } from "../../utilities/date";
import { navigate } from "gatsby";

export const authContext = React.createContext({
  // auth: false,
  // setAuth: null,
  // makeStravaRequest: null,
  // setStravaToken: null,
});

const Provider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(
    JSON.parse(localStorage.getItem("strava_token"))
  );

  //takes access token request data and stores it in localStorage and state
  const setStravaToken = (data) => {
    const { refresh_token, access_token, expires_at, expires_in } = data;
    localStorage.setItem(
      "strava_token",
      JSON.stringify({ refresh_token, access_token, expires_at, expires_in })
    );
    setTokenInfo(JSON.parse(localStorage.getItem("strava_token")));
  };

  //request to get new access token using refresh token
  const updateAccessToken = async () => {
    const res = await fetch(getAccessTokenEndpoint(tokenInfo.refresh_token), {
      method: "POST",
      headers: { Authorization: `Bearer: ${tokenInfo.access_token}` },
    });
    const data = await res.json();
    console.log(data);
    //store data in state
    setStravaToken(data);
    return data;
  };

  //wrapper function that takes in method type and URLs to handle all calls
  const makeStravaRequest = async (method, requestURL) => {
    //store state in local variable within function
    console.log(auth);
    if (!tokenInfo) {
      return navigate("/", { replace: true });
    }
    let currentTokenInfo = tokenInfo;
    //check if access token has expired
    if (expiresAt(currentTokenInfo.expires_at) < Date.now()) {
      //if expired, make request to get new access token
      currentTokenInfo = await updateAccessToken();
    }
    //makes original request using fresh token
    const res = await fetch(requestURL, {
      method: method,
      headers: { Authorization: `Bearer ${currentTokenInfo.access_token}` },
    });

    return res;
  };

  useEffect(() => {
    setAuth(!!tokenInfo);
  }, [tokenInfo]);

  useEffect(() => {
    console.log(auth);
    if (!auth) {
      navigate("/", { replace: true });
    }
  }, [auth]);

  return (
    <authContext.Provider
      value={{ auth, setAuth, makeStravaRequest, setStravaToken }}
    >
      {children}
    </authContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
