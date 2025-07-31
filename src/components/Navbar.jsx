import CartWidget from "./CartWidget";

function Navbar() {
  return (
    <nav>
      <h1>Termo Tienda</h1>
      <ul>
        <li>
          <a href="">Inicio</a>
        </li>
        <li>
          <a href="">Productos</a>
        </li>
        <li>
          <a href="">Contacto</a>
        </li>
      </ul>
       <CartWidget />
    </nav>
   
  );
}

export default Navbar;
