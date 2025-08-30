import { Link } from 'react-router-dom';

function Item({ id, title, price, pictureUrl, category }) {
  return (
    <div className="item-card">
      <img src={pictureUrl} alt={title} className="item-image" />
      <div className="item-info">
        <h3 className="item-title">{title}</h3>
        <p className="item-category">{category}</p>
        <p className="item-price">${price}</p>
        <Link to={`/item/${id}`} className="item-detail-link">
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}

export default Item;
