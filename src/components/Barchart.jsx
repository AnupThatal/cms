import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ customerdata, branch }) {
    const [branchData, setBranchData] = useState([]);

    useEffect(() => {
        const branchDataCount = branch.map(branchName => {
        const count = customerdata.filter(customer => customer.branch === branchName).length;
        return count;
        });

        setBranchData(branchDataCount);
    }, [customerdata, branch]);

    const labels = branch;

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Survey data collected branch wise",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: branchData,
                fill:false
            }]
    };

    return (
        <Bar data={data} height={500} width={500}/>
    );
}
