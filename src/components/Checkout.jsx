import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { db } from '../config/firebase.js';
import { collection, serverTimestamp, doc, runTransaction } from 'firebase/firestore';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const buyer = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
    };

    try {
      const orderRef = doc(collection(db, 'orders'));
      const productRefs = cartItems.map(i => ({ ref: doc(db, 'products', String(i.id)), item: i }));

      await runTransaction(db, async (tx) => {
        // 1) Lee stocks actuales y valida disponibilidad. Guarda lecturas.
        const snapshots = [];
        for (const { ref, item } of productRefs) {
          const snap = await tx.get(ref);
          if (!snap.exists()) {
            throw new Error(`Producto no existe: ${item.title}`);
          }
          const data = snap.data();
          const current = Number(data.stock ?? 0);
          if (current < item.quantity) {
            throw new Error(`Sin stock suficiente para ${item.title}`);
          }
          snapshots.push({ ref, current, item });
        }

        // 2) Todas las lecturas ya ocurrieron. Ahora sí, aplica escrituras.
        for (const s of snapshots) {
          tx.update(s.ref, { stock: s.current - s.item.quantity });
        }

        // 3) Crea una nueva orden
        tx.set(orderRef, {
          buyer,
          items: cartItems.map(i => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity })),
          total: totalPrice,
          createdAt: serverTimestamp(),
        });
      });

      setOrderId(orderRef.id);
      clearCart();
    } catch (err) {
      setError('No se pudo generar la orden, intentá nuevamente.');

      console.error('Checkout error', err);
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>¡Gracias por tu compra!</h2>
        <p>Guardamos tu orden con id: <strong>{orderId}</strong></p>
        <Link to="/" className="btn">Volver al inicio</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>No hay productos para pagar</h2>
        <Link to="/" className="btn">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <p>Total a pagar: ${totalPrice}</p>
      </div>
      {error && <p className="error">{error}</p>}
      <form className="checkout-form" onSubmit={handleConfirm}>
        <input name="name" type="text" placeholder="Nombre" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" type="tel" placeholder="Teléfono" required />
        <button type="submit" className="btn btn-cta" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
