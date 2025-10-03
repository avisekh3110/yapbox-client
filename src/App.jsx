import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Footer from "./components/Footer.jsx";
// import CHAt from "./pages/Chats.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HOME from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";

export default function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <BrowserRouter>
      <div className="min-h-screen h-screen min-w-screen justify-center items-center flex bg-gradient-to-br from-primary-a to-primary-c">
        <div
          className={`flex lg:w-2/3 w-11/12 h-10/12 rounded-xl ${
            darkMode ? "bg-secondary-dark-c" : "bg-secondary-c"
          }  justify-between items-center shadow-2xl drop-shadow-2xl shadow-grap-500 relative`}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HOME />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
