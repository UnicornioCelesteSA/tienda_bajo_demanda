import React, { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product) => setItems((prev) => [...prev, product]);
  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setItems([]);

  return (
    <CarritoContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CarritoContext.Provider>
  );
};
