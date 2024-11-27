  import React, { useState } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import './Customer_query.css'


  export default function CustomerQuery() {

      const [formData,setFormData]=useState({
          name: '',
          municipality: '',
          ward: '',
          address: '',
          number: '',
          issues: ''
      });

      const navigate=useNavigate();

      const handleChange = (event) => {
          const { name, value } = event.target;
          setFormData({ ...formData, [name]: value });
      };
      
      const handleSubmit = async (event) => {
          event.preventDefault();
          try {
              const response = await axios.post('http://127.0.0.1:8000/api/customerquery/', {
                  Query_person_name: formData.name,
                  Municipality: formData.municipality,
                  Ward: formData.ward,
                  Address: formData.address,
                  Phone_number: formData.number,
                  Issues: formData.issues
              });
              console.log('Form submitted successfully', response.data);
              navigate('/')
          } catch (error) {
              console.error('Error submitting form:', error);
          }
      };

      return (
          <div>
          <div
            className="container my-4 bggg">
            <div className="row justify-content-center">
              <div className="col-md-6" >
                <div className="col-md-12">
                  <p
                    className="font-weight-bold"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Query Ticket ?
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="col-md-12 col-sm-12 mb-3">
                    <label style={{ textAlign: "center" }}>Query person name</label>
                    <input
                      type="text"
                      name="name" // Add name attribute
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange} // Use onChange instead of onClick
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 mb-3">
                      <label style={{ textAlign: "center" }}>Municipality</label>
                      <select
                        name="municipality"
                        value={formData.municipality}
                        onChange={handleChange}
                      >
                        <option value="kathmandu">Kathmandu</option>
                        <option value="lalitpur">Lalitpur</option>
                        <option value="bhaktapur">Bhaktapur</option>
                      </select>
                    </div>
                    <div className="col-md-6 col-sm-12 mb-3">
                      <label style={{ textAlign: "center" }}>Ward</label>
                      <input
                        type="text"
                        name="ward" // Add name attribute
                        placeholder="Enter ward"
                        value={formData.ward} // Bind to the correct state value
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 mb-3">
                      <label style={{ textAlign: "center" }}>Address</label>
                      <input
                        type="text"
                        name="address" // Add name attribute
                        placeholder="Enter address"
                        value={formData.address} // Bind to the correct state value
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12 mb-3">
                      <label style={{ textAlign: "center" }}>Phone number</label>
                      <input
                        type="number"
                        name="number" // Add name attribute
                        placeholder="Enter phone number"
                        value={formData.number} // Bind to the correct state value
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 mb-3">
                    <label>Information about the issue</label>
                    <select
                      name="issues" // Add name attribute
                      value={formData.issues} // Bind to the correct state value
                      onChange={handleChange}
                    >
                      <option value="water">Communicate with water supply</option>
                      <option value="leakage">Meter leakage</option>
                      <option value="installation">Request for meter installation</option>
                    </select>
                  </div>
                  <div className="col-md-12 col-sm-12" style={{ textAlign: "center" }}>
                    <button className="btn btn-primary btn-sm" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
              <div className="row justify-content-center">
                <div className="p-3">
                  <h5>Additional Information</h5>
                  <p>
                    If you are reporting any issues related to water supply, kindly
                    ensure the following details are correct:
                  </p>
                  <ul>
                    <li>Correct municipality and ward number</li>
                    <li>Provide a valid contact number for any follow-up</li>
                    <li>Ensure you describe the issue clearly</li>
                  </ul>
                  <h6>Contact Support</h6>
                  <p>
                    If you need further assistance, please contact our support team at:
                  </p>
                  <p>
                    <strong>Email:</strong> info@kuklpid.gov.np
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
      );
  }
