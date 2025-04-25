import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Sneakers', 'Sandals', 'Boots', 'Loafers'],
    datasets: [
        {
            label: 'Sales',
            data: [500, 300, 200, 100],
            backgroundColor: ['#0179FE', '#15002e', '#8892d6', '#d0d5f7'],
            borderWidth: 1,
        },
    ],
};

const options = {
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Product Category',
            color: '#15002e',
            font: {
                size: 18,
                family: 'Sen, sans-serif',
            },
        },
    },
};

export default function CategoryDoughnutChart() {
    return (
        <div className="w-full bg-white py-4 px-12 rounded-[30px] shadow-md">
            <Doughnut data={data} options={options} />
        </div>
    );
}