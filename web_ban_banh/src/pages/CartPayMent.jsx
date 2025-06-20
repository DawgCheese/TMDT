import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "../components/PageHeader";
import { useCart } from "../contextApi/CartContext";
import axios from 'axios';
import { Link } from 'react-router-dom';

const CartPaymentPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const shippingFee = 20000;
  const discount = 0;
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subTotal - discount + shippingFee;
const [paymentMethod, setPaymentMethod] = useState("online"); // mặc định là online

  useEffect(() => {
    axios.get('http://localhost:8080/api/account/me', { withCredentials: true })
      .then(res => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Không thể lấy thông tin người dùng", err);
        setLoading(false);
      });
  }, []);

const handleOrder = async () => {
  if (!userInfo || cart.length === 0) {
    alert("Vui lòng đăng nhập và thêm sản phẩm vào giỏ hàng.");
    return;
  }

  const orderPayload = {
    accountId: userInfo.id,
    address: userInfo.address,
    items: cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    })),
    paymentMethod: paymentMethod
  };

  try {
    console.log("Gửi đơn hàng:", orderPayload);
    const orderRes = await axios.post('http://localhost:8080/api/orders', orderPayload, {
      withCredentials: true
    });

    const orderId = orderRes.data.orderId;

    if (!orderId) throw new Error("Không nhận được ID đơn hàng");

    if (paymentMethod === "cod") {
navigate(`/dat-hang-thanh-cong?orderId=${orderId}`);
    } else {
      const paymentRes = await axios.post('http://localhost:8080/api/payment/create', { orderId }, {
        withCredentials: true
      });

      const paymentUrl = paymentRes.data.url;
      if (!paymentUrl) throw new Error("Không nhận được URL thanh toán");

      window.location.href = paymentUrl;
    }
  } catch (err) {
    console.error("Chi tiết lỗi:", err.response?.data || err.message || err);
    alert("Đặt hàng hoặc thanh toán thất bại. Vui lòng thử lại.");
  }
};


  if (loading) return <div className="p-6 text-center">Đang tải thông tin người dùng...</div>;

  return (
    <div className="bg-[#fdfbf7] pb-32 pt-24 relative min-h-screen">
      <PageHeader subTitle="Cart Payment" title="Thanh Toán" breadcrumb="cart-payment" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">

        {/* LEFT: Delivery form */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Liên hệ
            <Link to="/cap-nhat-thong-tin" className="float-right text-sm text-blue-600 underline cursor-pointer">
              Cập nhật
            </Link>
          </h2>
          <div className="mb-4">
            <p className="font-medium">Email / SĐT:</p>
            <p>{userInfo?.email || ''} / {userInfo?.phone || ''}</p>
          </div>

          <h2 className="text-lg font-semibold mb-2">Giao hàng</h2>
          <div className="mb-3">
            <p className="font-medium">Họ và tên:</p>
            <p>{userInfo?.fullname || ''}</p>
          </div>
          <div className="mb-3">
            <p className="font-medium">Địa chỉ:</p>
            <p>{userInfo?.address || ''}</p>
          </div>

          <textarea
            placeholder="Yêu cầu (Không bắt buộc)"
            className="w-full mb-4 border px-3 py-2 rounded"
            rows={3}
          ></textarea>

          <h2 className="text-lg font-semibold mb-2">Hình thức thanh toán</h2>
          <div className="mb-4">
       <label className="flex items-center space-x-2 mb-2">
         <input
           type="radio"
           name="payment"
           value="online"
           checked={paymentMethod === "online"}
           onChange={() => setPaymentMethod("online")}
         />
         <span>Chuyển khoản ngân hàng</span>
       </label>
       <label className="flex items-center space-x-2">
         <input
           type="radio"
           name="payment"
           value="cod"
           checked={paymentMethod === "cod"}
           onChange={() => setPaymentMethod("cod")}
         />
         <span>Thanh toán khi nhận hàng</span>
       </label>

            <label className="flex items-center space-x-2 mt-2">
              <input type="checkbox" />
              <span>Xuất hóa đơn công ty</span>
            </label>
          </div>

          <button
            onClick={handleOrder}
            className="block text-center bg-[#d7e85b] text-black font-bold w-full py-2 rounded hover:opacity-90"
          >
            Tiến hành thanh toán
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-[#f8f1ee] p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Sản Phẩm <span className="float-right font-semibold">Tổng cộng</span>
          </h2>

          <div className="space-y-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-start gap-4">
                <img
                  src={item.images?.[0]?.imageLink || "/default.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
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

          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Thành tiền:</span><span>{subTotal.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Giảm giá:</span><span>{discount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span><span>{shippingFee.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Tổng đơn hàng:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
          </div>

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
