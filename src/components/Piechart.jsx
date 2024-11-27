import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ count }) {
    const [datacount, setdataCount] = useState(0);

    useEffect(() => {
        setdataCount(count);
    }, [count]);

    const chartData = {
        labels: ["CUSTOMER SURVEY DATA COLLECTED","KUKL CUSTOMER"],
        datasets: [
            {
                label: "Customer Data",
                data: [datacount, 265000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
                fill:false
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Pie data={chartData} options={options} height={300} width={300} />
        </div>
    );
}
