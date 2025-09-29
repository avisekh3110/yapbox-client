import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LocalPort } from "../const";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const noUserToast = () => {
    toast.error("No such user found!!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://${LocalPort}:5000/api/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("response :", response.data);
      })
      .catch((err) => {
        console.log(err);
        //User not found
        err.response.status == 404 && noUserToast();
        //Validation error
        if (err.response.status == 400) {
          const errors = JSON.parse(err.response.data);
          console.log(errors);
          errors.map((e) => {
            errorToast(e.message);
          });
        }
        //Bad Credentials
        if (err.response?.status === 401) {
          errorToast(err.response.data);
          setPassword("");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-a">
      <div className="w-full max-w-md bg-secondary-b rounded-2xl shadow-xl p-8 text-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Welcome Back!
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-secondary-c text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-500 transition "
            disabled={!email.trim() || !password.trim()}
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
