import React, { useState } from "react";
import Auth from "../pages/auth";

export const authContext = React.createContext();

const Provider = ({ children }) => {
  const [auth, setAuth] = useState(false); //boolean
  const [tokens, setTokens] = useState({
    access_token: "",
    refresh_token: "",
  });

  return (
    <authContext.Provider value={{ auth, setAuth, tokens, setTokens }}>
      {children}
    </authContext.Provider>
  );
};

export default ({ element }) => (
  <Provider>
    <Auth />
    <p>test</p>
    {element}
  </Provider>
);
