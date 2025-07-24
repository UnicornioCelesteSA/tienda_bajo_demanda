// src/components/NavBar.js
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Tienda Bajo Demanda
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            {user && (
              <>
                <Nav.Link as={NavLink} to="/productos">
                  Productos
                </Nav.Link>
                <Nav.Link as={NavLink} to="/carrito">
                  Carrito{" "}
                  <span aria-label={`${items.length} items en carrito`}>
                    ({items.length})
                  </span>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Ingresar
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
