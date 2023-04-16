import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


function Chart(args) {
    const { data, name, tag, color } = args;
    let label;
    let datavalue;
    if (data) {
        label = data?.map(a => {
            var arr = a.time.split("T")
            return arr[1];
        });
        if (tag === "Solar") {
            datavalue = data?.map(a => a.solar);
        }
        if (tag === "Wind") {
            datavalue = data?.map(a => a.windspeed);
        }
        if (tag === "Rain") {
            datavalue = data?.map(a => a.rain);
        }
    }
    if (!label) return
    const dataval = {
        labels: label,
        datasets: [
            {
                label: tag,
                data: datavalue,
                borderColor: color,
                borderwidth: 1,
                backgroundColor: color
            }
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: name,
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        },
    };
    return <Line options={options} data={dataval} />;
}
export default Chart;