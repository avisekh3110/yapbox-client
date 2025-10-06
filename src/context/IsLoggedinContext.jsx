import React, { useState } from "react";
import { createContext } from "react";

export const IsLoggedinContext = createContext();

export function IsLoggedinProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const toggleLogin = () => {
    setIsLoggedin((prev) => !prev);
  };

  const logginUser = (userData) => {
    setUser(userData);
    setIsLoggedin(true);
  };

  const loggoutUser = () => {
    setUser(userData);
    setIsLoggedin(false);
  };

  return (
    <IsLoggedinContext.Provider
      value={{
        isLoggedin,
        toggleLogin,
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
