import React, { useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";

export const IsLoggedinContext = createContext();

export function IsLoggedinProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies("uid");

  const [user, setUser] = useState({});
  const [isLoggedin, setIsLoggedin] = useState(false);

  const logginUser = (userData) => {
    setUser(userData);
    setIsLoggedin(true);
  };

  const loggoutUser = () => {
    setUser({});
    setIsLoggedin(false);
    removeCookie("uid");
  };

  return (
    <IsLoggedinContext.Provider
      value={{
        isLoggedin,
        user,
        setUser,
        logginUser,
        loggoutUser,
      }}
    >
      {children}
    </IsLoggedinContext.Provider>
  );
}
