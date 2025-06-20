import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from "../components/PageHeader";
import { useNavigate } from 'react-router-dom';

const EditAccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/account/me', { withCredentials: true })
      .then(res => {
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUserInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put('http://localhost:8080/api/account/me', userInfo, { withCredentials: true });
    setMessage("Cập nhật thành công!");
    setTimeout(() => navigate("/cart-payment"), 1000);
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin:", error);
    setMessage("Cập nhật thất bại. Vui lòng thử lại.");
  }
};


  if (loading) return <div className="p-4 text-center">Đang tải thông tin...</div>;
return (
  <div className="min-h-screen bg-[#fdfbf7] pt-24 pb-32">
    <PageHeader subTitle="Tài khoản" title="Cập nhật thông tin" breadcrumb="cap-nhat-thong-tin" />

    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Cập nhật thông tin cá nhân</h2>

      {message && (
        <div className="mb-4 text-sm text-center text-green-700 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Họ và tên</label>
          <input
            type="text"
            name="fullname"
            value={userInfo.fullname}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  </div>
);

};

export default EditAccountPage;
