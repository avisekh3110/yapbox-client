import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalPort } from "../const";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //for navigation
  const navigate = useNavigate();

  //all toasts
  const successToast = () => {
    toast.success("Signup Successfull!!");
    setTimeout(() => {
      toast.success("Navigating to Signin...", { autoClose: 3000 });
    }, 1000);
  };

  const validErrToast = (message) => {
    toast.error(message);
  };

  //submission/post resquest
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://${LocalPort}:5000/api/signup`, {
        userName,
        email,
        password,
      })
      .then((response) => {
        successToast();
        setTimeout(() => {
          navigate("/signin");
        }, 4000);
      })
      .catch((err) => {
        if (err.response?.status == 400) {
          const errors = JSON.parse(err.response.data.errors);
          errors.map((e) => {
            validErrToast(e.message);
          });
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-a">
      <div className="w-full max-w-md bg-secondary-b rounded-2xl shadow-xl p-8 text-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create an account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Username
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUserName(e.target.value)}
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
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-500 transition"
            disabled={!password.trim() || !userName.trim() || !email.trim()}
          >
            Sign Up
          </button>
        </form>

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
