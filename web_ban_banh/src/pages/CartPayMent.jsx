import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import { useCart } from "../contextApi/CartContext";

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
          <h2 className="text-lg font-semibold mb-4">
            Liên hệ
            <span className="float-right text-sm text-[#888] underline cursor-pointer">Đăng nhập</span>
          </h2>
          <input type="text" placeholder="Email hoặc số điện thoại" className="w-full mb-4 border px-3 py-2 rounded" />

          <h2 className="text-lg font-semibold mb-2">Giao hàng</h2>
          <div className="mb-4">
            <label className="flex items-center space-x-2 mb-2">
              <input type="radio" name="shipping" defaultChecked />
              <span>Vận chuyển</span>
              <span className="ml-auto">🚚</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="shipping" />
              <span>Nhận tại cửa hàng</span>
              <span className="ml-auto">🏠</span>
            </label>
          </div>

          <input type="text" placeholder="Họ và Tên" className="w-full mb-3 border px-3 py-2 rounded" />
          <input type="text" placeholder="Số điện thoại" className="w-full mb-3 border px-3 py-2 rounded" />

          <div className="flex gap-2 mb-3">
            <select className="w-1/3 border px-2 py-2 rounded">
              <option>TP.Hồ Chí Minh</option>
            </select>
            <select className="w-1/3 border px-2 py-2 rounded">
              <option>Chọn Quận/Huyện</option>
            </select>
            <select className="w-1/3 border px-2 py-2 rounded">
              <option>Chọn Phường/Xã</option>
            </select>
          </div>

          <input type="text" placeholder="Địa chỉ" className="w-full mb-3 border px-3 py-2 rounded" />
          <textarea placeholder="Yêu cầu (Không bắt buộc)" className="w-full mb-4 border px-3 py-2 rounded" rows={3}></textarea>

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
            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" />
              <span>Xuất hóa đơn công ty</span>
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
          <h2 className="text-lg font-semibold mb-4">Sản Phẩm <span className="float-right font-semibold">Tổng cộng</span></h2>

          {/* Product List */}
          <div className="space-y-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className=" flex  ">
                <img
                    src={item.images?.[0]?.imageLink || "/default.png"}
                    alt={item.name}
                    className="w-30 h-30 object-cover rounded mb-3"
                />
                <div className="flex-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Đơn giá: {item.price.toLocaleString()}đ<br />
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <div className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between"><span>Thành tiền:</span><span>{subTotal.toLocaleString()}đ</span></div>
            <div className="flex justify-between"><span>Giảm giá:</span><span>{discount.toLocaleString()}đ</span></div>
            <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{shippingFee.toLocaleString()}đ</span></div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Tổng đơn hàng:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>

          {/* Notes */}
          <div className="text-xs text-gray-600 mt-4 space-y-1">
            <p>*Lưu ý: Bạn sẽ nhận hàng trong vòng 1-2 ngày làm việc.</p>
            <p>*Yêu cầu khác có thể được ghi chú ở mục phía trên.</p>
            <div className="bg-[#f1e998] text-black rounded p-2 mt-2 inline-flex items-center gap-2">
              🚚 Thời gian nhận hàng: dự kiến 1-2 ngày
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPaymentPage;
