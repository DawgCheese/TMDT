import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="p-4 text-xl font-bold border-b border-gray-700">Trang quản trị</div>
            <nav className="flex-1 p-4 space-y-2">
                <Link to="/pageadmin" className="block hover:bg-gray-800 p-2 rounded">Quản lý</Link>

            </nav>
        </aside>
    );
};

export default Sidebar;
