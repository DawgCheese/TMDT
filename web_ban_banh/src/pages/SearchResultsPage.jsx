import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProducts } from "../contextApi/ProductContext";

const ITEMS_PER_PAGE = 8;

const SearchResultsPage = () => {
  const { products } = useProducts();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    if (products.length > 0 && query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // reset page when new search
    }
  }, [products, query]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-6 py-25">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#233d4d]">
        Kết quả tìm kiếm cho: <span className="text-[#f87171]">{query}</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.length > 0 ? (
          currentItems.map((product) => (
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
            Không tìm thấy sản phẩm phù hợp với từ khóa "{query}"
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-[#f87171] text-white" : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
