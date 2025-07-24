// src/components/ProductList.js
import React, { useState, useEffect, useContext } from "react";
import { getAll, remove } from "../services/productService";
import { useSearch } from "../hooks/useSearch";
import { Pagination } from "./Pagination";
import { toast } from "react-toastify";
import { CarritoContext } from "../context/CarritoContext";
import { Helmet } from "react-helmet-async";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { ProductForm } from "./ProductForm";

export const ProductList = () => {
  // Estado de productos y CRUD
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Contexto de carrito
  const { addItem } = useContext(CarritoContext);

  // Carga inicial de productos
  const load = () => {
    getAll()
      .then(setProducts)
      .catch(() => toast.error("Error al obtener productos"));
  };
  useEffect(load, []);

  // Búsqueda y paginación
  const { term, setTerm, result } = useSearch(products);
  const perPage = 8;
  const [page, setPage] = useState(1);
  const start = (page - 1) * perPage;
  const pageItems = result.slice(start, start + perPage);

  // Confirmación de borrado
  const confirmDelete = async () => {
    await remove(toDelete.id);
    toast.success("Producto eliminado");
    setToDelete(null);
    load();
  };

  return (
    <>
      <Helmet>
        <title>Productos | Tienda Bajo Demanda</title>
        <meta
          name="description"
          content="Listado de productos disponibles para agregar al carrito."
        />
      </Helmet>

      <div className="container py-4">
        {/* Buscador y botón Nuevo */}
        <Row className="mb-3">
          <Col md={8}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                setPage(1);
              }}
            />
          </Col>
          <Col md={4} className="text-end">
            <Button variant="success" onClick={() => setEditItem({})}>
              + Nuevo Producto
            </Button>
          </Col>
        </Row>

        {/* Grid de Cards */}
        <Row xs={1} sm={2} md={4} className="g-4">
          {pageItems.map((p) => (
            <Col key={p.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={p.image}
                  alt={p.title}
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{p.title}</Card.Title>
                  <Card.Text className="mb-2 text-truncate">
                    {p.description}
                  </Card.Text>
                  <div className="mt-auto">
                    <strong>${p.price}</strong>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  {/*  ← Aquí está el botón para sumarlo al carrito */}
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => addItem(p)}
                    aria-label={`Añadir ${p.title} al carrito`}
                  >
                    🛒 Añadir
                  </Button>

                  {/* Editar */}
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => setEditItem(p)}
                    aria-label={`Editar ${p.title}`}
                  >
                    ✏️
                  </Button>

                  {/* Eliminar */}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setToDelete(p)}
                    aria-label={`Eliminar ${p.title}`}
                  >
                    🗑️
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Paginador */}
        <Pagination
          total={result.length}
          perPage={perPage}
          current={page}
          onChange={(p) => {
            setPage(p);
            window.scrollTo(0, 0);
          }}
        />
      </div>

      {/* Modal para crear/editar producto */}
      {editItem !== null && (
        <Modal show onHide={() => setEditItem(null)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editItem.id ? "Editar Producto" : "Nuevo Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductForm
              existing={editItem.id ? editItem : null}
              onComplete={() => {
                setEditItem(null);
                load();
              }}
            />
          </Modal.Body>
        </Modal>
      )}

      {/* Modal de confirmación de eliminación */}
      <Modal show={!!toDelete} onHide={() => setToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Eliminar “{toDelete?.title}”?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
