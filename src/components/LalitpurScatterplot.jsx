import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, Title);

export default function LalitpurScatterplot({ lmcmunicipalitydata }) {
    const [lmcWard, setLmcWard] = useState([]);

    const wardDetails = () => {
        if (!Array.isArray(lmcmunicipalitydata)) {
            console.error('municipalitydata is not an array:', lmcmunicipalitydata);
            return;
        }

        let LalitpurWardCounts = [];

        for (let i = 1; i <= 29; i++) {
            const count = lmcmunicipalitydata.filter(
                record => record.ward === i.toString() && record.municipality === 'Lalitpur metropolis'
            ).length;

            LalitpurWardCounts.push(count);
            console.log('Ward', i, 'Count:', count);
        }

        setLmcWard(LalitpurWardCounts);
        console.log(LalitpurWardCounts);
    }

    useEffect(() => {
        wardDetails();
    }, [lmcmunicipalitydata]);

    const data = {
        datasets: [
            {
                label: 'Lalitpur Wards',
                data: Array.from({ length: 29 }, (_, i) => ({
                    x: i + 1,
                    y: lmcWard[i] || 0,
                })),
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5,
            }
        ]
    };

    return (
            <Scatter data={data} height={300} />
    );
}
