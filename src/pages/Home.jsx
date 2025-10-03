import React from "react";
import Navbar from "../components/navbar";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

export default function HOME() {
  return (
    <div className="min-h-screen h-screen min-w-screen justify-center items-center flex bg-gradient-to-br from-primary-a to-primary-c">
      <div className="flex lg:w-2/3 w-11/12 h-10/12 rounded-xl bg-white  justify-between items-center shadow-2xl drop-shadow-2xl shadow-grap-500 relative">
        <Navbar />
        <div className="h-full w-full lg:w-1/2 flex justify-center items-start rounded-r-xl flex-col p-10 sm:p-20">
          <div className="flex flex-col font-black text-3xl md:text-5xl">
            <div className="flex items-center justify-center gap-2 ">
              STAY
              <div className="flex justify-center  items-center font-mono text-3xl sm:text-6xl text-primary-b hover:rotate-0 -rotate-10 duration-300">
                COOL
              </div>
              WITH
            </div>
            YAPBOX CHAT
          </div>
          <div className=" px-1 sm:px-2 text-sm sm:text-lg">
            Instant connections. Real conversations.
          </div>
          <NavLink
            className="mx-2 my-4 p-2 bg-primary-b hover:bg-transparent hover:text-primary-b ring-2 ring-primary-b text-white font-medium rounded-xs transition ease-out"
            to={"/signup"}
          >
            CREATE ACCOUNT
          </NavLink>
        </div>
        <div className="h-full w-1/2 bg-gray-200 rounded-r-xl hidden lg:flex"></div>
        <Footer />
      </div>
    </div>
  );
}
