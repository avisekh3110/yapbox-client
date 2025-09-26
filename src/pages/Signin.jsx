import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/signin", {
        email,
        password,
      })
      .then((response) => {
        console.log("response :", response.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

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
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-[#40444b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-[#40444b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            onClick={handleSubmit}
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
