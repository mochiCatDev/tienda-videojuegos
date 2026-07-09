import { useState } from "react";
import "./App.css";
import { TablaVideojuegos } from "./components/TablaVideojuegos";
import { data } from "./data/videojuegos";

function App() {
  const [juegos] = useState(data);

  return (
    <>
      <div>
        <h1>Tienda de Videojuegos</h1>
        <TablaVideojuegos juegos={juegos} />
      </div>
    </>
  );
}

export default App;
