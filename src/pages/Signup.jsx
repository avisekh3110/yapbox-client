import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("first");
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/signup", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3136]">
      <div className="w-full max-w-md bg-[#36393f] rounded-2xl shadow-xl p-8 text-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create an account
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-[#40444b] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

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
            // onSubmit={handleSubmit}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Sign Up
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <NavLink to={"/signin"} className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
