import React from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
    const location = useLocation();

    const getPageTitle = (path) => {
        if (path.includes("/employees")) return "Nhân viên";
        if (path.includes("/key")) return "Kích hoạt key";
        if (path.includes("/history")) return "Lịch sử tác vụ";
        return "Quản lý";
    };

    const title = getPageTitle(location.pathname);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* ✅ Truyền prop title vào đây */}
                <HeaderAdmin title={title} />
                <main className="p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
