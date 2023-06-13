import React from 'react';
import { Line, Bar, Pie, Scatter, Radar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function CustomChart({ type, datas, labels, label }) {
    const dataChart = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: datas,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0,
            },
        ],
    };
    const options = {
        scales: {
            x: {
                position: 'bottom',
            },
            y: {
                beginAtZero: true,
            },
        },
    };
    const chartWidth = 1000; // Độ rộng của biểu đồ
    const chartHeight = 300; // Độ cao của biểu đồ
    return (
        <>
            {type === 'Line' && <Line data={dataChart} options={options} width={chartWidth} height={chartHeight}/>}
            {type === 'Bar' && <Bar data={dataChart} options={options} width={chartWidth} height={chartHeight}/>}
            {type === 'Pie' && <Pie data={dataChart} options={options} width={chartWidth} height={chartHeight}/>}
            {type === 'Scatter' && <Scatter data={dataChart} options={options} width={chartWidth} height={chartHeight}/>}
            {type === 'Radar' && <Radar data={dataChart} options={options} width={chartWidth} height={chartHeight}/>}
        </>
    );
}

export default CustomChart;
