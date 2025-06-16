import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../contextApi/CartContext";
import PageHeader from "../components/PageHeader";

const CartPaymentPage = () => {
  const { cart } = useCart();

  const shippingFee = 20000;
  const discount = 0;
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subTotal - discount + shippingFee;

  return (
      <div className="bg-[#fdfbf7] pb-25 relative">
        <PageHeader subTitle="Cart Payment" title="Thanh Toán" breadcrumb="cart-payment" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Delivery form */}
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
            <input type="text" placeholder="Email hoặc số điện thoại" className="w-full mb-4 border px-3 py-2 rounded" />
            <input type="text" placeholder="Họ và Tên" className="w-full mb-3 border px-3 py-2 rounded" />
            <input type="text" placeholder="Số điện thoại" className="w-full mb-3 border px-3 py-2 rounded" />
            <input type="text" placeholder="Địa chỉ giao hàng" className="w-full mb-3 border px-3 py-2 rounded" />

            <h2 className="text-lg font-semibold mb-2">Hình thức thanh toán</h2>
            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-2">
                <input type="radio" name="payment" defaultChecked />
                <span>Chuyển khoản ngân hàng</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" />
                <span>Thanh toán khi nhận hàng</span>
              </label>
            </div>

            <Link
                to="/dat-hang-thanh-cong"
                className="block text-center bg-[#d7e85b] text-black font-bold w-full py-2 rounded hover:opacity-90"
            >
              Tiến hành thanh toán
            </Link>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="bg-[#f8f1ee] p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Sản phẩm <span className="float-right">Tổng cộng</span></h2>

            <div className="space-y-4 mb-4">
              {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img
                        src={item.images?.[0]?.imageLink || "/default.png"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</div>
                  </div>
              ))}
            </div>

            <div className="border-t pt-4 text-sm space-y-2">
              <div className="flex justify-between"><span>Thành tiền:</span><span>{subTotal.toLocaleString()}đ</span></div>
              <div className="flex justify-between"><span>Giảm giá:</span><span>{discount.toLocaleString()}đ</span></div>
              <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{shippingFee.toLocaleString()}đ</span></div>
              <div className="flex justify-between font-bold text-base mt-2">
                <span>Tổng đơn hàng:</span><span>{total.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CartPaymentPage;
