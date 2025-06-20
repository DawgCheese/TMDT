import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
        prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
        prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                : item
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
      <CartContext.Provider
          value={{
            cart,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart
          }}
      >
        {children}
      </CartContext.Provider>
  );
};
