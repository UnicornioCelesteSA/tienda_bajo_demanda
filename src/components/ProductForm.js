import React, { useState, useEffect } from "react";
import { create, update } from "../services/productService";
import { toast } from "react-toastify";

export const ProductForm = ({ existing, onComplete }) => {
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    if (existing) setForm(existing);
  }, [existing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Nombre obligatorio");
    if (Number(form.price) <= 0) return toast.error("Precio debe ser > 0");
    if (form.description.length < 10)
      return toast.error("Desc ≥ 10 caracteres");

    try {
      existing ? await update(existing.id, form) : await create(form);
      toast.success("Guardado con éxito");
      onComplete();
    } catch {
      toast.error("Error en la API");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="form-control mb-2"
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        className="form-control mb-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="form-control mb-2"
      />
      <button className="btn btn-primary" type="submit">
        {existing ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};
