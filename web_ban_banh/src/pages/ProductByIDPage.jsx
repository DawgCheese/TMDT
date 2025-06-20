import React, { useState,useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../contextApi/ProductContext";
import { useCart } from "../contextApi/CartContext";
import axios from "axios";

const ProductByIDPage = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
 const [suggestedProducts, setSuggestedProducts] = useState([]);
 useEffect(() => {
   if (!id) return;

   const fetchData = async () => {
     try {
       // Gọi API suggested products
       const res = await axios.get(`http://localhost:8080/api/products/suggested/${id}`);
       setSuggestedProducts(res.data);

       // Gọi API tăng lượt xem
       await axios.get(`http://localhost:8080/api/products/${id}/view`);
     } catch (error) {
       console.error("Lỗi khi tải dữ liệu sản phẩm hoặc tăng lượt xem:", error);
     }
   };

   fetchData();
 }, [id]);

  if (!product) {
    return (
        <div className="text-center text-gray-500 p-10">
          Không tìm thấy sản phẩm
        </div>
    );
  }

  const handleAddToCart = () => {
    const qty = Math.max(1, parseInt(quantity));
    addToCart(product, qty);

  };

  return (
      <div className="container mx-auto pb-20 pt-10 px-4 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <img
              src={product.images?.[0]?.imageLink || "/default.png"}
              alt={product.name}
              className="w-full h-100 object-cover rounded mb-3"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-[#e63946] text-2xl font-medium">
              {product.price?.toLocaleString("vi-VN")} ₫
            </p>
            <div className="text-yellow-400">
              {Array(Math.round(product.rating || 0))
                  .fill(0)
                  .map((_, i) => (
                      <span key={i}>★</span>
                  ))}
            </div>
            <p className="leading-relaxed">
              {product.description || "Mô tả sản phẩm chưa có"}
            </p>
            <div>
              <label className="block font-bold mb-1">Số lượng</label>
              <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
                onClick={handleAddToCart}
                className="mt-4 bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded-lg inline-block text-center"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div className="mb-8">
          <div className="flex gap-4 border-b mb-4">
            <button className="font-bold text-red-500 border-b-2 border-red-500 pb-1">Mô tả</button>
            <button className="text-gray-500">Thông tin bổ sung</button>
            <button className="text-gray-500">Đánh giá</button>
          </div>
          <p>{product.longDescription || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>
        </div>

  {/* Sản phẩm liên quan */}
       <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">Sản Phẩm Liên Quan</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {suggestedProducts.slice(0, 4).map((related) => (
             <Link
               to={`/product/${related.id}`}
               key={related.id}
               className="border rounded-2xl overflow-hidden bg-white hover:shadow-md transition"
             >
               <img
                 src={related.images?.[0]?.imageLink || "/default.png"}
                 alt={related.name}
                 className="w-full h-48 object-cover"
               />
               <div className="p-4 text-center">
                 <h3 className="font-bold">{related.name}</h3>
                 <p className="text-gray-600">
                   {related.price
                     ? `${related.price.toLocaleString("vi-VN")}₫`
                     : "Liên hệ"}
                 </p>
                 <div className="text-yellow-400">
                   {"★".repeat(Math.round(related.rating || 0))}
                 </div>
               </div>
             </Link>
           ))}
         </div>
       </div>
     </div>
   );
 };
export default ProductByIDPage;
