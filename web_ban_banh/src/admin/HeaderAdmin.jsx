import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const HeaderAdmin = ({ title = "" }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("fullname"));
    const [fullname, setFullname] = useState(localStorage.getItem("fullname"));
    const dropdownRef = useRef();
    const navigate = useNavigate();

    // Cập nhật trạng thái đăng nhập khi có sự kiện từ hệ thống
    useEffect(() => {
        const updateLoginStatus = () => {
            const storedName = localStorage.getItem("fullname");
            setIsLoggedIn(!!storedName);
            setFullname(storedName);
        };

        window.addEventListener("username-updated", updateLoginStatus);

        return () => {
            window.removeEventListener("username-updated", updateLoginStatus);
        };
    }, []);

    // Click ra ngoài dropdown để tự đóng
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("fullname");
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("username-updated"));
        navigate("/loginAdmin")
    };

    return (
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center relative pt-0">
            <h1 className="text-xl font-semibold text-gray-700">{title}</h1>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                >
                    👤 {fullname || "Admin"} ▾
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                        {isLoggedIn ? (
                            <>

                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <a
                                href="/loginAdmin"
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-blue-600"
                            >
                                Đăng nhập
                            </a>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default HeaderAdmin;
