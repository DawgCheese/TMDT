import React from 'react';
import PageHeader from "../components/PageHeader";

const MyOrder = () => {
  // Thông tin đơn hàng mẫu — bạn sẽ thay bằng data thực tế từ backend hoặc state
  const order = {
    id: 'DH123456',
    status: 'Đang xử lý',
    createdAt: '08/05/2025',
    deliveryDate: '10/05/2025',
    shippingMethod: 'Giao hàng tận nơi',
    paymentMethod: 'Chuyển khoản ngân hàng',
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      address: '123 Đường ABC, Quận 1, TP.HCM'
    },
    items: [
      {
        name: 'Bánh Trái Cây',
        price: 300000,
        quantity: 1,
        image: '/src/assets/img/banh3.png'
      },
      {
        name: 'Bánh Kem Cam',
        price: 150000,
        quantity: 2,
        image: '/src/assets/img/banh2.png'
      }
    ],
    shippingFee: 20000,
    discount: 0
  };

  const totalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalAmount = totalPrice + order.shippingFee - order.discount;

  return (
    <div className="bg-[#fdfbf7] min-h-screen pb-25 relative">

 {/* Header Section */}
        <PageHeader
          subTitle="My Orders"
          title="Đơn hàng"
          breadcrumb="order"
        />

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#d9604c] mb-4">Chi tiết đơn hàng #{order.id}</h2>

        <div className="mb-4 text-sm text-gray-600">
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Ngày đặt:</strong> {order.createdAt}</p>
          <p><strong>Thời gian giao dự kiến:</strong> {order.deliveryDate}</p>
          <p><strong>Hình thức giao hàng:</strong> {order.shippingMethod}</p>
          <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Thông tin người nhận</h3>
          <p>{order.customer.name}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sản phẩm</h3>
          <div className="divide-y">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <p>{item.price * item.quantity}đ</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 mt-4 text-sm text-gray-700">
          <p><strong>Tạm tính:</strong> {totalPrice.toLocaleString()}đ</p>
          <p><strong>Phí vận chuyển:</strong> {order.shippingFee.toLocaleString()}đ</p>
          <p><strong>Giảm giá:</strong> {order.discount.toLocaleString()}đ</p>
          <p className="text-lg font-bold text-black mt-2">Tổng cộng: {finalAmount.toLocaleString()}đ</p>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
