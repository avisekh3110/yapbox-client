import React, { useState } from "react";
import { createContext } from "react";

export const IsLoggedinContext = createContext();

export default function IsLoggedinProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const toggleLogin = () => {
    setIsLoggedin((prev) => !prev);
  };
  return (
    <IsLoggedinContext.Provider value={{ isLoggedin, toggleLogin }}>
      {children}
    </IsLoggedinContext.Provider>
  );
}
