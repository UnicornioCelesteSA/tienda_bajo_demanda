// src/pages/Login.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate(from, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Login | Tienda Bajo Demanda</title>
        <meta
          name="description"
          content="Ingresa para acceder a tu carrito y gestionar productos."
        />
      </Helmet>
      <div className="container py-5">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="w-50">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            id="username"
            className="form-control mb-3"
            placeholder="Ingresa tu nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
}
