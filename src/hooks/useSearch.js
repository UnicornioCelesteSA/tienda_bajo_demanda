// src/hooks/useSearch.js
import { useState, useEffect } from "react";

export const useSearch = (data, delay = 300) => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState(data);

  useEffect(() => {
    const id = setTimeout(() => {
      const lower = term.toLowerCase();
      const filtered = data.filter((p) => {
        const name = (p.name || p.title || "").toString().toLowerCase();
        const category = (p.category || "").toString().toLowerCase();
        return name.includes(lower) || category.includes(lower);
      });
      setResult(filtered);
    }, delay);

    return () => clearTimeout(id);
  }, [term, data, delay]);

  return { term, setTerm, result };
};
