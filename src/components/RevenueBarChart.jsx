import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import propTypes from "prop-types";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueBarChart = ({ chartData }) => {
    const data = {
        labels : chartData.map(item => item.week_start_date),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => item.total),
                backgroundColor: '#8892d6', // Dark purple
                borderColor: '#f4f7ff', // Light blue border
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#15002e' },
            },
            title: {
                display: true,
                text: 'Revenue Over Weeks',
                color: '#15002e',
                font: {
                    size: 18,
                    family: 'Sen, sans-serif',
                },
            },
        },
        scales: {
            x: {
                ticks: { color: '#15002e' },
                grid: { color: '#f4f7ff' },
            },
            y: {
                ticks: { color: '#15002e' },
                grid: { color: '#f4f7ff' },
            },
        },
    };

    return (
        <div className="w-full bg-white py-4 px-8 rounded-[30px] shadow-md">
            <Bar data={data} options={options} />
        </div>
    );
};

RevenueBarChart.propTypes = {
    chartData: propTypes.array,
}

export default RevenueBarChart;