import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import { db } from '../config/firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { seedCategoriesAndProducts } from '../config/seed.js';

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    let active = true;

    function toTitleCase(str) {
      if (!str) return str;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const colRef = collection(db, 'products');
        let list = [];
        let attemptedSeed = false;

        async function loadFromFirestore() {
          if (categoryId) {
            const variants = Array.from(new Set([
              categoryId,
              categoryId.toLowerCase(),
              categoryId.toUpperCase(),
              toTitleCase(categoryId),
            ]));

            const qIn = query(colRef, where('category', 'in', variants));
            const snapIn = await getDocs(qIn);
            return snapIn.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          }
          const snap = await getDocs(colRef);
          return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        if (categoryId) {
          const variants = Array.from(new Set([
            categoryId,
            categoryId.toLowerCase(),
            categoryId.toUpperCase(),
            toTitleCase(categoryId),
          ]));

          const qIn = query(colRef, where('category', 'in', variants));
          const snapIn = await getDocs(qIn);
          list = snapIn.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Intento 2: Si no hay resultados, traigo todo y filtro en cliente
          if (list.length === 0) {
            const snapAll = await getDocs(colRef);
            const all = snapAll.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            list = all.filter(p => (p.category || '').toString().toLowerCase() === categoryId.toLowerCase());
          }
        } else {
          const snap = await getDocs(colRef);
          list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        if (!active) return;

        // Fallback local si aún no hay productos
        if (list.length === 0) {
          if (!attemptedSeed) {
            attemptedSeed = true;
            await seedCategoriesAndProducts();
            list = await loadFromFirestore();
          }
          const allProducts = [
            { id: '1', title: 'Termo Stanley 1L', price: 25000, pictureUrl: '/assets/TermoVioleta.jpeg', category: 'termos' },
            { id: '2', title: 'Termo Contigo 750ml', price: 18000, pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg', category: 'termos' },
            { id: '3', title: 'Mochila Termo', price: 12000, pictureUrl: '/assets/mochilatermo.jpg', category: 'accesorios' },
            { id: '4', title: 'Funda Termo Neopreno', price: 8000, pictureUrl: '/assets/fundaneopren.jpg', category: 'accesorios' },
          ];
          list = categoryId ? allProducts.filter(p => p.category.toLowerCase() === categoryId.toLowerCase()) : allProducts;
          setError('No se encontraron productos en la base de datos para esta categoría. Mostrando datos locales.');
        }

        setProducts(list);
      } catch (err) {
        console.warn('Fallo Firestore, usando datos locales. Motivo:', err?.message || err);
        if (!active) return;
        const allProducts = [
          { id: '1', title: 'Termo Stanley 1L', price: 25000, pictureUrl: '/assets/TermoVioleta.jpeg', category: 'termos' },
          { id: '2', title: 'Termo Contigo 750ml', price: 18000, pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg', category: 'termos' },
          { id: '3', title: 'Mochila Termo', price: 12000, pictureUrl: '/assets/mochilatermo.jpg', category: 'accesorios' },
          { id: '4', title: 'Funda Termo Neopreno', price: 8000, pictureUrl: '/assets/fundaneopren.jpg', category: 'accesorios' },
        ];
        const filtered = categoryId ? allProducts.filter(p => p.category.toLowerCase() === categoryId.toLowerCase()) : allProducts;
        setProducts(filtered);
        setError('No se pudo conectar a la base de datos, datos locales mostrados.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProducts();
    return () => { active = false; };
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
      {error && <p className="warning">{error}</p>}
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
