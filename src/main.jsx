import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { IsLoggedinProvider } from "./context/IsLoggedinContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <IsLoggedinProvider>
          <App />
          <ToastContainer theme="dark" />
        </IsLoggedinProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
