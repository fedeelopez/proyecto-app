import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    // Simulación de llamada a API con Promise
    const getProduct = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Datos mock de productos con rutas directas a imágenes
          const products = [
            {
              id: 1,
              title: "Termo Stanley 1L",
              description: "Termo de acero inoxidable de 1 litro, perfecto para mantener bebidas calientes o frías por horas.",
              price: 25000,
              pictureUrl: '/assets/TermoVioleta.jpeg',
              category: "Termos",
              stock: 15
            },
            {
              id: 2,
              title: "Termo Contigo 750ml",
              description: "Termo de plástico resistente con tapa de cierre automático, ideal para el día a día.",
              price: 18000,
              pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg',
              category: "Termos",
              stock: 8
            },
            {
              id: 3,
              title: "Mochila Termo",
              description: "Mochila especial para transportar termos de manera segura y cómoda.",
              price: 12000,
              pictureUrl: '/assets/mochilatermo.jpg',
              category: "Accesorios",
              stock: 12
            },
            {
              id: 4,
              title: "Funda Termo Neopreno",
              description: "Funda protectora de neopreno para mantener la temperatura del termo.",
              price: 8000,
              pictureUrl: '/assets/fundaneopren.jpg',
              category: "Accesorios",
              stock: 20
            }
          ];
          
          const foundProduct = products.find(p => p.id === parseInt(id));
          resolve(foundProduct);
        }, 1000);
      });
    };

    getProduct()
      .then((productData) => {
        setProduct(productData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe.</p>
      </div>
    );
  }

  return <ItemDetail {...product} />;
}

export default ItemDetailContainer;
