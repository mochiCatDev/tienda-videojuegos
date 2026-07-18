import { useEffect } from "react";
import "./Toast.css";

export const Toast = ({ mensaje, tipo, onCerrar }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCerrar();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onCerrar]);

  return (
    <div className={`toast-container ${tipo}`}>
      <span className="toast-icon">
        {tipo === "success" ? "✅" : tipo === "error" ? "❌" : "ℹ️"}
      </span>
      <p className="toast-mensaje">{mensaje}</p>
      <button className="btn-close-toast" onClick={onCerrar}>✖</button>
    </div>
  );
};
