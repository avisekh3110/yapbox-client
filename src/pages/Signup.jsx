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
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-md bg-gradient-to-b to-secondary-c from-secondary-b rounded-2xl shadow-lg drop-shadow-xl shadow-secondary-b p-8 text-tertiary">
        <h2 className="text-2xl font-bold text-center mb-6 text-tertiary">
          Create an account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">
              Username
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-md bg-secondary-c ring-1 ring-secondary-b text-tertiary placeholder-secondary-a focus:outline-none focus:ring-2 focus:ring-primary-c"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-tertiary placeholder-secondary-a ring-1 ring-secondary-b focus:outline-none focus:ring-2 focus:ring-primary-c"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tertiary mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-tertiary placeholder-secondary-a ring-1 ring-secondary-b focus:outline-none focus:ring-2 focus:ring-primary-c"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-secto-secondary-c py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-500 transition"
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
