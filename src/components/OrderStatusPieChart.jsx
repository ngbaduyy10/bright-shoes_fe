import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusPieChart = () => {
    // Sample data
    const data = {
        labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        datasets: [
            {
                label: '# of Orders',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    '#15002e', // Dark purple
                    '#2b014f', // Slightly lighter
                    '#400175', // Even lighter
                    '#55019a', // Lighter
                    '#6a01bf', // Lightest
                ],
                borderColor: '#f4f7ff',
                borderWidth: 2,
            },
        ],
    };

    // Chart options
    const options = {
        plugins: {
            legend: {
                position: 'left',
                labels: { color: '#15002e' },
            },
            title: {
                display: true,
                text: 'Order Status Distribution',
                color: '#15002e',
                font: {
                    size: 18,
                    family: 'Sen, sans-serif',
                },
            },
        },
    };

    return (
        <div className="w-full bg-white py-4 px-12 rounded-[30px] shadow-md">
            <Pie data={data} options={options} />
        </div>
    );
};

export default OrderStatusPieChart;