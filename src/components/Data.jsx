import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from './Barchart';
import { height } from '@fortawesome/free-regular-svg-icons/faAddressBook';
import PieChart from './Piechart';
import Scatterplot from './Scatterplot';
import LalitpurScatterplot from './LalitpurScatterplot';
import Login from './Login';

export default function DataDashboard() {
    const [count, setCount] = useState(0);
    const [branch, setBranch] = useState(0);
    const [noncustomer, setNonCustomer] = useState(0);
    const [customer, setCustomer] = useState(0);
    const [apidata,setApiData] = useState(0);
    const [kuklbranches,setKuklbranches] = useState([]);


    const navigate = useNavigate();

    const fetchCustomerData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/customerpid/');
            const data = await response.json();
            console.log(data);
            
            const branches = new Set();
            for (let i = 0; i < data.length; i++) {
                branches.add(data[i].branch);
            }
            const uniqueBranches = Array.from(branches);
            const customerCount = data.filter(item => item.customer_number== '' || item.connection_number== '').length;
            const Noncustomer=data.length-customerCount
            setBranch(uniqueBranches.length);
            setCount(data.length);
            setNonCustomer(customerCount);
            setCustomer(Noncustomer);
            setApiData(data);
            setKuklbranches(uniqueBranches);


        } catch (err) {
            console.log('error', err);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            fetchCustomerData();
        }
        else{
            navigate('/login')
        }
    }, [navigate]);

    return (
        <>
            <div className='container-fluid' style={{ backgroundColor:'whitesmoke'}}>
                <div className='row align-items-center'>
                <div className='col-md-3 col-sm-12'>
                    <div style={{ border:'2px',height:'100px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px'}}>
                        <p style={{ textAlign:'center',fontWeight:'bold'}}> KUKL Customer </p>
                        <p style={{ textAlign:'center'}}>{count}</p>   
                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div style={{ border:'2px',height:'100px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px'}}>
                    <p style={{ textAlign:'center',fontWeight:'bold'}}>Branches covered </p>
                    <p style={{ textAlign:'center'}}>{branch}</p>   

                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div style={{ border:'2px',height:'100px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px'}}>
                    <p style={{ textAlign:'center',fontWeight:'bold'}}>Non-customer</p>
                    <p style={{ textAlign:'center'}}>{noncustomer}</p>  
                    </div>
                </div>
                <div className='col-md-3 col-sm-12'>
                    <div style={{ border:'2px',height:'100px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px'}}>
                    <p style={{ textAlign:'center',fontWeight:'bold'}}>Customer</p>
                    <p style={{ textAlign:'center'}}>{customer}</p>  
                    </div>
                </div>
            </div>
        </div>

        <div className='container-fluid' style={{ backgroundColor:'whitesmoke',padding:'0 15px'}}>
                <div className='row justify-content-evenly'>
                <div className='col-md-5 col-sm-12'>
                    <div style={{ border:'2px',height:'300px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px',borderRadius:'2px'}}>
                        <BarChart customerdata={apidata} branch={kuklbranches}/>
                    </div>
                </div>
                <div className='col-md-5 col-sm-12'>
                    <div style={{ border:'2px',height:'300px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px',borderRadius:'2px'}}>
                    <PieChart count={count} />
                    </div>
                </div>
            </div>
        </div>

        <div className='container-fluid' style={{ backgroundColor:'whitesmoke',padding:'0 15px'}}>
                <div className='row justify-content-evenly'>
                <div className='col-md-6 col-sm-12'>
                    <div style={{ border:'2px',height:'300px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px',borderRadius:'2px'}}>
                        <Scatterplot municipalitydata={apidata} />
                    </div>
                </div>
                <div className='col-md-5 col-sm-12'>
                    <div style={{ border:'2px',height:'300px',width:'100%',backgroundColor:'white',marginTop:'10px',marginBottom:'10px',borderRadius:'2px'}}>
                    <LalitpurScatterplot lmcmunicipalitydata={apidata}/>
                    </div>
                </div>
            </div>
        </div>        
        </>
    );
}
