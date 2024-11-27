import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import image1 from '../images/question.png'

export default function Customer_Data() {
    
    const[data,setData]=useState([])

    const customer_table = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/');
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    useEffect(()=>{
        customer_table()
    },[]);


    return (
    <>
   <div className="container-fluid">
    <div className="row g-1" style={{ margin: '20px' }}>
        <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Select Your Preferred Option</p>
        <div className="col-md-6 col-sm-12">
                <img src={image1} style={{ width:'300px'}} />
        </div>
      
      
        <div className="col-md-6 col-sm-12">
            <div className="row mb-2">
                <div className="col-md-6 col-sm-12">
                    <Link to="/customerquery">
                        <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                            <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Customer Query</p>
                        </span>
                    </Link>
                </div>
                <div className="col-md-6 col-sm-12">
                    <Link to="/customersurvey">
                        <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                            <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Customer Satisfaction Survey</p>
                        </span>
                    </Link>
                </div>
            </div>

            <div className="row mb-2">
            <div className="col-md-6 col-sm-12">
            <Link to="/meterrequest">

            <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                        <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Customer dashboard overview</p>
                    </span>
            </Link>

                </div>
       
                <div className="col-md-6 col-sm-12">
                <Link to="/updaterequest">

                    <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                        <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Request for Update of Customer Details</p>
                    </span>
                </Link>

                </div>
            
            </div>
            <div className="row mb-2">
            <div className="col-md-6 col-sm-12">
            <Link>
                    <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                        <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Meter Installation Area Status</p>
                    </span>
            </Link>
                </div>

                <div className="col-md-6 col-sm-12">
                <span className="btn btn-light btn-sm w-100" style={{ height: '100px' }}>
                        <p style={{ fontFamily: 'arial', textAlign: 'start', fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Scheduling of Melamchi Water Supply</p>
                    </span>
                </div>
            </div>
        </div>

      

    </div>
</div>



    </>
    
);
}