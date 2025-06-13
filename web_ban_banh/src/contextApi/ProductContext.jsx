import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context cho sản phẩm
const ProductContext = createContext();

// Hook để sử dụng context
export const useProducts = () => useContext(ProductContext);

// Cung cấp context cho ứng dụng
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Tải sản phẩm từ Spring Boot API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
  );
};
