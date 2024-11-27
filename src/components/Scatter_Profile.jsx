import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarPlot({ count }) {
    const chartData = {
        labels: ['Q1','Q2','Q3'],
        datasets: [
            {
                label: 'Count Data',
                data: [count*4,count*8,count*12],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <p>Daily wise:{count}</p>
            <Bar data={chartData} options={{ responsive: true,Legend:true }} />
        </div>
    );
}
