import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

export const FormularioVideojuego = ({ onGuardar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const juegoAEditar = location.state?.juego;

  const [formulario, setFormulario] = useState({
    id: "",
    titulo: "",
    genero: "Acción",
    plataforma: "PC",
    lanzamiento: 1999,
    precio: 0,
    disponible: true,
    progreso: 0,
    img: ""
  });

  useEffect(() => {
    if (juegoAEditar) {
      setFormulario(juegoAEditar);
    }
  }, [juegoAEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoJuego = {
      ...formulario,
      id: formulario.id || Date.now()
    };
    onGuardar(nuevoJuego);
    navigate("/");
  };

  return (
    <div className="formulario-container">
      <h2>{juegoAEditar ? "Editar Videojuego" : "Registrar Nuevo Videojuego"}</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Plataforma:</label>
          <select name="plataforma" value={formulario.plataforma} onChange={handleChange}>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Móvil">Móvil</option>
          </select>
        </div>

        <div className="form-group row">
          <div>
            <label>Año de Lanzamiento:</label>
            <input
              type="number"
              name="lanzamiento"
              value={formulario.lanzamiento}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Precio ($):</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={formulario.precio}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="disponible"
              checked={formulario.disponible}
              onChange={handleChange}
            />
            Disponible en Tienda
          </label>
        </div>

        <button type="submit" className="btn-submit">
          {juegoAEditar ? "Guardar Cambios" : "Registrar"}
        </button>
      </form>
    </div>
  );
};
