import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile_Location.css';
import BarPlot from './Scatter_profile';
import Dognut_chart from './Dognut_chart';

export default function Profile_Location() {
    const [customerDetails, setCustomerDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerdemo, setCustomerDemo] = useState([]);
    const [length,setLength]=useState('');
    const { id } = useParams();

    const fetchCustomerDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { id } });
            setCustomerDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setLoading(false);
        }
    };

    const fetchCustomerDemo = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdemo/', { params: { id } });
            setCustomerDemo(response.data);
            setLoading(false);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching customer demo data:', error);
            setLoading(false);
        }
    };

    const incomeMapping = {
        1: 'Yes',
        0: 'No',
    };

    useEffect(() => {
        fetchCustomerDetails();
        fetchCustomerDemo();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-2 col-sm-12 p-0 bg-light">
                    <ul className="list-unstyled d-flex flex-column gap-3 p-4">
                        <li><Link to={`/view/${id}`} className="sidebar-link">Dashboard</Link></li>
                        <li><Link to={`/profile_location/${id}`} className="sidebar-link">Profile Details</Link></li>
                        {/* <li><Link to={`/location-contact/${id}`} className="sidebar-link">Location & Contact</Link></li> */}
                        <li><Link to={`/location/${id}`} className="sidebar-link">Location & Contact</Link></li>
                       
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-10 col-sm-12">
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-12">
                            <div className="p-4" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <h5 className="text-uppercase font-weight-bold text-primary mb-4" style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                                    Customer Details
                                </h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {['Customer Name', 'Customer ID', 'Connection Number', 'Branch', 'Municipality', 'Ward', 'Meter Number', 'Review State'].map((header) => (
                                                    <th key={header} className="text-center" style={{ backgroundColor: '#f1f1f1', fontFamily: 'Arial', fontSize: '12px' }}>
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customerDetails.map((d) => (
                                                <tr key={d.id}>
                                                    <td>{d.house_owner}</td>
                                                    <td>{d.customer_number}</td>
                                                    <td>{d.connection_number}</td>
                                                    <td>{d.branch}</td>
                                                    <td>{d.municipality}</td>
                                                    <td>{d.ward}</td>
                                                    <td>{d.meter_number}</td>
                                                    <td>{d.reviewstate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Customer Expenses Section */}
                        <div className="col-md-6 mb-4 mt-4">
                            <div className="card p-4" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <h5 className="text-uppercase font-weight-bold text-primary mb-3" style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                                    Customer Expenses
                                </h5>
                                {customerdemo.length > 0 ? (
                                    customerdemo.map((customer, index) => (
                                        <div key={index} className="customer-item mb-3">
                                            <BarPlot count={customer.expenses} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No customer data available</p>
                                )}
                            </div>
                        </div>

                        {/* Duplicate Customer Expenses Section */}
                        <div className="col-md-6 mb-4 mt-4">
                            <div className="card p-4" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                           
                                {customerdemo.length > 0 ? (
                                    customerdemo.map((customer, index) => (
                                        <>
                                        <h5 className="text-uppercase font-weight-bold text-primary mb-3" style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                                        Total family {customer.family_reside}
                                    </h5>
                                        <div key={index} className="customer-item mb-3">
                                            <Dognut_chart  femaleCount={customer.female} family_reside={customer.family_reside} malecount={customer.male} />

                                        </div>
                                        </>
                                    ))
                                ) : (
                                    <p>No customer data available</p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mt-4">
                        <div
                            className="p-4"
                            style={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '10px', // Reduced padding for a smaller container
                            }}
                        >
                            {customerdemo.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table" style={{ fontSize: '12px', marginBottom: '0' }}>
                                <thead>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        <th key={index} style={{ padding: '5px' }}>
                                            Enagaged in work: {customer.engaged_in_work} people
                                        </th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        customer.employment_choices[0].trim() === "1" && (
                                        <td key={index} style={{ padding: '5px' }}>
                                            Agriculture
                                        </td>
                                        )
                                    ))}
                                    </tr>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        customer.employment_choices[1].trim() === "2" && (
                                        <td key={index} style={{ padding: '5px' }}>
                                            Government Services
                                        </td>
                                        )
                                    ))}
                                    </tr>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        customer.employment_choices[2].trim() === "3" && (
                                        <td key={index} style={{ padding: '5px' }}>
                                            Business/Private Job
                                        </td>
                                        )
                                    ))}
                                    </tr>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        customer.employment_choices[3].trim() === "4" && (
                                        <td key={index} style={{ padding: '5px' }}>
                                            Foreign Employment
                                        </td>
                                        )
                                    ))}
                                    </tr>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        customer.employment_choices[4].trim() === "9" && (
                                        <td key={index} style={{ padding: '5px' }}>
                                            Other
                                        </td>
                                        )
                                    ))}
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            ) : (
                            <p>No customer data available</p>
                            )}
                        </div>
                        </div>

                        <div className="col-md-4 mb-4 mt-4">
                        <div
                            className="card p-4"
                            style={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '10px',height:'160px' // Reduced padding for a smaller container
                            }}
                        >
                            {customerdemo.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table" style={{ fontSize: '12px', marginBottom: '0' }}>
                                <thead>
                                    <tr>
                                    <th style={{ padding: '5px' }}>Water Purification</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        <td key={index} style={{ padding: '5px' }}>
                                        {customer.water_purification === "1"
                                            ? "Boiled"
                                            : customer.water_purification === "2"
                                            ? "Medicines like Chlorine, Pius, or others"
                                            : customer.water_purification === "3"
                                            ? "Purify by filter"
                                            : customer.water_purification === "95"
                                            ? "Others"
                                            : 'N/A'}
                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            ) : (
                            <p>No customer data available</p>
                            )}
                        </div>
                        </div>
                        <div className="col-md-4 mb-4 mt-4">
                        <div
                            className="card p-4"
                            style={{
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '10px', // Reduced padding for a smaller container
                            }}
                        >
                            {customerdemo.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <table className="table" style={{ fontSize: '12px', marginBottom: '0' }}>
                                <thead>
                                    <tr>
                                    <th style={{ padding: '5px' }}>Description of houses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {customerdemo.map((customer, index) => (
                                        <td key={index} style={{ padding: '5px' }}>
                                            <p>
                                            <p>
                                            The house consists of <strong>{customer.number_of_rooms} room(s)</strong>, excluding the toilet and kitchen.  
                                            It features approximately <strong>{customer.number_of_kitchens} kitchen(s)</strong> and <strong>{customer.number_of_toilets} toilet(s)</strong>.  
                                            The household is headed by a <strong>{customer.female_headed === '0' ? 'male' : 'female'}</strong>.  
                                            The disabled person in house is <strong>{customer.differently_abled}</strong>.
                                            </p>

                                            </p>

                                        </td>
                                    ))}
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            ) : (
                            <p>No customer data available</p>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
