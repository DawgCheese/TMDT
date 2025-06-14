import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import BarChart from "./chart/BarChart.jsx";
import PieChart from "./chart/PieChart.jsx";

// Đăng ký các thành phần của Chart.js
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dummy data: 4 đơn hàng, chỉ lấy doanh thu ở trạng thái "shipped"
const ORDER_STATUS = {
    PENDING: 1,
    CONFIRMED: 2,
    SHIPPED: 3,
    CANCELLED: 4
};

const orders = [
    {
        id: 101,
        account_id: 1,
        order_status_id: ORDER_STATUS.SHIPPED,
        total: 210000,
        address: "123 Đường ABC, Quận 1, TP.HCM",
        create_date: "2025-06-10 12:15:00",
        order_detail: [
            { product_id: 1, name: "Bánh bông lan trứng muối", price: 45000, quantity: 2 },
            { product_id: 2, name: "Bánh kem socola", price: 120000, quantity: 1 }
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
            { product_id: 3, name: "Bánh mì que phô mai", price: 35000, quantity: 1 },
            { product_id: 4, name: "Bánh tart trái cây", price: 55000, quantity: 1 },
            { product_id: 1, name: "Bánh bông lan trứng muối", price: 45000, quantity: 1 }
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
            { product_id: 3, name: "Bánh mì que phô mai", price: 30000, quantity: 1 }
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
            { product_id: 2, name: "Bánh kem socola", price: 120000, quantity: 1 }
        ]
    }
];

// Lọc đơn hàng đã "shipped"
const shippedOrders = orders.filter(order => order.order_status_id === ORDER_STATUS.SHIPPED);

// Gom revenue từ order_detail theo từng sản phẩm (id, name)
const productRevenueMap = {};
shippedOrders.forEach(order => {
    order.order_detail.forEach(item => {
        if (!productRevenueMap[item.product_id]) {
            productRevenueMap[item.product_id] = {
                product_id: item.product_id,
                name: item.name,
                revenue: 0,
                sold: 0,
                price: item.price
            };
        }
        productRevenueMap[item.product_id].revenue += item.price * item.quantity;
        productRevenueMap[item.product_id].sold += item.quantity;
    });
});
const productWithRevenue = Object.values(productRevenueMap);
const totalRevenue = productWithRevenue.reduce((acc, p) => acc + p.revenue, 0);

export default function Statistic() {
    return (
        <div className="container py-4">
            <h2 className="mb-4 text-primary">Thống kê doanh thu</h2>

            <div className="card mb-4">
                <div className="card-header">Tổng doanh thu (chỉ tính đơn đã giao)</div>
                <div className="card-body">
                    <h4 className="text-success">{totalRevenue.toLocaleString()}đ</h4>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header">Bảng doanh thu sản phẩm</div>
                <div className="card-body">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá bán</th>
                            <th>Số lượng đã bán</th>
                            <th>Doanh thu</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productWithRevenue.map(product => (
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString()}đ</td>
                                <td>{product.sold}</td>
                                <td className="fw-bold text-success">{product.revenue.toLocaleString()}đ</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Biểu đồ cột và tròn */}
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header">Biểu đồ doanh thu (dạng cột)</div>
                        <div className="card-body">
                            <BarChart products={productWithRevenue} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header">Biểu đồ doanh thu (dạng tròn)</div>
                        <div className="card-body">
                            <PieChart products={productWithRevenue} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}