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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueBarChart = () => {
    // Sample data
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Revenue',
                data: [12000, 19000, 3000, 5000, 2000, 30000, 4500],
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
                text: 'Revenue Over Months',
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

export default RevenueBarChart;