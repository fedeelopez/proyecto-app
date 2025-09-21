import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { db } from '../config/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { seedCategoriesAndProducts } from '../config/seed.js';

function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let active = true;
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const ref = doc(db, 'products', String(id));
        const snap = await getDoc(ref);
        if (!active) return;
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          // Si la base está vacía, seed y reintentar una vez
          await seedCategoriesAndProducts();
          const retry = await getDoc(ref);
          if (retry.exists()) {
            setProduct({ id: retry.id, ...retry.data() });
          } else {
            setProduct(null);
          }
        }
      } catch (err) {
        console.warn('Fallo Firestore, usando datos locales. Motivo:', err?.message || err);
        if (!active) return;
        const products = [
          { id: '1', title: 'Termo Stanley 1L', description: 'Termo de acero inoxidable de 1 litro, perfecto para mantener bebidas calientes o frías por horas.', price: 25000, pictureUrl: '/assets/TermoVioleta.jpeg', category: 'termos', stock: 15 },
          { id: '2', title: 'Termo Contigo 750ml', description: 'Termo de plástico resistente con tapa de cierre automático, ideal para el día a día.', price: 18000, pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg', category: 'termos', stock: 8 },
          { id: '3', title: 'Mochila Termo', description: 'Mochila especial para transportar termos de manera segura y cómoda.', price: 12000, pictureUrl: '/assets/mochilatermo.jpg', category: 'accesorios', stock: 12 },
          { id: '4', title: 'Funda Termo Neopreno', description: 'Funda protectora de neopreno para mantener la temperatura del termo.', price: 8000, pictureUrl: '/assets/fundaneopren.jpg', category: 'accesorios', stock: 20 }
        ];
        const foundProduct = products.find(p => String(p.id) === String(id));
        setProduct(foundProduct || null);
        setError('No se pudo conectar a la base de datos, dato local mostrado.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProduct();
    return () => { active = false; };
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
