import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';

function ItemDetail({ id, title, description, price, pictureUrl, category, stock }) {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  const handleAddToCart = (count) => {
    setQuantity(count);
    console.log(`Agregando ${count} unidades de ${title} al carrito`);
  };

  const handleGoBack = () => {
    // Volver a la categoría anterior o al catálogo general
    navigate(-1);
  };

  return (
    <div className="item-detail">
      {/* Botón de regreso */}
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
          
          {quantity === 0 ? (
            <ItemCount 
              initial={1} 
              stock={stock} 
              onAdd={handleAddToCart}
            />
          ) : (
            <div className="added-to-cart">
              <p>¡Agregaste {quantity} unidades al carrito!</p>
              <button onClick={() => setQuantity(0)}>Seguir comprando</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
