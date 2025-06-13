import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../contextApi/ProductContext";

const ProductTagPage = () => {
  const { tag } = useParams();
  const { products } = useProducts(); // ✅ Lấy đúng context
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) =>
        product.tags?.includes(tag)
      );
      setFilteredProducts(filtered);
    }
  }, [products, tag]);

  return (
    <div className="container mx-auto p-6 py-25">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#233d4d]">
        Sản phẩm theo tag: <span className="text-[#f87171]">{tag}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 block"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-lg font-semibold text-[#233d4d] mb-2">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {product.description || "Mô tả sản phẩm chưa có"}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-500">
                  {"★".repeat(Math.round(product.rating || 0))}
                </span>
                <span className="text-sm text-gray-700">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Không có sản phẩm nào phù hợp với tag "{tag}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTagPage;
