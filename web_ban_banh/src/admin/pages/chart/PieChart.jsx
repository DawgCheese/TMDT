import { Pie } from "react-chartjs-2";
// import {Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, ArcElement} from "chart.js";
// ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function generateColors(length) {
    return Array.from({ length }, () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
}

export default function PieChart({ products }) {
    const colors = generateColors(products.length);

    const data = {
        labels: products.map((p) => p.name),
        datasets: [
            {
                data: products.map((p) => p.revenue),
                backgroundColor: colors,
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
