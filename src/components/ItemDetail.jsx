import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';
import { useCart } from '../context/CartContext.jsx';

function ItemDetail({ id, title, description, price, pictureUrl, category, stock }) {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (count) => {
    setQuantity(count);
    addItem({ id, title, price, pictureUrl, stock }, count);
  };

  const handleGoBack = () => {
    // Vuelve a la categoría anterior o al catálogo general
    navigate(-1);
  };

  return (
    <div className="item-detail">
      <div className="back-button-container">
        <button onClick={handleGoBack} className="back-button">
          <span className="back-arrow">←</span>
          Volver al catálogo
        </button>
      </div>

      <div className="item-detail-content">
        <div className="item-detail-image">
          <img src={pictureUrl} alt={title} />
        </div>
        <div className="item-detail-info">
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <p className="price">${price}</p>
          <p className="stock">Stock disponible: {stock}</p>

          {stock === 0 && (
            <p className="no-stock">Producto sin stock</p>
          )}

          {quantity === 0 ? (
            <ItemCount
              initial={1}
              stock={stock}
              onAdd={handleAddToCart}
            />
          ) : (
            <div className="added-to-cart">
              <p>¡Agregaste {quantity} unidades al carrito!</p>
              <div className="post-add-actions">
                <button onClick={() => setQuantity(0)} className="btn btn-primary">Seguir comprando</button>
                <Link to="/cart" className="go-to-cart btn btn-outline">Ir al carrito</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
