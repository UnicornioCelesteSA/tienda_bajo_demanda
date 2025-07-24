// src/services/productService.js
const API = "https://fakestoreapi.com/products";

export const getAll = () => fetch(API).then((res) => res.json());

export const create = (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const update = (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const remove = (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" }).then((res) => res.json());
