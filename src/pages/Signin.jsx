import React from "react";
import { NavLink } from "react-router-dom";

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3136]">
      <div className="w-full max-w-md bg-[#36393f] rounded-2xl shadow-xl p-8 text-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Welcome Back!
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-[#40444b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-[#40444b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            // onSubmit={handleSubmit}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <NavLink to={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
