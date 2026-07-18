import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TablaVideojuegos } from "./components/TablaVideojuegos";
import { FormularioVideojuego } from "./components/FormularioVideojuego";
import { PaginaNoEncontrada } from "./components/PaginaNoEncontrada";
import { Toast } from "./components/Toast";
import { data } from "./data/videojuegos";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  const [toast, setToast] = useState({ visible: false, mensaje: "", tipo: "success" });

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(juegos));
  }, [juegos]);

  const lanzarToast = (mensaje, tipo = "success") => {
    setToast({ visible: true, mensaje: mensaje, tipo })
  }

  const cerrarToast = () => {
    setToast({ ...toast, visible: false });
  };

  const agregarVideojuego = (nuevoJuego) => {
    setJuegos([...juegos, nuevoJuego]);
    lanzarToast(`¡"${nuevoJuego.titulo}" registrado con éxito!`, "success");
  };

  const editarVideojuego = (juegoEditado) => {
    const nuevaLista = juegos.map((j) =>
      j.id === juegoEditado.id ? juegoEditado : j
    );
    setJuegos(nuevaLista);
    lanzarToast(`¡"${juegoEditado.titulo}" actualizado correctamente!`, "success");
  };

  const eliminarVideojuego = (id) => {
    const juegoEliminado = juegos.find(j => j.id === id);
    const nuevaLista = juegos.filter((j) => j.id !== id);
    setJuegos(nuevaLista);
    lanzarToast(`¡"${juegoEliminado?.titulo || 'Videojuego'}" eliminado del sistema!`, "danger");
  };

  const procesarFormulario = (juego) => {
    const existe = juegos.find((j) => j.id === juego.id);
    if (existe) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {toast.visible && (
          <Toast 
            mensaje={toast.mensaje} 
            tipo={toast.tipo} 
            onCerrar={cerrarToast} 
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Tienda de Videojuegos</h1>
                <TablaVideojuegos juegos={juegos} onEliminar={eliminarVideojuego} />
              </>
            }
          />
          <Route
            path="/nuevo"
            element={<FormularioVideojuego onGuardar={procesarFormulario} />}
          />
          <Route
            path="/editar"
            element={<FormularioVideojuego onGuardar={procesarFormulario} />}
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
