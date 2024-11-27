import './Register.css'
import datasecurity from '../images/data-security-threat.png'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  
  const [registerUser, setRegisterUser] = useState({
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    postion: '',
    branch: ''
  });
  
  const [errormessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/registeruser/', {
        f_name: registerUser.firstname,
        l_name: registerUser.lastname,
        address: registerUser.address,
        Phone_number: registerUser.phone,
        email: registerUser.email,
        password: registerUser.password,
        branch: registerUser.branch,
        position: registerUser.postion
      });
      navigate('/login');
      console.log('success');
    } catch (error) {
      console.log('failed to submit');
      if (error.response && error.response.status === 400) {
        setErrorMessage('User is already registered');
      } else {
        setErrorMessage('Failed to submit. Please try again.');
      }
    }
  };
    
  return (
    <>
      <div className='register1'>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-8 col-sm-12">
              <div className="card-container">
                <div className="card1 p-4 shadow-sm">
                  <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Registration Form
                  </p>

                  {errormessage && <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>{errormessage}</p>}

                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="form-group">
                        <label htmlFor="firstname" className="form-label">First Name:</label>
                        <input type="text" id="firstname" name="firstname" className="form-control"
                          value={registerUser.firstname} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastname" className="form-label">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" className="form-control"
                          value={registerUser.lastname} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="address" className="form-label">Address:</label>
                      <input type="text" id="address" name="address" className="form-control" 
                        value={registerUser.address} onChange={handleChange} required />
                    </div>

                    <div className="row mb-3">
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="number" id="phone" name="phone" className="form-control" 
                          value={registerUser.phone} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-control"
                          value={registerUser.email} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="branch">Select KUKL Branch:</label>
                      <select id="branch" name="branch" onChange={handleChange} value={registerUser.branch} className="form-control" required>
                        <option value="">Select Branch</option>
                        <option value="tripureshwor">Tripureshwor Branch</option>
                        <option value="baneshwor">Baneshwor Branch</option>
                        <option value="maharajgunj">Maharajgunj Branch</option>
                        <option value="mahalaxmi">Mahankal Branch</option>
                        <option value="kirtipur">Kirtipur Branch</option>
                        <option value="bhaktapur">Bhaktapur Branch</option>
                        <option value="lalitpur">Lalitpur Branch</option>
                        <option value="thimi">Thimi Branch</option>
                      </select>
                    </div>

                    <div className="row mb-3">
                      <div className="form-group">
                        <label htmlFor="postion" className="form-label">Position:</label>
                        <input type="text" id="postion" name="postion" className="form-control" 
                          value={registerUser.postion} onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input type="password" id="password" name="password" className="form-control" minLength="8" maxLength="10"
                        value={registerUser.password} onChange={handleChange} required />
                    </div>

                    <div className="text-center mt-2">
                      <input type="submit" value="Submit" className="btn btn-primary px-4 py-2" />
                    </div>
                  </form>
                </div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}
