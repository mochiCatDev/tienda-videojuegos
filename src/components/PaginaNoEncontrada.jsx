import { Link } from "react-router-dom";

export const PaginaNoEncontrada = () => {
  return (
    <div style={{ textAlign: "center", padding: "4rem", color: "var(--text)" }}>
      <h1 style={{ fontSize: "4rem", color: "var(--lavender)", margin: "0" }}>404</h1>
      <h2>Página No Encontrada</h2>
      <p style={{ marginBottom: "2rem" }}>La ruta a la que intentas acceder no existe.</p>
      <Link 
        to="/" 
        style={{ 
          backgroundColor: "var(--lavender)", 
          color: "var(--base)", 
          padding: "1rem 2rem", 
          textDecoration: "none", 
          borderRadius: "8px",
          fontWeight: "bold" 
        }}
      >
        Volver al Inventario
      </Link>
    </div>
  );
};
