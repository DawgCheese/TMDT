import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ products }) {
    const data = {
        labels: products.map((p) => p.name),
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: products.map((p) => p.revenue),
                backgroundColor: ["#d9604c", "#4c98d9"],
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