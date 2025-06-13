import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";


import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductByIDPage from "./pages/ProductByIDPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutUs from "./pages/AboutUs";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CartPayMent from "./pages/CartPayMent";
import OrderSuccess from './pages/OrderSuccess';
import MyOrder from './pages/MyOrder';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import NotFound from './pages/NotFound';
import ProductTagPage from './pages/ProductTagPage';
import SearchResultsPage from "./pages/SearchResultsPage";

//Admin
import AdminLayout from "./admin/AdminLayout.jsx";
import Manage from "./admin/pages/Manage.jsx";
import LoginAdmin from "./admin/LoginAdmin.jsx";




const App = () => {
  const location = useLocation();
  const hiddenAdsPaths = ["/pageadmin","/loginAdmin"]; // hoặc thêm các path khác nếu muốn ẩn header/footer

  const shouldHideHeaderFooter = hiddenAdsPaths.includes(location.pathname);

  return (
      <div className="flex flex-col min-h-screen">
        {/* Chỉ hiển thị Header và Footer nếu không nằm trong hiddenAdsPaths */}
        {!shouldHideHeaderFooter && <Header />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductByIDPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ve-chung-toi" element={<AboutUs />} />
            <Route path="/dich-vu" element={<ServicePage />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart-payment" element={<CartPayMent />} />
            <Route path="/dat-hang-thanh-cong" element={<OrderSuccess />} />
            <Route path="/order" element={<MyOrder />} />
            <Route path="/quen-mat-khau" element={<ForgotPassword />} />
            <Route path="/dat-mat-khau-moi" element={<NewPassword />} />
            <Route path="/khong-tim-thay-trang" element={<NotFound />} />
            <Route path="/danh-muc/:tag" element={<ProductTagPage />} />
            <Route path="/tim-kiem" element={<SearchResultsPage />} />
            <Route path="/loginAdmin" element={<LoginAdmin />} />

            <Route path="/pageadmin" element={<AdminLayout />}>
              <Route index element={<Manage />} />
              <Route path="pageadmin" element={<Manage />} />
            </Route>
          </Routes>
        </main>

        {!shouldHideHeaderFooter && <Footer />}
      </div>
  );
};

export default App;