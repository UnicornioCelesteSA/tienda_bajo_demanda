// src/pages/Home.js
import React from "react";
import { Helmet } from "react-helmet-async";
import HeroLogo from "../components/HeroLogo";
import { ProductList } from "../components/ProductList";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Tienda Bajo Demanda</title>
        <meta
          name="description"
          content="Bienvenido a Tienda Bajo Demanda – calidad X Clase inspirada en Nike."
        />
      </Helmet>

      {/* Hero con tu logo */}
      <HeroLogo />

      {/* Catálogo de productos */}
      <div id="productos" className="py-5">
        <ProductList />
      </div>
    </>
  );
}
