import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);

  const handleSendCode = () => {
    if (countdown === 0) {
      // Gửi mã xác minh tại đây
      console.log("Gửi mã đến:", emailOrPhone);
      setCountdown(60); // Bắt đầu đếm ngược 60s
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Xác nhận với mã:", verificationCode);
    // Xử lý xác minh tại đây
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f0e9] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#233d4d] mb-2">Đặt Lại Mật Khẩu</h2>
        <p className="text-sm text-gray-600 mb-6">
          Mã xác minh sẽ được gửi về email/ số điện thoại đăng ký trong ít phút
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Email/Số điện thoại"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#d7e85b]"
            required
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Mã xác minh"
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#d7e85b]"
              required
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0}
              className={`text-sm font-semibold ${
                countdown > 0 ? "text-red-400 cursor-not-allowed" : "text-red-500 hover:underline"
              }`}
            >
              {countdown > 0 ? `Gửi mã (${countdown})` : "Gửi mã"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#d7e85b] text-black font-bold rounded hover:opacity-90 transition"
          >
            XÁC NHẬN
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-700">
          Quay lại trang →{" "}
          <Link to="/login" className="text-red-500 hover:underline font-semibold">
            ĐĂNG NHẬP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
