// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <AuthProvider>
      <CarritoProvider>
        <HashRouter>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </HashRouter>
      </CarritoProvider>
    </AuthProvider>
  </HelmetProvider>
);
