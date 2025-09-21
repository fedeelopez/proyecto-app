import { db } from './firebase.js';
import { doc, setDoc } from 'firebase/firestore';

const seedCategories = [
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

const seedProducts = [
  { id: '1', title: 'Termo Stanley 1L', description: 'Termo de acero inoxidable de 1 litro, perfecto para mantener bebidas calientes o frías por horas.', price: 25000, pictureUrl: '/assets/TermoVioleta.jpeg', category: 'termos', stock: 15 },
  { id: '2', title: 'Termo Contigo 750ml', description: 'Termo de plástico resistente con tapa de cierre automático, ideal para el día a día.', price: 18000, pictureUrl: '/assets/WhatsApp Image 2024-12-26 at 20.36.17.jpeg', category: 'termos', stock: 8 },
  { id: '3', title: 'Mochila Termo', description: 'Mochila especial para transportar termos de manera segura y cómoda.', price: 12000, pictureUrl: '/assets/mochilatermo.jpg', category: 'accesorios', stock: 12 },
  { id: '4', title: 'Funda Termo Neopreno', description: 'Funda protectora de neopreno para mantener la temperatura del termo.', price: 8000, pictureUrl: '/assets/fundaneopren.jpg', category: 'accesorios', stock: 20 }
];

export async function seedCategoriesAndProducts() {
  await Promise.all(
    seedCategories.map(async (category) => {
      const ref = doc(db, 'categories', category.id);
      await setDoc(ref, category, { merge: true });
    })
  );

  await Promise.all(
    seedProducts.map(async (product) => {
      const ref = doc(db, 'products', product.id);
      await setDoc(ref, product, { merge: true });
    })
  );
}

export const __seedData = { categories: seedCategories, products: seedProducts };


