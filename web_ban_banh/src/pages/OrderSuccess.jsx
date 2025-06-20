import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa';
import PageHeader from "../components/PageHeader";

const OrderSuccess = () => {

const location = useLocation();
const query = new URLSearchParams(location.search);
const orderId = query.get("orderId")
  return (
    <div className="relative">
         {/* Header Section */}
         <PageHeader
          subTitle="Order Success"
          title="Thông báo"
          breadcrumb="dat-hang-thanh-cong"
        />

    <div className="h-[500px] bg-[#fdfbf7] flex items-start justify-center px-4">
        
      <div className="bg-white rounded-lg shadow-md p-16 max-w-xxl text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#333] mb-2">Đặt hàng thành công!</h2>
        <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.</p>
        
        <div className="flex flex-col gap-3">
          <Link to="/" className="bg-[#d9604c] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90">
            Tiếp tục mua sắm
          </Link>
       <Link to={`/order/${orderId}`} className="text-sm text-[#6f7875] underline hover:text-[#d9604c]">
         Xem đơn hàng của bạn
       </Link>

        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderSuccess;
