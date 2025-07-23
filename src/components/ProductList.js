import React, { useState, useEffect } from "react";
import { getAll, remove } from "../services/productService";
import { ProductForm } from "./ProductForm";
import { useSearch } from "../hooks/useSearch";
import { Pagination } from "./Pagination";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ProductList = () => {
  // Datos originales
  const [products, setProducts] = useState([]);
  // Para edición y borrado
  const [editItem, setEditItem] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  // Carga inicial
  const load = () => {
    getAll()
      .then(setProducts)
      .catch(() => toast.error("Error al obtener productos"));
  };
  useEffect(load, []);

  // Búsqueda con debounce
  const { term, setTerm, result } = useSearch(products);

  // Paginación
  const perPage = 10;
  const [page, setPage] = useState(1);
  const start = (page - 1) * perPage;
  const pageItems = result.slice(start, start + perPage);

  // Confirmar borrado
  const confirmDelete = async () => {
    try {
      await remove(toDelete.id);
      toast.success("Producto eliminado");
      setToDelete(null);
      load();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  return (
    <div className="container py-4">
      {/* Buscador */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o categoría..."
        value={term}
        onChange={(e) => {
          setTerm(e.target.value);
          setPage(1);
        }}
      />

      {/* Botón para crear nuevo */}
      <div className="d-flex justify-content-end mb-2">
        <button className="btn btn-success" onClick={() => setEditItem({})}>
          + Nuevo Producto
        </button>
      </div>

      {/* Tabla de productos (página actual) */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th style={{ width: "150px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => setEditItem(p)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setToDelete(p)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
          {pageItems.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {/* Modal de formulario (crear/editar) */}
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

      {/* Modal de confirmación de borrado */}
      <Modal show={!!toDelete} onHide={() => setToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de eliminar “{toDelete?.name}”?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setToDelete(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
