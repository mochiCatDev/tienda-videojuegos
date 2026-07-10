import "./TablaVideojuegos.css";

export const TablaVideojuegos = ({ juegos }) => {
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
          </tr>
        </thead>
        <tbody>
          {juegos.map((j) => (
            <tr key={j.id}>
              <td>{j.titulo}</td>
              <td>{j.genero}</td>
              <td>{j.plataforma}</td>
              <td>{j.lanzamiento}</td>
              <td>${j.precio.toFixed(2)}</td>
              <td>{j.disponible ? '✅' : '❌'}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${j.progreso * 100}%` }}
                  >{Math.round(j.progreso * 100)}%</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
