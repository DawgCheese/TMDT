import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Alert } from "@material-tailwind/react";

function Icon() {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6">
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
        />
      </svg>
  );
}

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
     const res = await axios.post("http://localhost:8080/api/auth/login", formData, {
       withCredentials: true, // ✅ để gửi và lưu cookie JSESSIONID
     });

      const { username, token } = res.data;

      // Lưu thông tin vào localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

      console.log("Login response:", res.data);

      // Gửi sự kiện cập nhật username
      window.dispatchEvent(new Event("username-updated"));

      setSuccessMsg("Đăng nhập thành công");

      // Điều hướng về trang chủ sau 1.5s
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setErrorMsg("Lỗi kết nối hoặc sai thông tin đăng nhập.");
    }
  };

  return (
      <>
        {/* Alert fixed góc trên phải */}
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
                  variant="standard"
                  color="red"
                  className="mb-4 cursor-pointer"
                  onClick={() => setErrorMsg("")}
              >
                {errorMsg}
              </Alert>
          )}
        </div>

        {/* Layout chính */}
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Left (Form) */}
          <div className="md:w-1/2 w-full bg-[#f5f2e8] flex flex-col items-center justify-center px-6 py-6 relative">
            <div className="max-w-sm w-full">
              <div className="flex items-center justify-center mb-4">
                <img src="/src/assets/img/logo.png" alt="Cupakery" className="h-12 mr-2" />
                <span className="text-2xl font-logo text-[#183153]">Cupakery</span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">Đăng Nhập</h2>
              <p className="text-sm text-center mb-6">Tận hưởng ưu đãi dành riêng cho bạn !</p>

              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email/SĐT"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded px-4 py-2 mb-2 focus:outline-none"
                    required
                />

                <div className="flex items-center justify-between text-sm mb-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Lưu đăng nhập
                  </label>
                  <Link to="/quen-mat-khau" className="text-red-500 hover:underline">
                    Quên mật khẩu ?
                  </Link>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#d8d668] hover:bg-[#c0be50] text-black py-2 rounded font-semibold"
                >
                  ĐĂNG NHẬP
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
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-red-500 hover:underline">
                  ĐĂNG KÝ
                </Link>
              </p>
            </div>
          </div>

          {/* Right (Image) */}
          <div className="md:w-1/2 w-full hidden md:block">
            <img
                src="/src/assets/img/loginImg.png"
                alt="Cupcake"
                className="object-cover w-full h-full"
            />
          </div>
        </div>
      </>
  );
};

export default LoginPage;
