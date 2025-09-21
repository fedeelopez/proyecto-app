# Termo Tienda — React + Firebase

Pequeño e-commerce para venta de termos y accesorios, construido con React + Vite y Firestore como base de datos. Incluye catálogo por categorías, detalle de producto, carrito, checkout con creación de órdenes y actualización de stock.

## Estructura principal
```
src/
  components/
    CategoryList.jsx        # Lista de categorías desde Firestore (con auto-seed)
    ItemListContainer.jsx   # Lista de productos, soporta /category/:categoryId
    ItemDetailContainer.jsx # Detalle de producto por id
    ItemDetail.jsx          # Vista de detalle y añadir al carrito
    Cart.jsx                # Carrito
    Checkout.jsx            # Checkout: crea orden y descuenta stock con transacción
  context/
    CartContext.jsx         # Estado global del carrito
  config/
    firebase.js             # Inicialización Firebase + export de db
    seed.js                 # Semilla inicial (categorías y productos)
  App.jsx                   # Rutas
  App.css                   # Estilos base y componentes
```

## Configuración
1. Crear proyecto en Firebase y habilitar Firestore (modo producción o prueba).
2. Completar credenciales en `src/config/firebase.js`.
3. Instalar dependencias y ejecutar:

```bash
npm install
npm run dev
```

Al entrar a la app por primera vez, si Firestore está vacío, se ejecuta un seed automático que crea:
- Colección `categories` con `termos` y `accesorios`.
- Colección `products` con 4 productos de ejemplo.

## Flujo de datos
- Catálogo y detalle leen de Firestore. Si no hay datos, se siembran y se reintenta.
- Checkout usa una transacción (`runTransaction`) que:
  - Verifica stock de cada producto.
  - Descuenta stock actual.
  - Crea documento de orden en `orders` con `buyer`, `items[]`, `total` y `createdAt`.

## Personalización
- Editar seed en `src/config/seed.js` para cambiar productos o categorías.
- Estilos globales y de vistas en `src/App.css` (botones `.btn-*`, tarjetas, grids).

## Notas
- El seed es idempotente con `setDoc(..., { merge: true })` (no duplica documentos).
- Si querés “resetear” la base, borra colecciones en Firestore y recargá.
