import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineShoppingCart, HiOutlineUser, HiX } from "react-icons/hi";
import { useCart } from "../contextApi/CartContext";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { cart } = useCart();
  const cartItemCount = cart.length;

  useEffect(() => {
    // Lấy username lúc đầu khi component mount
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  useEffect(() => {
    // Lắng nghe sự kiện cập nhật username
    const onUsernameUpdated = () => {
      const user = localStorage.getItem("username");
      setUsername(user);
      console.log("Username updated:", user);
    };

    window.addEventListener("username-updated", onUsernameUpdated);

    // Lắng nghe thay đổi localStorage (tab khác)
    const onStorageChange = (e) => {
      if (e.key === "username") {
        const user = e.newValue;
        setUsername(user);
        console.log("Storage changed username:", user);
      }
    };
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("username-updated", onUsernameUpdated);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  useEffect(() => {
    // Đóng dropdown nếu click ngoài
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const handleUserIconClick = () => {
    if (username) {
      // Nếu đã đăng nhập thì toggle dropdown
      setShowDropdown((prev) => !prev);
    } else {
      // Nếu chưa đăng nhập thì chuyển tới login
      navigate("/login");
    }
  };

  return (
      <header className="bg-[#fdf9f3] py-4 shadow-sm border-b relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/src/assets/img/logo.png" alt="Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-[#233d4d]">Cupakery</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#233d4d]">
            <Link to="/" className="hover:text-[#f87171]">
              TRANG CHỦ
            </Link>
            <div className="relative group">
              <Link
                  to="/product"
                  className="hover:text-[#f87171] flex items-center gap-1"
              >
                SẢN PHẨM <span>▼</span>
              </Link>
              <div className="absolute left-0 top-full mt-2 w-40 bg-white border rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link to="/danh-muc/Cookies" className="block px-4 py-2 hover:bg-gray-100">
                  Bánh Quy
                </Link>
                <Link to="/danh-muc/Salsa" className="block px-4 py-2 hover:bg-gray-100">
                  Salat
                </Link>
                <Link to="/danh-muc/Chicken" className="block px-4 py-2 hover:bg-gray-100">
                  Bánh Gà
                </Link>
              </div>
            </div>
            <Link to="/dich-vu" className="hover:text-[#f87171]">
              DỊCH VỤ
            </Link>
            <Link to="/ve-chung-toi" className="hover:text-[#f87171]">
              VỀ CUPAKERY
            </Link>
            <Link to="/lien-he" className="hover:text-[#f87171]">
              LIÊN HỆ
            </Link>
            <Link
                to="/dat-banh"
                className="border border-[#233d4d] px-4 py-1 rounded hover:bg-[#233d4d] hover:text-white transition"
            >
              ĐẶT BÁNH
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-4 ml-6 text-[#233d4d] relative">
            <div ref={dropdownRef} className="relative">
              <HiOutlineUser
                  className="w-6 h-6 hover:text-[#f87171] cursor-pointer"
                  onClick={handleUserIconClick}
              />
              {showDropdown && username && (
                  <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow rounded p-2 text-sm z-50">
                    <div className="px-2 py-1 font-medium border-b">{username}</div>
                    <Link to="/orders">Lịch sử đơn hàng</Link>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-1 text-red-600 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
              )}
            </div>

            <Link to="/cart" className="relative">
              <HiOutlineShoppingCart className="w-6 h-6 hover:text-[#f87171]" />
              {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                {cartItemCount}
              </span>
              )}
            </Link>

            <button
                onClick={() => setIsSearchOpen((prev) => !prev)}
                className="hover:text-[#f87171]"
            >
              <HiOutlineSearch className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu có thể giữ như cũ */}
        </div>

        {/* Search bar mở rộng */}
        {isSearchOpen && (
            <form
                onSubmit={handleSearchSubmit}
                className="container mx-auto px-4 mt-2 flex items-center border rounded"
            >
              <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow py-2 px-4 focus:outline-none"
                  autoFocus
              />
              <button
                  type="submit"
                  className="px-4 py-2 bg-[#d8d668] hover:bg-[#c0be50] text-black rounded-r"
              >
                Tìm
              </button>
              <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <HiX className="w-6 h-6" />
              </button>
            </form>
        )}
      </header>
  );
};

export default Header;
