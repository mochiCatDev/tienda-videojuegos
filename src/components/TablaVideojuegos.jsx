import './TablaVideojuegos.css';

export const TablaVideojuegos = ({ juegos }) => {
  return (
    <div className="tabla-container">
      <table>
        <thead>
          <tr><th>Título</th><th>Género</th><th>Plataforma</th><th>Progreso</th></tr>
        </thead>
        <tbody>
          {juegos.map((j) => (
            <tr key={j.id}>
              <td data-label="Título">{j.titulo}</td>
              <td data-label="Género">{j.genero}</td>
              <td data-label="Plataforma">{j.plataforma}</td>
              <td data-label="Progreso">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${j.progreso * 100}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
