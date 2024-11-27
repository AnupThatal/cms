import './Appointment.css';
import { Link } from "react-router-dom";
import Datamanagement from './Datamanagement';
import data1 from "../images/Data status.jpg"


export default function Appointment() {
    return (
        <>

<div className='container-fluid py-4' style={{ backgroundColor: '#f5f5f5' }}>
    <div className='row justify-content-center mb-4'>
        <div className='col-md-6 col-lg-4 text-center' style={{ margin: '10px' }}>
            <div className='card d-flex flex-column justify-content-center align-items-center' style={{ padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <p style={{ fontSize: "22px", color: '#1E90FF', marginBottom: '10px', fontWeight: 'bold' }}>
                    Comparative Analysis
                </p>
                <p style={{ textAlign: 'center', fontSize: '16px', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
                    KUKL Customer Comparison with PID Customer Information Survey: Dashboard for Customer Insights.
                </p>
                <Link to="/Datamanagement" className="btn btn-primary" style={{ fontSize: '14px', padding: '10px 20px', borderRadius: '4px' }}>
                    Explore Insights
                </Link>
            </div>
        </div>
    </div>

    <div className='row justify-content-center'>
        <div className='col-md-4 text-center mb-4'>
            <div className='card d-flex flex-column align-items-center' style={{ padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <p style={{ fontSize: "20px", color: '#1E90FF', fontWeight: 'bold', marginBottom: '10px' }}>
                    Data Status
                </p>
                <p style={{ textAlign: 'center', fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
                    We are committed to providing the best services to our valued customers.
                </p>
                <Link to="/Data" className="btn btn-primary" style={{ fontSize: '14px', padding: '10px 20px', borderRadius: '4px' }}>
                    Learn More
                </Link>
            </div>
        </div>

        <div className='col-md-4 text-center mb-4'>
            <div className='card d-flex flex-column align-items-center' style={{ padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#ffffff' }}>
                <p style={{ fontSize: "20px", color: '#1E90FF', fontWeight: 'bold', marginBottom: '10px' }}>
                    Solutions with Data
                </p>
                <p style={{ textAlign: 'center', fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: '1.5' }}>
                    KUKL Customer Information Survey: Dashboard for customer insights.
                </p>
                <Link to="/Customer_data" className="btn btn-primary" style={{ fontSize: '14px', padding: '10px 20px', borderRadius: '4px' }}>
                    View Details
                </Link>
            </div>
        </div>
    </div>
</div>

{/* 
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 d-flex flex-wrap justify-content-center'>
                        <div className="flip-card m-2">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                <div className='d-flex flex-column align-items-justify'>

                                    <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>KUKL Customer Survey Data</h5>
                                    <p style={{ fontWeight: 'bold', textAlign: 'justify',marginLeft:'20px' }}>Total KUKL Customer: 240000</p>
                                    <p style={{ fontWeight: 'bold', textAlign: 'justify',marginLeft:'20px' }}>KUKL Surveyed Customer: 80000</p>
                                </div>

                                </div>
                                <div className="flip-card-back">
                                <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>KUKL Customer Survey Data</h5>
                                    <p style={{ fontWeight: 'bold', textAlign: 'justify',marginLeft:'20px' }}>Total KUKL Customer: 240000</p>
                                    <p style={{ fontWeight: 'bold', textAlign: 'justify',marginLeft:'20px' }}>KUKL Surveyed Customer: 80000</p>

                                </div>
                            </div>
                        </div>
                        <div className="flip-card m-2">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>TOTAL KUKL OFFICES</h5>
                                    <div className='d-flex flex-column align-items-justify'>
                                    <ol style={{ fontFamily: 'Arial', fontSize: '12px', fontWeight: 'bold', textAlign: 'justify', marginTop: '-5px', padding: 0,marginLeft:'60px' }}>
                                        <li>Tripureshwor Branch</li>
                                        <li>Maharajgunj Branch</li>
                                        <li>Baneshwor Branch</li>
                                        <li>Kirtipur Branch</li>
                                        <li>Bhaktapur Branch</li>
                                        <li>Lalitpur Branch</li>
                                        <li>Thimi Branch</li>
                                        <li>Mahankalchaur Branch</li>
                                        <li>Min Bhawan Branch</li>
                                    </ol>

                                        
                                    </div>
                                </div>
                                <div className="flip-card-back">
                                <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>TOTAL KUKL OFFICES</h5>
                                <div className='d-flex flex-column align-items-justify'>
                                <ol style={{ fontFamily: 'Arial', fontSize: '12px', fontWeight: 'bold', textAlign: 'justify', marginTop: '-5px', padding: 0,marginLeft:'60px' }}>
                                        <li>Tripureshwor Branch</li>
                                        <li>Maharajgunj Branch</li>
                                        <li>Baneshwor Branch</li>
                                        <li>Kirtipur Branch</li>
                                        <li>Bhaktapur Branch</li>
                                        <li>Lalitpur Branch</li>
                                        <li>Thimi Branch</li>
                                        <li>Mahankalchaur Branch</li>
                                        <li>Min Bhawan Branch</li>
                                        </ol>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
