import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantity) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingIndex !== -1) {
        const updated = [...prevItems];
        const newQuantity = updated[existingIndex].quantity + quantity;
        const maxQuantity = product.stock ?? updated[existingIndex].stock ?? newQuantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQuantity, maxQuantity)
        };
        return updated;
      }
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          pictureUrl: product.pictureUrl,
          stock: product.stock ?? Infinity,
          quantity
        }
      ];
    });
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const totalUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    getItemQuantity,
    totalUnits,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return ctx;
}
