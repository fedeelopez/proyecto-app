import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { seedCategoriesAndProducts } from '../config/seed.js';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function loadCategories() {
      try {
        setLoading(true);
        setError(null);
        const colRef = collection(db, 'categories');
        let snap = await getDocs(colRef);
        let list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (list.length === 0) {
          await seedCategoriesAndProducts();
          snap = await getDocs(colRef);
          list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        if (!active) return;
        setCategories(list);
      } catch (err) {
        setError('No se pudieron cargar categorías');

        console.warn('Category load error', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadCategories();
    return () => { active = false; };
  }, []);

  if (loading) {
    return (
      <div className="category-list">
        <h2>Nuestras Categorías</h2>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="category-list">
      <h2>Nuestras Categorías</h2>
      <p className="category-subtitle">Explora nuestra selección de productos</p>
      {error && <p className="warning">{error}</p>}
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              {category.productCount != null && (
                <p className="product-count">{category.productCount} productos</p>
              )}
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
