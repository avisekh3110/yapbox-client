import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Footer from "./components/Footer.jsx";
import Chats from "./pages/Chats.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import HOME from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import { ThemeContext } from "./context/ThemeProvider.jsx";
import axios from "axios";
import { serverPort } from "./const.js";
import { IsLoggedinContext } from "./context/IsLoggedinProvider.jsx";
import VideoCall from "./pages/VideoCall.jsx";

export default function App() {
  const { logginUser } = useContext(IsLoggedinContext);
  const { darkMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${serverPort}/api/refresh`, {}, { withCredentials: true })
      .then((response) => {
        if (response?.data) {
          logginUser(response.data);
        }
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <div className="min-h-screen h-screen min-w-screen justify-center items-center flex bg-gradient-to-br from-primary-a to-primary-c">
      <div
        className={`flex lg:w-2/3 w-11/12 h-10/12 rounded-xl ${
          darkMode ? "bg-secondary-dark-c" : "bg-secondary-c"
        }  justify-center items-center shadow-2xl drop-shadow-2xl shadow-grap-500 relative`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/videocall" element={<VideoCall />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
