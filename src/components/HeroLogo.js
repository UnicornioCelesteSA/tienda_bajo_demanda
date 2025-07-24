// src/components/HeroLogo.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import "./HeroLogo.css";
import logo from "./assets/logo.png";

export default function HeroLogo() {
  return (
    <div className="hero-logo d-flex align-items-center">
      <Container className="text-center">
        <img src={logo} alt="X Clase" className="hero-logo__image mb-4" />
        <h1 className="hero-logo__title mb-3">Tienda Bajo Demanda</h1>
        <p className="hero-logo__subtitle mb-4">
          Inspirado por las mejores prácticas de Nike y X Clase
        </p>
        <Button href="#productos" variant="light" size="lg">
          Explorar Productos
        </Button>
      </Container>
    </div>
  );
}
