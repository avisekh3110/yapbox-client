import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { IsLoggedinProvider } from "./context/IsLoggedinContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CookiesProvider>
          <IsLoggedinProvider>
            <App />
            <ToastContainer theme="dark" />
          </IsLoggedinProvider>
        </CookiesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
