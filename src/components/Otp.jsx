import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Otp(){
    const [otp,setOtp]=useState('')
    const [errormessage,setErrorMessage]=useState('')
    const [loading,setLoading]=useState(false)
    const [responseData, setResponseData] = useState(null); 


    const navigate=useNavigate()

    const handlecheck = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/otpreset/', { otp: otp });
            console.log(response.data)
            const userData = response.data[0].email;
            console.log(userData)
            setResponseData(response.data);
            setLoading(true)
            navigate(`/newpassword/${otp}/${userData}`);
        } 
        catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Otp is not correct'); 
              } 
              else {
                setErrorMessage('Otp is not correct');
              }
        }
    }
    

    

return (
    <div className="container-fluid" style={{ backgroundColor:'#e8ebee'}}>
        <div className="row justify-content-center">
            <div className="col-md-6" style={{ margin:'20px'}}>
            <form onSubmit={handlecheck}>
                <label style={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:'10px'}}>
                    Otp sent to your email to reset the password enter the otp ?</label>
                {errormessage && <p style={{ color: 'red', textAlign: 'center',fontSize: '20px' }}>{errormessage}</p>}

                <input
                type="text"
                className="form-control"
                style={{ height: '30px'}}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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