import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-amber-400 text-white px-6 py-4 shadow-md w-full">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold tracking-wide">BAKBAK</div>

      {/* Buttons */}
      <div className="space-x-4">
        <NavLink
          to={"/signin"}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
        >
          Login
        </NavLink>
        <NavLink
          to={"/signup"}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}
