import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
// thay đổi màu cho từng sản phẩm
function generateColors(length) {
    return Array.from({ length }, () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
}

export default function BarChart({ products }) {

    const colors = generateColors(products.length);

    const data = {
        labels: products.map((p) => p.name),
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: products.map((p) => p.revenue),
                backgroundColor: colors,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => context.parsed.y.toLocaleString() + "đ",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value.toLocaleString() + "đ",
                },
            },
        },

    };

    return (
        <div style={{ minHeight: 300 }}>
            <Bar data={data} options={options} />
        </div>
    );
}