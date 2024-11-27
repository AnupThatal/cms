import { useState, useEffect } from "react";
import './Meter_installation_status.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function MeterRequest() {
    const [ward, setWard] = useState([]);
    const [mun, setMun] = useState('');
    const [selectedWard, setSelectedWard] = useState(''); 
    const [datafilter, setDataFilter] = useState(''); 
    const [updatedata,setUpdateData]=useState([]);
    const [totalDetails, setTotalDetails] = useState(0);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading,setLoading]=useState(false)

    const { id } = useParams();



    const ward_info = () => {
        let ward_details = [];
        if (mun === 'Kathmandu metropolis') {
            for (let i = 1; i <= 32; i++) {
                ward_details.push(i);
            }
        } else if (mun === 'Lalitpur metropolis') {
            for (let i = 1; i <= 29; i++) {
                ward_details.push(i);
            }
        }
        setWard(ward_details);
    };

    const getfilterdata = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/filterdata/', { 
                params: { mun_info: mun, ward_info: selectedWard } 
            });
            setData(response.data);
            setTotal(response.data.length);
            setLoading(true);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const handleMunChange = (event) => {
        setMun(event.target.value);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const filterChange = (event) => {
            setDataFilter(event.target.value);
        };

    useEffect(() => {
            if (loading && data.length > 0) {  // Ensure data is not empty before filtering
                let filteredData = [];
                let filteredTotal = total;

                switch (datafilter) {
                    case 'MI':
                        filteredData = data.filter(d => d.meter_number);
                        filteredTotal =total-filteredData.length

                        break;
                    case 'NM':
                        filteredData = data.filter(d => !d.meter_number);
                        filteredTotal =total-filteredData.length
                        break;
                    case 'NCC':
                        filteredData = data.filter(d => !d.customer_number);
                        filteredTotal =total-filteredData.length

                        break;
                    case 'NCM':
                        filteredData = data.filter(d => !d.customer_number && !d.connection_number && !d.meter_number);
                        filteredTotal =total-filteredData.length
                        break;
                    case 'ALL':
                    default:
                        filteredData = data;
                        filteredTotal = filteredData.length;
                        break;

                }
        
                setUpdateData(filteredData); 
                setTotalDetails(filteredTotal);  // Update the total details in state
                console.log(filteredData);
            }
        }, [loading, datafilter, data,total]);
        
        
    useEffect(() => {
        ward_info();
    }, [mun]);

    useEffect(() => {
        if (mun && selectedWard) {
            getfilterdata();
        }
    }, [mun, selectedWard]);

    const downloadData = () => {
        const csvContent = [
            ['Customer Name', 'Customer ID', 'Connection Number', 'Branch', 'Meter Number'], // Column headers
            ...updatedata.map(item => [
                item.house_owner,
                item.customer_number,
                item.connection_number,
                item.branch,
                item.meter_number
            ]),
        ]
        .map(e => e.join(','))
        .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meter_request_data.csv'; // Specify the filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
    };




    return (
        <>
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px 0', padding: '10px', backgroundColor: '#f8f9fa' }}>
    <div className="container" style={{ marginBottom: '20px' }}>
        <div className="row" style={{ gap: '10px' }}>
            {/* Municipality Selector */}
            <div className="col-md-3">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Select the Municipality</label>
                <select 
                    style={{ 
                        width: '100%', 
                        padding: '5px', 
                        borderRadius: '5px', 
                        border: '1px solid #ced4da' 
                    }} 
                    onChange={handleMunChange}
                >
                    <option value="">Municipality</option>
                    <option value="Kathmandu metropolis">Kathmandu</option>
                    <option value="Lalitpur metropolis">Lalitpur</option>
                </select>
            </div>

            {/* Ward Selector */}
            <div className="col-md-3">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Select the Ward</label>
                <select 
                    style={{ 
                        width: '100%', 
                        padding: '5px', 
                        borderRadius: '5px', 
                        border: '1px solid #ced4da' 
                    }} 
                    onChange={handleWardChange}
                >
                    <option value="">Select Ward</option>
                    {ward.map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>

            {/* Filter Option */}
            <div className="col-md-3">
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Select Option</label>
                <select 
                    style={{ 
                        width: '100%', 
                        padding: '5px', 
                        borderRadius: '5px', 
                        border: '1px solid #ced4da' 
                    }} 
                    onChange={filterChange}
                >
                    <option value=" ">Select Option</option>
                    <option value="MI">Meter Installed</option>
                    <option value="NM">No Meter Installed</option>
                    <option value="NCC">No Card Customer</option>
                    <option value="NCM">No customer card and no meter customer</option>
                </select>
            </div>

            {/* Filter Data Card */}
            <div className="col-md-3" style={{ padding: '10px' }}>
                <div className="card" style={{ border: '1px solid #ffcc00', borderRadius: '5px', backgroundColor: '#fff3cd' }}>
                    <div style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#856404' }}>Filter Data</div>
                    <p style={{ textAlign: 'center', fontSize: '20px', margin: '0' }}>{totalDetails}</p>
                </div>
            </div>

            {/* Total Card */}
            <div className="col-md-3" style={{ padding: '10px' }}>
                <div className="card" style={{ border: '1px solid #ffcc00', borderRadius: '5px', backgroundColor: '#fff3cd' }}>
                    <div style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#856404' }}>Total</div>
                    <p style={{ textAlign: 'center', fontSize: '20px', margin: '0' }}>{total}</p>
                </div>
            </div>
        </div>
    </div>

    <div className="container">
        <div className="row" style={{ marginBottom: '10px' }}>
            {/* Download Button */}
            <div className="col-md-12" style={{ textAlign: 'right', marginBottom: '10px' }}>
                <button 
                    onClick={downloadData} 
                    className="btn btn-primary btn-sm" 
                    style={{ padding: '5px 15px', fontSize: '12px' }}
                >
                    Download Data
                </button>
            </div>
        </div>

        {/* Data Table */}
        <div className="card" style={{ borderRadius: '5px', border: '1px solid #dee2e6' }}>
            <div className="table-responsive">
                <table className="table table-bordered" style={{ marginBottom: '0' }}>
                    <thead style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold' }}>
                        <tr>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Customer Name</th>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Customer ID</th>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Connection Number</th>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Branch</th>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Meter Number</th>
                            <th style={{ fontSize: '12px', textAlign: 'center' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updatedata.map((d) => (
                            <tr key={d.id}>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>{d.house_owner}</td>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>{d.customer_number}</td>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>{d.connection_number}</td>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>{d.branch}</td>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>{d.meter_number}</td>
                                <td style={{ fontSize: '12px', textAlign: 'center' }}>
                                    <Link to={`/view/${d.unique_form_id}`}>
                                        <button 
                                            className="btn btn-primary btn-sm" 
                                            style={{ padding: '5px 10px', fontSize: '10px' }}
                                        >
                                            Check Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

        </>
    );
}
