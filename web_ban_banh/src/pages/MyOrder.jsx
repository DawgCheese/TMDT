import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import axios from 'axios';

const MyOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/orders/${orderId}`, { withCredentials: true })
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div className="p-6">Đang tải chi tiết đơn hàng...</div>;
  if (!order) return <div className="p-6 text-red-500">Không tìm thấy đơn hàng.</div>;

  const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 20000;
  const discount = 0;
  const finalAmount = totalPrice + shippingFee - discount;

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-25 relative">
      <PageHeader subTitle="My Orders" title="Đơn hàng" breadcrumb="order" />

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#d9604c] mb-4">
          Chi tiết đơn hàng #{order.orderId}
        </h2>

        <div className="mb-4 text-sm text-gray-600">
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Ngày đặt:</strong> {new Date(order.createDate).toLocaleString("vi-VN")}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Thông tin người nhận</h3>
          <p>{order.accountName}</p>
          <p>{order.address}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sản phẩm</h3>
          <div className="divide-y">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                </div>
                <p>{(item.price * item.quantity).toLocaleString()}đ</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 mt-4 text-sm text-gray-700">
          <p><strong>Tạm tính:</strong> {totalPrice.toLocaleString()}đ</p>
          <p><strong>Phí vận chuyển:</strong> {shippingFee.toLocaleString()}đ</p>
          <p><strong>Giảm giá:</strong> {discount.toLocaleString()}đ</p>
          <p className="text-lg font-bold text-black mt-2">
            Tổng cộng: {finalAmount.toLocaleString()}đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
