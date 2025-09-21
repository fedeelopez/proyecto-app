import { ShoppingCart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function CartWidget() {
  const { totalUnits } = useCart();
  return (
    <Link to="/cart" className="cart-widget" aria-label="Carrito">
      <div className="cart-icon-wrapper">
        <ShoppingCart color="white" />
        {totalUnits > 0 && (
          <span className="cart-badge" aria-label={`Unidades en carrito: ${totalUnits}`}>
            {totalUnits}
          </span>
        )}
      </div>
    </Link>
  );
}

export default CartWidget;