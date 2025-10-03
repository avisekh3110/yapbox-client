import { Link, NavLink } from "react-router-dom";
import logo from "/logo.svg";

export default function Navbar() {
  return (
    <div className="w-full h-14 absolute top-0 flex justify-between items-center py-8 px-6 sm:px-12 ">
      <div className="flex gap-1 items-center h-full">
        <img src={logo} width={30} height={30} />
        <div className="text-lg font-bold text-primary-b">YAPBOX</div>
      </div>
      <div className=" hidden sm:flex gap-8 items-center h-full text-secondary-c">
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
          className={`text-sm font-semibold tracking-wide bg-primary-b hover:bg-white hover:text-primary-b ring-1 ring-primary-b text-white rounded-sm py-1 px-4 transition`}
        >
          SIGNIN
        </NavLink>
        <NavLink
          to={"/signin"}
          className="text-sm hidden sm:flex font-medium px-4 py-1 rounded-sm ring-1 ring-primary-c hover:bg-primary-c hover:text-white ease-out transition"
        >
          SIGNUP
        </NavLink>
      </div>
    </div>
  );
}
