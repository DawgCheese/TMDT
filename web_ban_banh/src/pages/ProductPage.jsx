import React, { useState, useEffect } from "react";
import { useProducts } from "../contextApi/ProductContext";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const ProductPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Lấy danh sách category từ products
  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category?.name || "Khác"))),
  ];

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
          (product) => product.category?.name === selectedCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
  );

  return (
      <div className="container mx-auto px-4 flex p-6 pb-25 gap-6">
        {/* Bộ lọc bên trái */}
        <aside className="w-1/4 border-r pr-4">
          <h2 className="text-xl font-semibold mb-4 text-[#233d4d]">Bộ lọc</h2>

          {/* Lọc theo danh mục */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Danh mục</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                  <li key={category}>
                    <button
                        onClick={() => setSelectedCategory(category)}
                        className={`text-left w-full px-2 py-1 rounded ${
                            selectedCategory === category
                                ? "bg-[#f87171] text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                      {category === "all" ? "Tất cả" : category}
                    </button>
                  </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="w-3/4">
          <h1 className="text-2xl font-bold mb-6 text-[#233d4d]">
            Danh sách sản phẩm
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
                    >
                      <img
                          src={product.images?.[0]?.imageLink || "/default.png"}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h3 className="text-lg font-semibold text-[#233d4d]">
                        {product.name}
                      </h3>
                      <p className="text-[#e63946] font-bold">
                        {product.price?.toLocaleString("vi-VN")} ₫
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.description?.slice(0, 60) || "Không có mô tả"}
                      </p>
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">
                  Không có sản phẩm phù hợp
                </div>
            )}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  &laquo;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === index + 1
                                ? "bg-[#f87171] text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                      {index + 1}
                    </button>
                ))}
                <button
                    onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  &raquo;
                </button>
              </div>
          )}
        </main>
      </div>
  );
};

export default ProductPage;
