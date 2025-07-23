const API = "https://mockapi.io/tu-endpoint/products";

export const getAll = () => fetch(API).then((r) => r.json());
export const create = (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
export const update = (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
export const remove = (id) => fetch(`${API}/${id}`, { method: "DELETE" });
