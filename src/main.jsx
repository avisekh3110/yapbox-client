import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { IsLoggedinProvider } from "./context/IsLoggedinProvider.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CookiesProvider>
          <IsLoggedinProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
            <ToastContainer theme="dark" />
          </IsLoggedinProvider>
        </CookiesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
