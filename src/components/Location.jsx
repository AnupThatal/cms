import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Location.css';

export default function Location() {
    const [customerDetails, setCustomerDetails] = useState([]);
    const [areadatadetails, setAreaDataDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationmap, setLocationMap] = useState({ lat: 27.7172, lng: 85.3240 }); // Default to Kathmandu
    const { id } = useParams();

    // Fetch Customer Details
    const fetchCustomerDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { id } });
            setCustomerDetails(response.data);
            setLoading(true);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setLoading(false);
        }
    };

    // Fetch Location Details
    const fetchLocationDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/locationdata/', { params: { id } });
            if (response.data.length > 0) {
                const latitude = response.data[0].latitude || 27.7172; 
                const longitude = response.data[0].longitude || 85.3240;
                setLocationMap({ lat: latitude, lng: longitude });
                setAreaDataDetails(response.data);
                console.log(response.data)
            }
            setLoading(true);
        } catch (error) {
            console.error('Error fetching location data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerDetails();
        fetchLocationDetails();
    }, [id]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 col-sm-12 p-0 bg-light">
                    <ul className="list-unstyled d-flex flex-column gap-3 p-4">
                        <li>
                            <Link to={`/view/${id}`} className="sidebar-link">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={`/profile_location/${id}`} className="sidebar-link">
                                Profile Details
                            </Link>
                        </li>
                        <li>
                            <Link to={`/location/${id}`} className="sidebar-link">
                                Location & Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-10 col-sm-12">
                    <div className="row justify-content-center mt-4">
                        {/* Customer Details Table */}
                        <div className="col-md-12">
                            <div className="p-4 shadow-sm" style={{ borderRadius: '8px' }}>
                                <h5
                                    className="text-uppercase font-weight-bold text-primary mb-4"
                                    style={{
                                        borderBottom: '2px solid #007bff',
                                        paddingBottom: '10px',
                                    }}
                                >
                                    Customer Details
                                </h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {[
                                                    'Customer Name',
                                                    'Customer ID',
                                                    'Connection Number',
                                                    'Branch',
                                                    'Municipality',
                                                    'Ward',
                                                    'Meter Number',
                                                    'Review State',
                                                ].map((header) => (
                                                    <th
                                                        key={header}
                                                        className="text-center"
                                                        style={{
                                                            backgroundColor: '#f1f1f1',
                                                            fontFamily: 'Arial',
                                                            fontSize: '12px',
                                                        }}
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customerDetails.length > 0 ? (
                                                customerDetails.map((d) => (
                                                    <tr key={d.id}>
                                                        <td>{d.house_owner || 'N/A'}</td>
                                                        <td>{d.customer_number || 'N/A'}</td>
                                                        <td>{d.connection_number || 'N/A'}</td>
                                                        <td>{d.branch || 'N/A'}</td>
                                                        <td>{d.municipality || 'N/A'}</td>
                                                        <td>{d.ward || 'N/A'}</td>
                                                        <td>{d.meter_number || 'N/A'}</td>
                                                        <td>{d.reviewstate || 'N/A'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center">
                                                        No data available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mt-4 mb-4">
                            <MapContainer
                                center={[locationmap.lat, locationmap.lng]}
                                zoom={12}
                                style={{ height: '350px', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                            {locationmap.lat && locationmap.lng && (
                                <Marker position={[locationmap.lat, locationmap.lng]}>
                                    <Popup>
                                        <div>
                                            {/* <p>Customer Location: {locationmap.lat}, {locationmap.lng}</p> */}
                                                                                    {customerDetails && Array.isArray(customerDetails) && (
                                            <div>
                                                {customerDetails.map((d) => (
                                                    <div 
                                                        key={d.id} 
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            marginBottom: '10px',
                                                            padding: '5px 10px',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '5px'
                                                        }}
                                                    >
                                                        <div><strong>Owner Name:</strong> {d.house_owner || d}</div>
                                                        <div><strong>Customer Number:</strong> {d.customer_number || d}</div>
                                                        <div><strong>Ward: </strong> {d.ward || d}</div>

                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        </div>
                                    </Popup>
                                </Marker>
                            )}

                           
                            </MapContainer>
                        </div>

                        <div className="col-md-6 mt-4 mb-4">
                        <div
                            className="p-4"
                            style={{
                                borderRadius: '8px',
                                // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                padding: '10px', // Reduced padding for a smaller container
                            }}
                        >
                          {areadatadetails.map((d) => (
                            <div key={d.id} className="inner-card mt-1" style={{ backgroundColor:'white'}}>
                             <ol className="customer-list">
                                <li className="customer-item1">
                                    <span className="label">Tol Name:</span> <strong>{d.tol_name || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Area Classification:</span> <strong>{d.area_classification || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Building Storey:</span> <strong>{d.building_storey || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Construction Type:</span> <strong>{d.construction_type || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Customer Category:</span> <strong>{d.customer_category || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">House Number:</span> <strong>{d.house_number || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Landmark:</span> <strong>{d.landmark || 'N/A'}</strong>
                                </li>
                                {/* <li className="customer-item1">
                                    <span className="label">Starting Node:</span> <strong>{d.starting_node || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">End Node:</span> <strong>{d.end_node || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Package:</span> <strong>{d.package || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">DNI:</span> <strong>{d.dni || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">DNI Number:</span> <strong>{d.dni_number || 'N/A'}</strong>
                                </li>
                                <li className="customer-item1">
                                    <span className="label">Sub DNI:</span> <strong>{d.sub_dni || 'N/A'}</strong>
                                </li> */}
                                </ol>

                            </div>
                        ))}

                            </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
    );
}
