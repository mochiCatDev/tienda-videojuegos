import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Krakedev Store</h2>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="nav-link">Inventario</Link>
        </li>
        <li>
          <Link to="/nuevo" className="nav-link btn-nuevo">Nuevo Juego</Link>
        </li>
      </ul>
    </nav>
  );
};
