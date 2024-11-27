import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title);

export default function Scatterplot({ municipalitydata }) {
    const [ktmWard, setKtmWard] = useState([]);

    const wardDetails = () => {
        if (!Array.isArray(municipalitydata)) {
            console.error('municipalitydata is not an array:', municipalitydata);
            return;
        }

        let kathmanduWardCounts = [];

        for (let i = 1; i <= 32; i++) {
            const count = municipalitydata.filter(
                record => record.ward === i.toString() && record.municipality === 'Kathmandu metropolis'
            ).length;

            kathmanduWardCounts.push(count);
            console.log('Ward', i, 'Count:', count);
        }

        setKtmWard(kathmanduWardCounts);
        console.log(kathmanduWardCounts);
    }

    useEffect(() => {
        wardDetails();
    }, [municipalitydata]);

    const data = {
        datasets: [
            {
                label: 'Kathmandu Wards',
                data: Array.from({ length: 32 }, (_, i) => ({
                    x: i + 1,
                    y: ktmWard[i] || 0, // Handle cases where ktmWard might not have 32 elements
                })),
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5,
            }
        ]
    };

    return (
            <Scatter data={data} height={200} />
    );
}
