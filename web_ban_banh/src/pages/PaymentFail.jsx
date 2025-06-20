import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import PageHeader from "../components/PageHeader";

const PaymentFail = () => {
  return (
    <div className="relative">
      {/* Header Section */}
      <PageHeader
        subTitle="Payment Failed"
        title="Thông báo"
        breadcrumb="thanh-toan-that-bai"
      />

      <div className="h-[500px] bg-[#fdfbf7] flex items-start justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-16 max-w-xxl text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#333] mb-2">Thanh toán thất bại!</h2>
          <p className="text-gray-600 mb-6">
            Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/cart-payment" className="bg-[#d9604c] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90">
              Thử lại thanh toán
            </Link>
            <Link to="/" className="text-sm text-[#6f7875] underline hover:text-[#d9604c]">
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
