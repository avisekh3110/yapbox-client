import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverPort } from "../const";
import { ThemeContext } from "../context/ThemeProvider";
import { IsLoggedinContext } from "../context/IsLoggedinProvider";
import openEye from "/open.svg";
import closeEye from "/close.svg";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { darkMode } = useContext(ThemeContext);
  const { logginUser } = useContext(IsLoggedinContext);

  const noUserToast = () => {
    toast.error("No such user found!!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  const loggedInToast = () => {
    toast.success("Login Successfully");
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        `${serverPort}/api/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response) {
          setLoading(false);
          logginUser(response.data);
          navigate("/");
          loggedInToast();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (!err.response) {
          errorToast("Network error. Please try again later.");
          setPassword("");
          return;
        }
        //User not found
        console.log(err.response.status);
        err.response?.status == 404 && noUserToast();
        //Validation error
        if (err.response?.status === 400) {
          const errors = err.response.data.errors || [];
          errors.forEach((e) => {
            errorToast(e.message);
          });
          setPassword("");
        }

        //Bad Credentials
        if (err.response?.status === 401) {
          errorToast(err.response.data);
          setPassword("");
        }
      });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`w-full max-w-md bg-gradient-to-bl ${
          darkMode
            ? "via-secondary-dark-c to-secondary-dark-c  from-secondary-dark-b shadow-secondary-dark-b p-8 text-tertiary-dark"
            : "via-secondary-c to-secondary-c  from-secondary-b shadow-secondary-b p-8 text-tertiary"
        } rounded-2xl shadow-lg drop-shadow-2xl `}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-tertiary-dark" : "text-tertiary"
              } mb-1`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-md ring-1 focus:outline-none focus:ring-2 focus:ring-primary-c transition${
                darkMode
                  ? "bg-secondary-dark-b ring-secondary-dark-a text-tertiary-dark placeholder-secondary-dark-a"
                  : "bg-secondary-c ring-secondary-b text-tertiary placeholder-secondary-a"
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                darkMode ? "text-tertiary-dark" : "text-tertiary"
              } mb-1`}
            >
              Password
            </label>
            <div
              className={`flex items-center justify-between rounded-md ring-1 ${
                darkMode ? "ring-secondary-dark-a" : "ring-secondary-b"
              }`}
            >
              <input
                type={showPass ? "text" : "password"}
                value={password}
                required
                placeholder="Enter your password"
                className={`w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-c transition bg-transparent ${
                  darkMode
                    ? " text-tertiary-dark placeholder-secondary-dark-a"
                    : " text-tertiary placeholder-secondary-a"
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                className="h-full w-10 bg-transparent flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                <img src={showPass ? closeEye : openEye} width={20} alt="" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading ? "bg-blue-700" : "bg-blue-600"
            } text-secondary-c py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-500 transition`}
            disabled={!email.trim() || !password.trim()}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-secondary-a mt-4">
          Don’t have an account?{" "}
          <NavLink to={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
