import "./TablaVideojuegos.css";
import { useNavigate } from "react-router-dom";

export const TablaVideojuegos = ({ juegos, onEliminar }) => {
  const navigate = useNavigate();

  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((j) => (
            <tr key={j.id} className="game-card">
              <td data-label="Título">{j.titulo}</td>
              <td data-label="Género">{j.genero}</td>
              <td data-label="Plataforma">{j.plataforma}</td>
              <td data-label="Año">{j.lanzamiento}</td>
              <td data-label="Precio">${j.precio.toFixed(2)}</td>
              <td data-label="Disponible">{j.disponible ? "✅" : "❌"}</td>
              <td data-label="Progreso">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${j.progreso * 100}%` }}
                  />
                </div>
              </td>
              <td className="acciones-cell">
                <button
                  className="btn-edit"
                  onClick={() => navigate("/editar", { state: { juego: j } })}
                >
                  Editar
                </button>
                <button className="btn-delete" onClick={() => onEliminar(j.id)}>
                  Eliminar
                </button>
              </td>
              <td className="mobile-img-container">
                <img src={j.img} alt={j.titulo} className="mobile-img" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
