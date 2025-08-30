import { Link } from 'react-router-dom';

function CategoryList() {
  const categories = [
    {
      id: 'termos',
      name: 'Termos',
      description: 'Termos de alta calidad para mantener tus bebidas a la temperatura ideal',
      image: '/assets/termos.jpg',
      productCount: 2
    },
    {
      id: 'accesorios',
      name: 'Accesorios',
      description: 'Accesorios y complementos para tus termos',
      image: '/assets/accesorios.jpg',
      productCount: 2
    }
  ];

  return (
    <div className="category-list">
      <h2>Nuestras Categorías</h2>
      <p className="category-subtitle">Explora nuestra selección de productos</p>
      
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <p className="product-count">{category.productCount} productos</p>
              <Link to={`/category/${category.id}`} className="category-link">
                Ver Productos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
