import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TablaVideojuegos } from "./components/TablaVideojuegos";
import { FormularioVideojuego } from "./components/FormularioVideojuego";
import { PaginaNoEncontrada } from "./components/PaginaNoEncontrada";
import { data } from "./data/videojuegos";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState(data);

  const agregarVideojuego = (nuevoJuego) => {
    setJuegos([...juegos, nuevoJuego]);
  };

  const editarVideojuego = (juegoEditado) => {
    const nuevaLista = juegos.map((j) =>
      j.id === juegoEditado.id ? juegoEditado : j
    );
    setJuegos(nuevaLista);
  };

  const eliminarVideojuego = (id) => {
    const nuevaLista = juegos.filter((j) => j.id !== id);
    setJuegos(nuevaLista);
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
