import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:8080/api/orders/history", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải lịch sử đơn hàng. Vui lòng đăng nhập.");
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-600";
      case "confirmed": return "text-green-600";
      case "cancelled": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const currentOrders = orders
    .slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-20">
      <PageHeader title="Lịch sử đơn hàng" subTitle="Order History" breadcrumb="order-history" />

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-[#d9604c] mb-4">Danh sách đơn hàng của bạn</h2>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : currentOrders.length === 0 ? (
          <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <>
            <div className="grid gap-4">
              {currentOrders.map((order, index) => (
                <div key={index} className="p-4 bg-[#fef9f4] border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#d9604c]">Mã đơn hàng: {order.orderId}</p>
                      <p className="text-sm text-gray-600">
                        Ngày đặt: {new Date(order.createDate).toLocaleString("vi-VN")}
                      </p>
                      <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                        Trạng thái: {order.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#d9604c] text-lg">{order.total.toLocaleString()}đ</p>
                      <Link
                        to={`/order/${order.orderId}`}
                        className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={currentPage === 1}
              >
                ← Trước
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-[#d9604c] text-white' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                className="px-3 py-1 border rounded hover:bg-gray-100"
                disabled={currentPage === totalPages}
              >
                Sau →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
