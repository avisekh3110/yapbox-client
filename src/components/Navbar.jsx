import { Link, NavLink } from "react-router-dom";
import logo from "/logo.svg";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="w-full h-14 absolute top-0 flex justify-between items-center py-10 px-6 sm:px-12 ">
      <NavLink to={"/"} className="flex gap-1 items-center h-full">
        <img src={logo} width={35} height={35} />
        <div className="text-xl font-bold text-primary-b">YAPBOX</div>
      </NavLink>
      <div className=" hidden sm:flex gap-8 items-center h-full text-secondary-a">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "border-b-2" : ""} text-sm font-medium`
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${isActive ? "border-b-2" : ""} text-sm font-medium`
          }
        >
          ABOUT US
        </NavLink>
      </div>
      <div className="flex gap-4 items-center">
        <NavLink
          to={"/signin"}
          className={`text-sm font-semibold tracking-wide bg-primary-b hover:bg-transparent hover:text-primary-b ring-1 ring-primary-b text-white rounded-sm py-1 px-4 transition`}
        >
          SIGNIN
        </NavLink>
        <NavLink
          to={"/signup"}
          className={`text-sm hidden sm:flex font-medium px-4 py-1 rounded-sm ring-1 ring-primary-c ${
            darkMode ? "text-tertiary-dark" : "text-tertiary"
          } hover:bg-primary-c hover:text-secondary-c ease-out transition`}
        >
          SIGNUP
        </NavLink>
      </div>
    </div>
  );
}
