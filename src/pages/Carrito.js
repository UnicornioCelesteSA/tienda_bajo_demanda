// src/pages/Carrito.js
import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import CheckoutModal from "../components/CheckoutModal";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

export default function Carrito() {
  const { items, removeItem, clearCart } = useContext(CarritoContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const total = items.reduce((sum, p) => sum + Number(p.price), 0);

  const handleConfirm = () => {
    clearCart();
    setShowCheckout(false);
    toast.success("¡Compra realizada con éxito!");
  };

  return (
    <>
      <Helmet>
        <title>Carrito | Tienda Bajo Demanda</title>
        <meta
          name="description"
          content="Revisa los productos añadidos y gestiona tu carrito de compras."
        />
      </Helmet>

      <div className="container py-5">
        <h2>Tu Carrito</h2>

        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {items.map((p) => (
                <li
                  key={p.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {p.title || p.name} (${p.price})
                  </span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(p.id)}
                    aria-label={`Quitar ${p.title || p.name}`}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mb-3">
              <strong>Total:</strong> ${total.toFixed(2)}
            </div>

            <button
              className="btn btn-success me-2"
              onClick={() => setShowCheckout(true)}
            >
              🛒 Comprar
            </button>
            <button
              className="btn btn-danger"
              onClick={clearCart}
              aria-label="Vaciar carrito"
            >
              Vaciar Carrito
            </button>
          </>
        )}
      </div>

      <CheckoutModal
        show={showCheckout}
        onHide={() => setShowCheckout(false)}
        items={items}
        onConfirm={handleConfirm}
      />
    </>
  );
}
