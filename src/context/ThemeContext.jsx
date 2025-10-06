import React, { createContext, useState } from "react";

// Create context
export const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const logginUer = () => {
    setUser(response.data);
    if (!isLoggedin) toggleLogin();
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
