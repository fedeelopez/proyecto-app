import { Link } from 'react-router-dom';
import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>Termo Tienda</h1>
      </Link>
      
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/termos" className="nav-link">Termos</Link>
        </li>
        <li className="nav-item">
          <Link to="/category/accesorios" className="nav-link">Accesorios</Link>
        </li>
        <li className="nav-item">
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </li>
      </ul>
      
      <CartWidget />
    </nav>
  );
}

export default Navbar;
