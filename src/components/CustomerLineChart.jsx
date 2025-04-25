import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const CustomerLineChart = () => {
    // Sample data
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'New Customers',
                data: [3, 2, 2, 6, 4, 7, 5],
                borderColor: '#15002e', // Dark purple line
                backgroundColor: '#f4f7ff', // Light blue fill under the line
                pointBackgroundColor: '#15002e',
                pointBorderColor: '#f4f7ff',
                tension: 0.4,
                fill: true,
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
                text: 'New Customers Over Time',
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
        <div className="w-full bg-white px-8 py-4 rounded-[30px] shadow-md">
            <Line data={data} options={options} />
        </div>
    );
};

export default CustomerLineChart;