import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    // Simulación de llamada a API con Promise
    const getProducts = () => {
      return new Promise((resolve) => {
        setTimeout(() => {

          const allProducts = [
            {
              id: 1,
              title: "Termo Stanley 1L",
              price: 25000,
              pictureUrl: '/assets/TermoVioleta.jpeg',
              category: "Termos"
            },
            {
              id: 2,
              title: "Termo Contigo 750ml",
              price: 18000,
              pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg',
              category: "Termos"
            },
            {
              id: 3,
              title: "Mochila Termo",
              price: 12000,
              pictureUrl: '/assets/mochilatermo.jpg',
              category: "Accesorios"
            },
            {
              id: 4,
              title: "Funda Termo Neopreno",
              price: 8000,
              pictureUrl: '/assets/fundaneopren.jpg',
              category: "Accesorios"
            }
          ];

          // Filtro por categoría específica
          const filtered = allProducts.filter(p => 
            p.category.toLowerCase() === categoryId.toLowerCase()
          );
          resolve(filtered);
        }, 1000);
      });
    };

    getProducts()
      .then((productsData) => {
        setProducts(productsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h2>Productos</h2>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
          <a href="/" className="back-home">Volver al inicio</a>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <Item key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;
