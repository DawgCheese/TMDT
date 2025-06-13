import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
    return (
      password.length >= 8 &&
      hasUppercase &&
      hasDigit &&
      !hasSpecialChar
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("Mật khẩu không đáp ứng yêu cầu.");
      return;
    }

    // Gửi mật khẩu mới đến backend
    console.log("Đặt lại mật khẩu:", newPassword);
    // Chuyển hướng nếu cần
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f0e9] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#233d4d] mb-4">
          Mật Khẩu Mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#d7e85b]"
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#d7e85b]"
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-2">
            <li>Có ít nhất 8 ký tự</li>
            <li>Ít nhất một ký tự viết hoa và một ký tự số</li>
            <li>Không sử dụng ký tự đặc biệt</li>
          </ul>

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-[#d7e85b] text-black font-bold rounded hover:opacity-90 transition"
          >
            ĐẶT LẠI MẬT KHẨU
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-700 text-center">
          Quay lại trang →{" "}
          <Link to="/login" className="text-red-500 hover:underline font-semibold">
            ĐĂNG NHẬP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
