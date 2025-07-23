import { useState, useEffect } from "react";

export const useSearch = (data, delay = 300) => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState(data);

  useEffect(() => {
    const id = setTimeout(() => {
      setResult(
        data.filter(
          (p) =>
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.category?.toLowerCase().includes(term.toLowerCase())
        )
      );
    }, delay);
    return () => clearTimeout(id);
  }, [term, data, delay]);

  return { term, setTerm, result };
};
