// src/components/HeroBenchmarkNike.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HeroBenchmarkNike.css"; // estilos específicos

export default function HeroBenchmarkNike() {
  return (
    <div className="hero-benchmark-nike d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          {/* Texto principal */}
          <Col md={6} className="text-center text-md-start text-white">
            <h1 className="display-4 fw-bold">Benchmarking de Nike</h1>
            <p className="lead my-4">
              Exploramos diseño, UX y estrategias de conversión del gigante
              deportivo para inspirar tu tienda bajo demanda.
            </p>
            <Button
              href="#bench-details"
              size="lg"
              variant="outline-light"
              className="me-2"
            >
              Ver Análisis
            </Button>
            <Button href="#productos" size="lg" variant="light">
              Explorar Productos
            </Button>
          </Col>

          {/* Imagen / mockup */}
          <Col md={6} className="text-center mt-4 mt-md-0">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_2.0/w_940,c_limit/hero-image.jpg"
              alt="Nike Benchmark"
              className="img-fluid hero-image"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
