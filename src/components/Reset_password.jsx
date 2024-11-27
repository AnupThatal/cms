import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Resetpassword(){
    const[email,setEmail]=useState('')
    const[errormessage,setErrorMessage]=useState('')

    const navigate=useNavigate()

    const handlecheck = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/resetpassword/', { email1: email });
            console.log('success', response.data);
            navigate('/otp')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('User is not registered');  // Handle the specific error
              } else {
                setErrorMessage('User is not registered');  // Handle other errors
              }
        }
    }
    

    

return (
    <div className="container-fluid" style={{ backgroundColor:'#e8ebee'}}>
        <div className="row justify-content-center">
            <div className="col-md-6" style={{ margin:'20px'}}>
            <form onSubmit={handlecheck}>
                <label style={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:'10px'}}>Verify the email address to reset password ?</label>
                {errormessage && <p style={{ color: 'red', textAlign: 'center',fontSize: '20px' }}>{errormessage}</p>}

                <input
                type="email"
                className="form-control"
                style={{ height: '30px'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                Submit
                </button>
                </div>
            </form>    
            </div>
        </div>
    </div>
);
}