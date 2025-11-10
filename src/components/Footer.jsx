import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function () {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-0 p-4 sm:p-8 text-secondary-a text-xs md:text-sm lg:text-md flex items-end justify-between w-full">
      <p>© Avisekh Sabi Copyright 2025. Made with ❤️</p>
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
          darkMode
            ? "bg-secondary-dark-b text-tertiary-dark"
            : "bg-secondary-b text-tertiary"
        } transition`}
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
