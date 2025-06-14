import { Pie } from "react-chartjs-2";
// import {Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, ArcElement} from "chart.js";
// ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function PieChart({ products }) {
    const data = {
        labels: products.map((p) => p.name),
        datasets: [
            {
                data: products.map((p) => p.revenue),
                backgroundColor: ["#d9604c", "#4c98d9"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        context.label +
                        ": " +
                        context.parsed.toLocaleString() +
                        "đ",
                },
            },
        },
    };

    return (
        <div style={{ minHeight: 300, maxHeight: 500 }}>
            <Pie data={data} options={options} />
        </div>
    );
}
