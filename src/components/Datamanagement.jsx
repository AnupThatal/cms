import { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import './Datamanagement.css';
import ViewData from './ViewData';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context';
import { useContext } from 'react';


export default function Datamanagement() {
    const [data, setData] = useState([]);
    const [branchs, setBranchs] = useState('');
    const [name,setName]=useState('');
    const [customer,setCustomer]=useState('');
    const [offset,setOffset]=useState(0);
    const [limit,setLimit]=useState(10);
    const [length,setLength]=useState(0);
    const [kukldata,setKuklData]=useState([])
    const [check,setCheck]=useState('');
    const [count,setCount]=useState('');
    const [countchecked,setCheckedCount]=useState('');
    const [notchecked,setnotCheckedCount]=useState('');


    const { user,userdetails } = useContext(AuthContext);

    console.log(userdetails)
    console.log(user)

    const navigate=useNavigate();

    const customerIdDataDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { customer_number:customer,user_branch:userdetails } });
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const branchdatadetails = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { 
                branch:branchs,
                offset:offset,
                limit:limit,
                checked: check
            } });

            if(response.data.length===0) {
                console.log('Data received:', response.data);
    
            }
            else{
            setLength(response.data.length);
            console.log(length);
            setData(response.data);
        }
    
        } catch (error) {
            console.error('Error fetching branch data:', error);
        }
    };

    const fetchCustomerData = async () => { 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/customerpid/');
            const data = await response.json();
            setCount(data.length);
            const checkedCount = data.filter(customer => customer.checked==='checked').length;
            const notCheckedCount = data.filter(customer => customer.checked==='Not Checked').length;
            setCheckedCount(checkedCount);
            setnotCheckedCount(notCheckedCount);
        } catch (error) {
            console.error('Error fetching branch data:', error);
        }
    };
    

    const ownerdatadetails = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { house_owner:name,user_branch:userdetails } });
            setData(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching name data:', error);
        }
    };

    const consumerkukldata=async()=>{
        try {
            const response = await axios.get('http://127.0.0.1:8000/getkukldata/', 
                { params: { customer_number:customer,user_branch:userdetails}
             });
            setKuklData(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching name data:', error);
        }
    };



    const handlePrevious = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
      };

    const handleNext = () => {
        setOffset((prevOffset) => prevOffset + limit);
      };

    useEffect(() => {
        if (localStorage.getItem('user')){
        if (branchs && check){
            branchdatadetails();
        }
        else if(customer){
            customerIdDataDetails();
            consumerkukldata();

        }
        else if(name.length>3){
            let timerout=setTimeout(()=>{
                ownerdatadetails();
            },1200);
            return () => clearTimeout(timerout);
        }

        else{
            setData([]);
        }
    }
    else {
        navigate('/login');
    }
    }, [branchs,customer,name,offset,check]);
   
    useEffect(()=>{
        fetchCustomerData();
    },[])


    const handleSumbit=(event)=>{
        event.preventDefault();
    };


    return(
    <>
            <div className="container">
            <div className="row justify-content-center">
                {/* Total Data */}
                <div className="col-4 mt-3">
                <div
                    style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    }}
                >
                    <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "10px",
                    }}
                    >
                    Total Data
                    </p>
                    <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#007BFF",
                        margin: "0",
                    }}
                    >
                    {count}
                    </p>
                </div>
                </div>

                {/* Not Checked Data */}
                <div className="col-4 mt-3">
                <div
                    style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    }}
                >
                    <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "10px",
                    }}
                    >
                    Not Checked Data
                    </p>
                    <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#FF5733",
                        margin: "0",
                    }}
                    >
                    {notchecked}
                    </p>
                </div>
                </div>

                {/* Checked Data */}
                <div className="col-4 mt-3">
                <div
                    style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    textAlign: "center",
                    }}
                >
                    <p
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "10px",
                    }}
                    >
                    Checked Data
                    </p>
                    <p
                    style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#28A745",
                        margin: "0",
                    }}
                    >
                    {countchecked}
                    </p>
                </div>
                </div>
            </div>
            </div>



            <form
                            style={{
                                marginTop: '20px',
                                padding: '20px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                            onSubmit={handleSumbit}
                            >
                            <div className="container p-0">
                                <div className="row justify-content-center g-3">
                                <h4
                                    style={{
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    fontFamily: 'Arial, sans-serif',
                                    color: '#333',
                                    }}
                                >
                                    Data Checkup
                                </h4>

                                {/* Customer Name Input */}
                                <div className="col-md-3 col-sm-12">
                                    <input
                                    type="text"
                                    placeholder="Customer Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setCustomer('');
                                        setBranchs('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontFamily: 'Arial, sans-serif',
                                    }}
                                    />
                                </div>

                                {/* Customer ID or Connection ID Input */}
                                <div className="col-md-3 col-sm-12">
                                    <input
                                    type="text"
                                    placeholder="Customer ID or Connection ID"
                                    name="customer_id"
                                    value={customer}
                                    onChange={(e) => {
                                        setCustomer(e.target.value);
                                        setBranchs('');
                                        setName('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontFamily: 'Arial, sans-serif',
                                    }}
                                    />
                                </div>

                                {/* Branch Selector */}
                                <div className="col-md-3 col-sm-12">
                                    <select
                                    name="Kuklbranch"
                                    id="Kuklbranch"
                                    value={branchs}
                                    onChange={(e) => {
                                        setBranchs(e.target.value);
                                        setCheck('');
                                        setCustomer('');
                                        setName('');
                                        setOffset(0);
                                        setKuklData('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontFamily: 'Arial, sans-serif',
                                        backgroundColor: '#fff',
                                    }}
                                    >
                                    <option>Select branch</option>
                                    <option value="Baneshwor">Baneshwor</option>
                                    <option value="Lalitpur">Lalitpur</option>
                                    <option value="Tripureshowr">Tripureshwor</option>
                                    <option value="Mahankalchour">Mahankalchour</option>
                                    <option value="Maharajgunj">Maharajgunj</option>
                                    <option value="Kritipur">Kritipur</option>
                                    <option value="Bhaktapur">Bhaktapur</option>
                                    </select>
                                </div>

                                {/* Data Checked Selector */}
                                <div className="col-md-3 col-sm-12">
                                    <select
                                    name="Kukldatachecked"
                                    id="Kukldatachecked"
                                    value={check}
                                    onChange={(e) => {
                                        setCheck(e.target.value);
                                        setCustomer('');
                                        setName('');
                                        setOffset(0);
                                        setKuklData('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontFamily: 'Arial, sans-serif',
                                        backgroundColor: '#fff',
                                    }}
                                    >
                                    <option value="">Checked or Not checked</option>
                                    <option value="Not Checked">Not Checked</option>
                                    <option value="checked">Checked</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div
                                    className="col-md-12"
                                    style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '20px',
                                    }}
                                >
                                    <button
                                    className="btn btn-info btn-sm"
                                    style={{
                                        height: '40px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        fontFamily: 'Arial, sans-serif',
                                        padding: '0 20px',
                                        backgroundColor: '#17a2b8',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    >
                                    Check
                                    </button>
                                </div>
                                </div>
                            </div>
                            </form>





                            <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
    <div className="container-fluid p-0">
        <div className="row g-1">
            <div className="col-md-12">
                <div className="container-fluid mt-3">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-12 p-3 text-center">
                            <h5 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                                KUKL Approved Customer Table
                            </h5>
                            <div className="table-responsive">
                                <table
                                    className="table table-bordered"
                                    style={{
                                        border: '1px solid #ddd',
                                        textAlign: 'center',
                                        backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <thead>
                                        <tr style={{ backgroundColor: '#87CEEB', color: '#fff' }}>
                                            {[
                                                'Customer Name',
                                                'Customer ID',
                                                'Connection Number',
                                                'Branch',
                                                'Municipality',
                                                'Ward',
                                                'Meter Number',
                                                'Review State',
                                                'View',
                                                'Status',
                                            ].map((header, index) => (
                                                <th
                                                    key={index}
                                                    style={{
                                                        fontSize: '11px',
                                                        padding: '10px',
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((d, index) => (
                                            <tr key={d.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f0f8ff' }}>
                                                {[
                                                    d.house_owner,
                                                    d.customer_number,
                                                    d.connection_number,
                                                    d.branch,
                                                    d.municipality,
                                                    d.ward,
                                                    d.meter_number,
                                                    d.reviewstate,
                                                    '',
                                                    d.checked,
                                                ].map((value, idx) => (
                                                    <td
                                                        key={idx}
                                                        style={{
                                                            padding: '8px',
                                                            fontSize: '11px',
                                                            verticalAlign: 'middle',
                                                        }}
                                                    >
                                                        {idx === 8 ? (
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    gap: '10px',
                                                                }}
                                                            >
                                                                <Link
                                                                    to={`/view/${d.unique_form_id}/${d.branch}${
                                                                        kukldata[index]?.customer_id || ''
                                                                    }`}
                                                                >
                                                                    <button
                                                                        className="btn btn-primary btn-sm"
                                                                        style={{
                                                                            height: '25px',
                                                                            fontSize: '10px',
                                                                            borderRadius: '4px',
                                                                            padding: '0 10px',
                                                                        }}
                                                                    >
                                                                        Data
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        ) : (
                                                            value
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '15px',
                                        gap: '15px',
                                    }}
                                >
                                    <button
                                        onClick={handlePrevious}
                                        className="btn btn-info btn-sm"
                                        style={{
                                            height: '30px',
                                            fontSize: '12px',
                                            borderRadius: '4px',
                                            padding: '0 15px',
                                        }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="btn btn-info btn-sm"
                                        style={{
                                            height: '30px',
                                            fontSize: '12px',
                                            borderRadius: '4px',
                                            padding: '0 15px',
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





    
</>
    );
}