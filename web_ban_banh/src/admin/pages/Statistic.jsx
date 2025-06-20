import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend} from "chart.js";
import BarChart from "./chart/BarChart.jsx";
import PieChart from "./chart/PieChart.jsx";

// Đăng ký các thành phần của Chart.js
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const ORDER_STATUS = {
    PENDING: 1,
    CONFIRMED: 2,
    SHIPPED: 3,
    CANCELLED: 4
};
// Dummy data: chỉ lấy doanh thu ở trạng thái "shipped"
const orders = [
    {
        id: 101,
        account_id: 1,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 210000,
        address: "123 Đường ABC, Quận 1, TP.HCM",
        create_date: "2025-06-10 12:15:00",
        order_detail: [
            {product_id: 1, name: "Bánh bông lan trứng muối", price: 45000, quantity: 2},
            {product_id: 2, name: "Bánh kem socola", price: 120000, quantity: 1}
        ]
    },
    {
        id: 102,
        account_id: 2,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 135000,
        address: "456 Đường DEF, Quận 3, TP.HCM",
        create_date: "2025-06-11 14:00:00",
        order_detail: [
            {product_id: 3, name: "Bánh mì que phô mai", price: 35000, quantity: 1},
            {product_id: 4, name: "Bánh tart trái cây", price: 55000, quantity: 1},
            {product_id: 1, name: "Bánh bông lan trứng muối", price: 45000, quantity: 1}
        ]
    },
    {
        id: 103,
        account_id: 3,
        order_status_id: ORDER_STATUS.PENDING, // Chưa giao, không tính doanh thu
        total: 30000,
        address: "789 Đường GHI, Quận 5, TP.HCM",
        create_date: "2025-06-12 09:00:00",
        order_detail: [
            {product_id: 3, name: "Bánh mì que phô mai", price: 30000, quantity: 1}
        ]
    },
    {
        id: 104,
        account_id: 4,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 120000,
        address: "12 Đường KLM, Quận 7, TP.HCM",
        create_date: "2025-06-13 16:00:00",
        order_detail: [
            {product_id: 2, name: "Bánh kem socola", price: 120000, quantity: 1}
        ]
    },
    {
        id: 105,
        account_id: 5,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 200000,
        address: "99 Đường XYZ, Quận 10, TP.HCM",
        create_date: "2025-06-14 15:30:00",
        order_detail: [
            {product_id: 5, name: "Bánh su kem", price: 50000, quantity: 4}
        ]
    },
    {
        id: 106,
        account_id: 6,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 175000,
        address: "88 Đường QRS, Quận Tân Bình, TP.HCM",
        create_date: "2025-06-15 11:00:00",
        order_detail: [
            {product_id: 6, name: "Bánh tiramisu", price: 75000, quantity: 1},
            {product_id: 1, name: "Bánh bông lan trứng muối", price: 50000, quantity: 2}
        ]
    },
    {
        id: 107,
        account_id: 7,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 225000,
        address: "77 Đường MNO, Quận Phú Nhuận, TP.HCM",
        create_date: "2025-06-16 17:20:00",
        order_detail: [
            {product_id: 2, name: "Bánh kem socola", price: 120000, quantity: 1},
            {product_id: 7, name: "Bánh mousse chanh dây", price: 105000, quantity: 1}
        ]
    },
    {
        id: 108,
        account_id: 8,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 150000,
        address: "66 Đường PQR, Quận Bình Thạnh, TP.HCM",
        create_date: "2025-06-17 10:45:00",
        order_detail: [
            {product_id: 8, name: "Bánh flan caramel", price: 50000, quantity: 3}
        ]
    },
    {
        id: 109,
        account_id: 9,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 120000,
        address: "55 Đường VWX, Quận Gò Vấp, TP.HCM",
        create_date: "2025-06-18 09:30:00",
        order_detail: [
            {product_id: 9, name: "Bánh brownie hạt dẻ", price: 60000, quantity: 2}
        ]
    },
    {
        id: 110,
        account_id: 10,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 90000,
        address: "23 Đường ABC, Q1, TP.HCM",
        create_date: "2025-05-15 09:00:00",
        order_detail: [
            {product_id: 1, name: "Bánh bông lan trứng muối", price: 45000, quantity: 2}
        ]
    },
    {
        id: 111,
        account_id: 11,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 200000,
        address: "88 Đường DEF, Q5, TP.HCM",
        create_date: "2025-06-05 13:00:00",
        order_detail: [
            {product_id: 5, name: "Bánh su kem", price: 50000, quantity: 4}
        ]
    },
    {
        id: 112,
        account_id: 12,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 320000,
        address: "45 Đường XYZ, Q7, TP.HCM",
        create_date: "2025-07-20 19:00:00",
        order_detail: [
            {product_id: 7, name: "Bánh mousse chanh dây", price: 105000, quantity: 2},
            {product_id: 2, name: "Bánh kem socola", price: 110000, quantity: 1}
        ]
    },
    {
        id: 113,
        account_id: 13,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 135000,
        address: "12 Đường QWE, Q3, TP.HCM",
        create_date: "2025-07-22 16:30:00",
        order_detail: [
            {product_id: 8, name: "Bánh flan caramel", price: 45000, quantity: 3}
        ]
    }


];

