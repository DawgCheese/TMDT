import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../contextApi/CartContext";
import PageHeader from "../components/PageHeader";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="bg-[#fdfbf7] pb-20">
      <PageHeader subTitle="Cart" title="Giỏ hàng" breadcrumb="cart" />
      
      {cart.length === 0 ? (
        <div className="max-w-6xl mx-auto px-4 mt-4 text-center">
          <div className="flex flex-col items-center">
            <img src="/src/assets/img/grocery.png" alt="Cart Icon" className="w-48 h-48 mb-6" />
            <h2 className="text-xl font-semibold mb-2">Ôi không, giỏ hàng của bạn đang trống!</h2>
            <p className="text-sm text-gray-600 mb-4">Lò nướng của chúng tôi đang đợi đơn hàng của bạn!!</p>
            <Link to="/">
              <button className="bg-[#d9604c] text-white px-6 py-2 rounded-full font-semibold mb-12">
                Khám phá thực đơn
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
          <div className="bg-white shadow p-4 rounded">
            <table className="w-full text-left mb-6">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Sản Phẩm</th>
                  <th className="py-2">Đơn Giá</th>
                  <th className="py-2">Số Lượng</th>
                  <th className="py-2">Tổng Cộng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 flex items-center gap-4">
                      <img
                          src={item.images?.[0]?.imageLink || "/default.png"}
                          alt={item.name}
                          className="w-50 h-50 object-cover rounded mb-3"
                      />

                    </td>
                    <td className="py-2">{item.price.toLocaleString()}đ</td>
                    <td className="py-2 gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold "
                      >
                        −
                      </button>
                      <span className="min-w-[24px] text-center ">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2">{(item.price * item.quantity).toLocaleString()}đ</td>
                    <td
                      className="py-2 text-red-500 cursor-pointer text-xl hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-sm space-y-1">
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng đơn hàng</span>
                <span>{total.toLocaleString()}đ</span>
              </div>
              <Link
                to="/cart-payment"
                className="bg-[#d9604c] text-white font-bold py-2 mt-4 rounded text-center block hover:bg-[#c84a38]"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
