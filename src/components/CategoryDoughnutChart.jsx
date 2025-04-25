import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import propTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryDoughnutChart({ chartData }) {
    const data = {
        labels: Object.keys(chartData),
        datasets: [
            {
                label: 'Sales',
                data: Object.values(chartData),
                backgroundColor: ['#0179FE', '#15002e', '#d0d5f7'],
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

    return (
        <div className="w-full bg-white py-4 px-12 rounded-[30px] shadow-md">
            <Doughnut data={data} options={options} />
        </div>
    );
}

CategoryDoughnutChart.propTypes = {
    chartData: propTypes.array,
};

export default CategoryDoughnutChart;