// // Hàm lọc đơn hàng theo khoảng ngày
function filterByDateRange(orders, fromDate, toDate) {
    return orders.filter(order => {
        const orderDate = new Date(order.create_date);
        return (!fromDate || orderDate >= new Date(fromDate)) && (!toDate || orderDate <= new Date(toDate));
    });
}

//  Hàm lọc đơn hàng theo tháng
function filterByMonth(orders, month) {
    if (!month) return orders;
    const [year, mon] = month.split("-").map(Number);
    return orders.filter(order => {
        const date = new Date(order.create_date);
        return date.getFullYear() === year && date.getMonth() + 1 === mon;
    });
}

//  Hàm tóm tắt doanh thu sản phẩm
function summarizeProductRevenue(filteredOrders) {
    const map = {};
    filteredOrders.forEach(order => {
        order.order_detail.forEach(item => {
            if (!map[item.product_id]) {
                map[item.product_id] = {
                    product_id: item.product_id,
                    name: item.name,
                    revenue: 0,
                    sold: 0,
                    price: item.price
                };
            }
            map[item.product_id].revenue += item.price * item.quantity;
            map[item.product_id].sold += item.quantity;
        });
    });
    return Object.values(map);
}

export default function Statistic() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [month, setMonth] = useState("");
    const [activeTab, setActiveTab] = useState("orders");

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [selectedOrder, setSelectedOrder] = useState(null);

    const shippedOrders = orders.filter(order => order.order_status_id === ORDER_STATUS.SHIPPED);

    const filteredForBar = filterByDateRange(shippedOrders, fromDate, toDate);
    const filteredForPie = filterByMonth(shippedOrders, month);

    const barProducts = summarizeProductRevenue(filteredForBar);
    const pieProducts = summarizeProductRevenue(filteredForPie);
    const totalRevenue = barProducts.reduce((sum, p) => sum + p.revenue, 0);

    const totalPages = Math.ceil(shippedOrders.length / itemsPerPage);
    const paginatedOrders = shippedOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <div className="container py-4">
            <h2 className="mb-4 text-primary">Thống kê doanh thu</h2>

            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>Danh sách đơn hàng</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "charts" ? "active" : ""}`} onClick={() => setActiveTab("charts")}>Thống kê biểu đồ</button>
                </li>
            </ul>

            {activeTab === "orders" && (
                <div className="card">
                    <div className="card-header">Danh sách đơn hàng đã giao</div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th>Mã đơn</th>
                                <th>Ngày tạo</th>
                                <th>Địa chỉ</th>
                                <th>Tổng tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)}
                                    style={{ cursor: "pointer" }}
                                    className="table-row-hover"
                                >
                                    <td>{order.id}</td>
                                    <td>{new Date(order.create_date).toLocaleDateString()}</td>
                                    <td>{order.address}</td>
                                    <td>{order.total.toLocaleString()}đ</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>


            )}

            {activeTab === "charts" && (
                <>
                    <div className="card mb-4">
                        <div className="card-header">Tổng doanh thu (lọc theo khoảng ngày)</div>
                        <div className="card-body">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="me-2"
                            />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="me-3"
                            />
                            <strong className="text-success">{totalRevenue.toLocaleString()}đ</strong>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">Chọn tháng thống kê (biểu đồ tròn)</div>
                        <div className="card-body">
                            <input
                                type="month"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-header">Biểu đồ doanh thu (dạng cột)</div>
                                <div className="card-body">
                                    <BarChart products={barProducts} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100">
                                <div className="card-header">Biểu đồ doanh thu (dạng tròn)</div>
                                <div className="card-body">
                                    <PieChart products={pieProducts} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedOrder && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chi tiết đơn hàng #{selectedOrder.id}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Địa chỉ:</strong> {selectedOrder.address}</p>
                                <p><strong>Ngày tạo:</strong> {new Date(selectedOrder.create_date).toLocaleString()}</p>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>SL</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedOrder.order_detail.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price.toLocaleString()}đ</td>
                                            <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .table-row-hover:hover {
                    border: blue 2px solid;
                    font-size: 1.1em;
                }
            `}</style>
        </div>
    );
}
