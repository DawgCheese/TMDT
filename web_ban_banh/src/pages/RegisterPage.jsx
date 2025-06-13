import React, { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Alert } from "@material-tailwind/react";

function Icon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
      >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
        />
      </svg>
  );
}

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
          "http://localhost:8080/api/auth/register",
          formData
      );
      setSuccessMsg(res.data);
      setErrorMsg("");
      setFormData({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
      });
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (error) {
      setErrorMsg(error.response?.data || "Đăng ký thất bại");
      setSuccessMsg("");
    }
  };

  return (
      <>
        {/* Container thông báo cố định */}
        <div className="fixed top-4 right-4 z-50 w-96 max-w-full">
          {successMsg && (
              <Alert
                  icon={<Icon />}
                  className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946] mb-4 cursor-pointer"
                  onClick={() => setSuccessMsg("")}
              >
                {successMsg}
              </Alert>
          )}

          {errorMsg && (
              <Alert
                  icon={<Icon />}
                  className="rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500 mb-4 cursor-pointer"
                  onClick={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
          )}
        </div>

        {/* Form đăng ký */}
        <div className="min-h-screen flex items-center justify-center bg-[#f5f2e8] px-4 py-12">
          <div className="w-full max-w-md bg-[#f5f2e8]">
            <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>

            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="fullname"
                  placeholder="Họ và tên"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none"
              />
              <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-1/2 bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-1/2 bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
                />
              </div>
              <input
                  type="text"
                  name="username"
                  placeholder="Tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none"
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none"
              />
              <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none"
              />

              <label className="flex items-center text-sm mb-4">
                <input type="checkbox" className="mr-2" required />
                Đồng ý với điều khoản và chính sách ứng dụng
              </label>

              <button
                  type="submit"
                  className="w-full bg-[#d8d668] hover:bg-[#c0be50] text-black py-2 rounded font-semibold"
              >
                ĐĂNG KÝ
              </button>
            </form>

            <div className="flex justify-between items-center mt-4 gap-4">
              <button className="flex-1 flex items-center justify-center border border-gray-400 rounded py-2 text-sm hover:bg-gray-100">
                <FaFacebookF className="mr-2 text-blue-600" />
                Facebook
              </button>
              <button className="flex-1 flex items-center justify-center border border-gray-400 rounded py-2 text-sm hover:bg-gray-100">
                <FaGoogle className="mr-2 text-red-500" />
                Google
              </button>
            </div>

            <p className="text-sm text-center mt-4">
              Đã có tài khoản?{" "}
              <a href="/login" className="text-red-500 hover:underline">
                ĐĂNG NHẬP
              </a>
            </p>
          </div>
        </div>
      </>
  );
};

export default RegisterPage;
