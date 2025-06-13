import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f6f3eb] flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        {/* Left Content */}
        <div>
          <p className="text-red-500 font-semibold mb-2 uppercase">
            Trang không tìm thấy
          </p>
          <h1 className="text-5xl font-bold text-[#233d4d] mb-4">404</h1>
          <p className="text-[#233d4d] mb-6">
            Đã có lỗi xảy ra. Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#d7e85b] text-[#233d4d] font-bold px-6 py-2 rounded hover:opacity-90 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full flex justify-center">
          <img
            src="/src/assets/img/404.png" // Thay bằng đường dẫn đúng tới ảnh bạn đã dùng
            alt="404 Page Not Found"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
