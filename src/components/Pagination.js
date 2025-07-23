import React from "react";

export const Pagination = ({ total, perPage, current, onChange }) => {
  const pages = Math.ceil(total / perPage);
  return (
    <nav className="d-flex justify-content-center my-3">
      <button
        className="btn btn-outline-secondary me-2"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        «
      </button>
      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={`btn me-1 ${
            current === i + 1 ? "btn-primary" : "btn-light"
          }`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="btn btn-outline-secondary ms-2"
        disabled={current === pages}
        onClick={() => onChange(current + 1)}
      >
        »
      </button>
    </nav>
  );
};
