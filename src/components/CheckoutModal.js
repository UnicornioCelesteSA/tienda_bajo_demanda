// src/components/CheckoutModal.js
import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

export default function CheckoutModal({ show, onHide, items, onConfirm }) {
  const total = items.reduce((sum, p) => sum + Number(p.price), 0);

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="checkout-modal">
      <Modal.Header closeButton>
        <Modal.Title id="checkout-modal">Confirmar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Vas a comprar {items.length}{" "}
          {items.length === 1 ? "producto" : "productos"}:
        </p>
        <ListGroup variant="flush" className="mb-3">
          {items.map((p) => (
            <ListGroup.Item
              key={p.id}
              className="d-flex justify-content-between"
            >
              <span>{p.title || p.name}</span>
              <strong>${p.price}</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5>Total: ${total.toFixed(2)}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirmar Compra
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
