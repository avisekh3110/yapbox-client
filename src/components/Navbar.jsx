import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between place-self-center bg-primary-b text-white px-10 py-3 shadow-md w-24/25 absolute top-4 rounded-4xl">
      {/* Logo / Brand */}
      <Link to={"/"} className="text-2xl font-bold tracking-wide">
        YAPBOX
      </Link>

      {/* Buttons */}
      <div className="gap-4 flex ">
        <NavLink
          to={"/signin"}
          className="px-6 py-2 flex justify-center items-center rounded-full bg-secondary-c hover:bg-secondary-a transition"
        >
          Login
        </NavLink>
        <NavLink
          to={"/signup"}
          className="px-6 py-2 flex justify-center items-center rounded-full bg-primary-c hover:bg-primary-a transition ease-in"
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}
