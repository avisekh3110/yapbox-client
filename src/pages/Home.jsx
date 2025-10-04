import React, { useContext } from "react";
import Navbar from "../components/navbar";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { IsLoggedinContext } from "../context/IsLoggedinContext";

export default function HOME() {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedin } = useContext(IsLoggedinContext);
  return (
    <div className={`w-full`}>
      <div
        className={`h-full w-full flex justify-center items-start rounded-r-xl flex-col p-10 sm:p-20`}
      >
        <div
          className={`flex flex-col font-black text-3xl sm:text-5xl ${
            darkMode ? "text-tertiary-dark" : "text-tertiary"
          }`}
        >
          <div className={`flex items-center justify-center gap-2`}>
            STAY
            <div
              className={`flex justify-center items-center font-itrishGrover text-3xl sm:text-6xl text-primary-b hover:rotate-0 -rotate-10 duration-300`}
            >
              COOL
            </div>
            WITH
          </div>
          <div>YAPBOX CHAT</div>
        </div>
        <div
          className={`${
            darkMode ? "text-tertiary-dark" : "text-tertiary"
          } px-1 sm:px-2 text-sm sm:text-lg`}
        >
          Instant connections. Real conversations.
        </div>
        {isLoggedin ? (
          <NavLink
            className={`mx-2 my-4 p-2 hover:bg-primary-b bg-transparent text-primary-b ring-2 ring-primary-b hover:text-white font-medium rounded-xs transition ease-out`}
            to={`/chats`}
          >
            CONTINUE TO CHATS
          </NavLink>
        ) : (
          <NavLink
            className={`mx-2 my-4 p-2 bg-primary-b hover:bg-transparent hover:text-primary-b ring-2 ring-primary-b text-white font-medium rounded-xs transition ease-out`}
            to={`/signup`}
          >
            CREATE ACCOUNT
          </NavLink>
        )}
      </div>
      <div
        className={`h-full w-1/2 bg-gray-200 rounded-r-xl hidden lg:flex`}
      ></div>
    </div>
  );
}
