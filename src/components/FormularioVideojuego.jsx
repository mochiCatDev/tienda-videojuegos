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
    img: "",
    fechaLanzamiento: "",
    sinopsis: "",
    calificacion: ""
  });

  const [errores, setErrores] = useState({});

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

    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ""
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormulario({
          ...formulario,
          img: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validarFormulario = () => {
    const erroresActivos = {};

    if (!formulario.titulo || formulario.titulo.trim() === "") {
      erroresActivos.titulo = "El nombre del videojuego es obligatorio y no puede contener solo espacios.";
    }

    if (!formulario.calificacion || formulario.calificacion < 1 || formulario.calificacion > 100) {
      erroresActivos.calificacion = "La calificación debe ser un valor numérico estrictamente entre 1 y 100.";
    }

    if (!formulario.sinopsis || formulario.sinopsis.trim().length < 10) {
      erroresActivos.sinopsis = "La sinopsis debe contener al menos 10 caracteres.";
    } else if (formulario.sinopsis.length > 250) {
      erroresActivos.sinopsis = "La sinopsis no puede exceder los 250 caracteres.";
    }

    if (!formulario.fechaLanzamiento) {
      erroresActivos.fechaLanzamiento = "Debe seleccionar una fecha de lanzamiento válida.";
    }

    return erroresActivos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresActivos = validarFormulario();

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }

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
            className={errores.titulo ? "input-error" : ""}
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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

        <div className="form-group row">
          <div>
            <label>Fecha de Lanzamiento:</label>
            <input
              type="date"
              name="fechaLanzamiento"
              value={formulario.fechaLanzamiento}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className={errores.fechaLanzamiento ? "input-error" : ""}
            />
            {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
          </div>

          <div>
            <label>Calificación de la Crítica (1-100):</label>
            <input
              type="number"
              name="calificacion"
              value={formulario.calificacion}
              onChange={handleChange}
              placeholder="Ej: 85"
              className={errores.calificacion ? "input-error" : ""}
            />
            {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label>Sinopsis / Descripción:</label>
          <textarea
            name="sinopsis"
            value={formulario.sinopsis}
            onChange={handleChange}
            placeholder="Escribe una breve reseña del videojuego (mínimo 10 caracteres)..."
            rows="4"
            className={errores.sinopsis ? "input-error" : ""}
          />
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
        </div>

        <div className="form-group">
          <label>Progreso del Juego ({Math.round(formulario.progreso * 100)}%):</label>
          <input
            type="range"
            name="progreso"
            min="0"
            max="1"
            step="0.01"
            value={formulario.progreso}
            onChange={handleChange}
            className="slider-progreso"
          />
        </div>

        <div className="form-group">
          <label>Imagen del Videojuego (Subir desde Equipo):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {formulario.img && (
            <div className="preview-container">
              <img src={formulario.img} alt="Vista previa" className="image-preview" />
            </div>
          )}
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
