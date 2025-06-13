import React, { useEffect, useState } from "react";
import axios from "axios";

const Manage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        categoryName: "",
        brandName: "",
        imageLink: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Lỗi khi load sản phẩm:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    const handleCreate = async () => {
        try {
            const payload = {
                name: newProduct.name,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                category: { name: newProduct.categoryName },
                brand: { name: newProduct.brandName },
                images: [{ imageLink: newProduct.imageLink }],
            };

            await axios.post("http://localhost:8080/api/products", payload);
            setShowModal(false);
            fetchProducts();
            setNewProduct({
                name: "",
                description: "",
                price: "",
                categoryName: "",
                brandName: "",
                imageLink: ""
            });
        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
        }
    };

    // Lọc theo tên sản phẩm
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <div className="text-gray-500 text-sm">Tổng quan &gt; Quản Lý</div>
                <input
                    className="border px-2 py-1 text-sm"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0); // reset về trang đầu khi tìm kiếm
                    }}
                />
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Thêm
                </button>
                <button className="bg-blue-300 text-white px-3 py-1 rounded">Xuất danh sách</button>
            </div>

            <table className="min-w-full bg-white border">
                <thead className="bg-gray-200 text-sm">
                <tr>
                    <th className="border px-2 py-1">ID</th>
                    <th className="border px-2 py-1">Tên sản phẩm</th>
                    <th className="border px-2 py-1">Hình ảnh</th>
                    <th className="border px-2 py-1">Giá</th>
                    <th className="border px-2 py-1">Loại</th>
                    <th className="border px-2 py-1">Cửa hàng</th>
                    <th className="border px-2 py-1">Thao tác</th>
                </tr>
                </thead>
                <tbody className="text-sm">
                {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                        <td className="border px-2 py-1">{product.id}</td>
                        <td className="border px-2 py-1">{product.name}</td>
                        <td className="border px-2 py-1">
                            {product.images?.[0]?.imageLink ? (
                                <img
                                    src={product.images[0].imageLink}
                                    alt="thumb"
                                    className="w-16 h-16 object-cover"
                                />
                            ) : (
                                "Không có ảnh"
                            )}
                        </td>
                        <td className="border px-2 py-1">{product.price.toLocaleString()} đ</td>
                        <td className="border px-2 py-1">{product.category?.name || "Không có"}</td>
                        <td className="border px-2 py-1">{product.brand?.name || "Không có"}</td>
                        <td className="border px-2 py-6 flex gap-2">
                            <button className="bg-yellow-400 text-white px-4 py-1 rounded">Sửa</button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-500 text-white px-4 py-1 rounded"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* PHÂN TRANG */}
            <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`px-3 py-1 rounded ${currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* MODAL THÊM SẢN PHẨM */}
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>

                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            className="border p-2 w-full mb-2"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Mô tả sản phẩm"
                            className="border p-2 w-full mb-2"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Giá"
                            className="border p-2 w-full mb-2"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tên loại (Category)"
                            className="border p-2 w-full mb-2"
                            value={newProduct.categoryName}
                            onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tên cửa hàng (Brand)"
                            className="border p-2 w-full mb-2"
                            value={newProduct.brandName}
                            onChange={(e) => setNewProduct({ ...newProduct, brandName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Link ảnh"
                            className="border p-2 w-full mb-2"
                            value={newProduct.imageLink}
                            onChange={(e) => setNewProduct({ ...newProduct, imageLink: e.target.value })}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleCreate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Manage;
