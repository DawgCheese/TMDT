import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import './index.css';
import ScrollToTop from "./components/ScrollToTop";
import { ProductProvider } from "./contextApi/ProductContext.jsx"; // ✅ import context provider
import { CartProvider } from "./contextApi/CartContext.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <CartProvider> {/* ✅ Thêm CartProvider ở đây */}
          <ScrollToTop />
          <App />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);