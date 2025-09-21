import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

function Cart() {
  const { cartItems, totalPrice, totalUnits, removeItem, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Carrito vacío</h2>
        <p>Agregá productos para verlos acá.</p>
        <Link to="/" className="btn">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Tu carrito</h2>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.pictureUrl} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Subtotal: ${item.quantity * item.price}</p>
            </div>
            <button className="remove-item" onClick={() => removeItem(item.id)}>Quitar</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total de unidades: {totalUnits}</p>
        <p>Total a pagar: ${totalPrice}</p>
        <div className="cart-actions">
          <button className="btn btn-outline" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/checkout" className="btn btn-cta">Ir a pagar</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
