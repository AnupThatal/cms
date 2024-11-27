import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewData.css';
import photo from '../images/kukl_logo.png'
// import pic from '../images/citizenship.jpg'
import house from '../images/House.jpg'
import 'bootstrap/js/src/modal'
import { height } from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context';
import { useNavigate } from 'react-router-dom';


export default function ViewData() {
    const [customer,setCustomerDetails]=useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sending,setSending]=useState(false)
    const [images, setImages] = useState([]);
    const [loading,setLoading]=useState(false);
    const [halfIndex,setHalfIndex]=useState(0);
    const [deleteimages,setDeleteImages]=useState([])
    const [selectImage,setSelectedImage]=useState(null)
    const [file, setFile] = useState(null);
    const [kukldata,setKuklData]=useState([])
    const [branch,setBranch]=useState(null)
    const [customerkukl,setKuklCustomer]=useState([]);
    const [customername,setKuklCustomerName]=useState([]);
    const [offset,setOffset]=useState(0);
    const [limit,setLimit]=useState(10);
    const [kuklid,setKuklId]=useState('')
    const [review,setReview]=useState(false);
    const [errormessage,setErrorMessage]=useState('');
    const [comments, setComments] = useState(''); // Store comments input
    const [approved,setApprovedData]=useState([]);
    const [ModalType,setModalType]=useState('');
    const [userName,setUserName]=useState(null);
    const [message,setMessage]=useState('');
    const [branchs,setBranchs]=useState('');
    const [data,setData]=useState([])
    
    const { id } = useParams();

    const { user,userdetails } = useContext(AuthContext);


    const [formData, setFormData] = useState({
      status: '',
      Pid_data: '',
      Kukl_data: '',
      comments: '',
      approved_by:user// Directly get the 'user' from localStorage
    });

    const navigate = useNavigate();


      const handleMessageChange = (e) => {
        setMessage(e.target.value); // Update the message state when user types
      };

      const handleSendMessage = () => {
        if (message) {
          // Here you can handle the message (e.g., sending to an API, console log, etc.)
          console.log('Message sent:', message);
          setMessage(''); // Clear the message after sending
        } else {
          alert('Please enter a message'); // Alert if message is empty
        }
      };


    const datastatus = async(updatedFormData) => {
      console.log('Submitting data:', updatedFormData); // Add logging for the data being sent
      try {
        const response = await axios.post('http://127.0.0.1:8000/data_status/', updatedFormData);
        setReview(true)
      } catch(error){
        setErrorMessage('Data is submitted')
        console.error('There was an error submitting the data:', error);
      }
    };


    const customer_details = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', { params: { id:id } });
            const kuklid=response.data[0].id
            const branchs=response.data[0].branch
            console.log(branchs)
            setBranchs(branchs)
            setKuklId(kuklid)
            setCustomerDetails(response.data);
            setLoading(true)
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };


    // const reviewstatus = async () => {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:8000/approveddata/', {
    //       params: {
    //         id: id,
    //       },
    //     });
    //     if (response.data.kukl_consumer_data){
    //           setApprovedData(response.data.approved_data);
    //           console.log(response.data.kukl_consumer_data);
    //           setKuklData(response.data.kukl_consumer_data);
    //     }
    //     if (response.data.length === 0) {
    //       setReview(false);
    //     } 
    //     else {
    //       setReview(true);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching approved data:', error);
    //     setReview(false);
    //   }
    // };

    const reviewstatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/approveddata/', {
          params: {
            id: id,
          },
        });
    
        if (response.data.kukl_consumer_data) {
          setApprovedData(response.data.approved_data);
          console.log(response.data.kukl_consumer_data);
          setKuklData(response.data.kukl_consumer_data); // Set valid data
          setReview(true);
        } else {
          setKuklData([]); // Reset kuklData if no valid data
          setApprovedData([])
          setReview(false);
        }
    
        if (response.data.length === 0) {
          setReview(false);
        } else {
          setReview(true);
        }
    
      } catch (error) {
        console.error('Error fetching approved data:', error);
        setReview(false);
        setKuklData([]); // Reset kuklData in case of error
        setApprovedData([])

      }
    };
    
    

  const consumerkukldata=async()=>{
      try {
          const response = await axios.get('http://127.0.0.1:8000/getkukldata/', 
              { params: { customer_number:customerkukl,
                          user_branch:branch,
                          offset:offset,
                          limit:limit
              }
           });
          setKuklData(response.data);

      } catch (error) {
          console.error('Error fetching name data:', error);
      }
  };




    const img_details = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getphoto/', { params: { id: id } });
            console.log(response.data)
            console.log(response.data[1].id);
            console.log(response.data[0].length);
            
            const itemsWithSortedNullImages = response.data
            .map(item => {
                const nullImages = Object.keys(item)
                .filter(key => key.startsWith('image') && item[key] === null).length;

                return { ...item, nullImages }; // Add the count of null images to each item
            })
            .sort((a, b) => a.nullImages - b.nullImages); // Sort by null image count

            console.log("Sorted items based on null images:", itemsWithSortedNullImages[0]);

            const baseUrl = 'http://127.0.0.1:8000';
            const imageUrls = [];
            const image_data = Object.values(itemsWithSortedNullImages[2]);
            console.log(image_data);            
            
            for (let i = 1; i < image_data.length - 2; i++) {
                if (image_data[i] !== null) {  // Check if image data is not null
                  imageUrls.push(`${baseUrl}${image_data[i]}`);
                } else {
                  imageUrls.push(null);  // Push null if the image data is null
                }
              }
              
            console.log(imageUrls);
            setImages(imageUrls); 
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    };

    const deleteImages = async (index) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/delete_image/', {
                id: id,
                index: index
            });
            console.log(response);
            window.location.reload(); // Refresh the page after successful upload

        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };
    
    let angle = 0;

    const rotateImageClockWise = async () => {
        let myImage = document.getElementById("myImage");
        angle +=180;
        myImage.style.transform = `rotate(${angle}deg)`; // Apply the updated angle
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };


    const uploadImages = async (index) => {
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('index', index);
        console.log(index)
        formData.append('id', id);
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/upload_image/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          console.log('File:', file);
          console.log('Index:', index);
          console.log('ID:', id);
    
          if (response.status === 200) {
            alert('File uploaded successfully!');
            window.location.reload();

          } else {
            alert('File upload failed.');
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("An error occurred while uploading the file.");
        }
      };

      const branchdatadetails = async (currentOffset) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/getdata/', {
                params: {
                    branch: branchs, // Ensure `branchs` is defined correctly
                    offset: currentOffset,
                    limit: 1,
                },
            });
    
            if (response.data.length === 0) {
                console.log('No data received.');
            } else {
                const uniqueFormId = response.data[0].unique_form_id;
                setCustomerDetails(response.data);
    
                if (uniqueFormId) {
                    updateId(uniqueFormId);
                } else {
                    console.log('unique_form_id not found in response.');
                }
            }
        } catch (error) {
            console.error('Error fetching branch data:', error);
        }
    };
    
    const updateId = (newId) => {
            console.log(newId);
            if (newId) {
                navigate(`/view/${newId}`);
            } else {
                console.log('No new ID to navigate to.');
            }
        };
    

  const handlePrevious = () => {
        setOffset((prevOffset) => {
            const newOffset = Math.max(prevOffset - 1, 0);
            branchdatadetails(newOffset);
            return newOffset;
        });
    };

    const handleNext = () => {
      setOffset((prevOffset) => {
          const newOffset = prevOffset + 1;
          branchdatadetails(newOffset);
          return newOffset;
      });
  };
      
    useEffect(()=>{
      if(customerkukl)
        {
          consumerkukldata();
        }
    },[customerkukl])  


    useEffect(()=>{
        customer_details();
    },[id])

    useEffect(()=>{
      reviewstatus();
    },[id])


    useEffect(() => {
        img_details();
    }, [loading]); 


    return (
        <>
      <div className="container-fluid">
      <div className="row">
      <div className="col-md-2 col-sm-12 p-0 bg-light">
                    <ul className="list-unstyled d-flex flex-column gap-3 p-4">
                        <li><Link to={`/view/${id}`} className="sidebar-link">Dashboard</Link></li>
                        <li><Link to={`/profile_location/${id}`} className="sidebar-link">Profile Details</Link></li>
                        <li><Link to={`/location/${id}`} className="sidebar-link">Location & Contact</Link></li>
                    </ul>
        </div>

    {/* Main Content */}
    <div className="col-md-9 col-sm-12">
      <div className="row">
        <p style={{ fontFamily: 'arial', fontWeight: 'bold', textAlign: 'center', marginTop: '10px',fontSize:'20px' }}>Profile Details</p>
        <div className="col-md-6 col-sm-12">
  <div className="profile shadow-sm p-4 rounded">
    <p className="profile-title">KUKL Customer Details</p>

    {!review && (
      <input
        type="text"
        placeholder="Customer or Connection ID or Name"
        name="customer_id"
        value={customerkukl}
        onChange={(e) => {
          setKuklCustomer(e.target.value);
          setKuklCustomerName(e.target.value);

        }}
        className="form-control mb-3"
        />
    )}


    <div className="mt-1">
      {kukldata.length > 0 &&
        kukldata.map((d) => (
          <div key={d.id} className="inner-card mt-1">
            <ol className="customer-list">
              {kukldata.length === 1 ? (
                <>
                 <li className="customer-item1" style={{ margin: '0px' }}>
                  <span className="label">Owner Name:</span><strong> {d.name_eng || 'N/A'}</strong>
                </li>
                <li className="customer-item1">
                  <span className="label">Customer Number:</span> <strong>{d.customer_id || 'N/A'}</strong>
                </li>

                  <li className="customer-item1">
                    <span className="label">Connection Number:</span><strong>{d.connection_no}</strong> 
                  </li>
                  <li className="customer-item1">
                    <span className="label">Address:</span> <strong>{d.address_eng}</strong>
                  </li>
                  <li className="customer-item1">
                    <span className="label">KUKL Branch:</span> <strong>{d.branch_name}</strong>
                  </li>
                </>
              ) : (
                kukldata.length > 1 && (
                  <>
                    <li className="customer-item1">
                      <span className="label">Owner Name:</span> <strong>{d.name_eng}</strong>
                    </li>
                    <li className="customer-item1">
                      <span className="label">Customer Number:</span> <strong>{d.customer_id}</strong>
                    </li>
                  </>
                )
              )}
            </ol>
          </div>
        ))}
    </div>

        {approved.length === 1 &&
          approved.map((d, index) => (
            <div key={index} className="mt-4">
            <p className="customer-item" style={{ fontSize: '13px', margin: '5px 0', color: '#333' }}>
            <span style={{ fontWeight: 'bold', color: '#007bff', marginRight: '5px' }}>Status:</span>{d.status}
          </p>
          <p className="customer-item" style={{ fontSize: '13px', margin: '5px 0', color: '#333' }}>
            <span style={{ fontWeight: 'bold', color: '#007bff', marginRight: '5px' }}>Approved_by:</span>{d.approved_by}
          </p>
          <p className="customer-item" style={{ fontSize: '13px', margin: '5px 0', color: '#333' }}>
            <span style={{ fontWeight: 'bold', color: '#007bff', marginRight: '5px' }}>Comments:</span>{d.comments}
          </p>

            </div>
          ))}
      </div>
    </div>



    <div className="col-md-6 col-sm-12">
        <div className="profile">
          <p className="profile-title">PID Customer Details</p>

    {customer.map((d) => (
      <div key={d.id} className="customer-card" style={{ borderRadius:'0px',backgroundColor: '#f8f9fa'}}>
        <ol className="customer-list">
          <li className="customer-item1">
            <span className="label">Owner Name:</span> <strong>{d.house_owner}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">Customer Number:</span> <strong>{d.customer_number}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">Connection Number:</span> <strong>{d.connection_number}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">Municipality:</span> <strong>{d.municipality}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">Ward:</span> <strong>{d.ward}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">Meter Number:</span> <strong>{d.meter_number}</strong>
          </li>
          <li className="customer-item1">
            <span className="label">KUKL Branch:</span> <strong>{d.branch}</strong>
          </li>
        </ol>
      </div>
    ))}
  </div>
</div>

                    </div>



                        <div className="container">
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <div style={{ display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'10px'}}>
                            { kukldata.length===1 ? (
                                kukldata.map((d) => (
                                  <div key={d.id}>
                                    {approved.length===0 && (
                                      <>
                                     <span
                                    className="btn btn-primary"
                                    onClick={() => {
                                      setModalType('accept'); // Set modal type to 'accept'
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    Accept
                                  </span>

                                      {isModalOpen && ModalType === 'accept' && (
                                            <div className="modal d-block" tabIndex="-1">
                                              <div className="modal-dialog">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h5 className="modal-title">Add Comments {userName}</h5>
                                                    <button
                                                      type="button"
                                                      className="btn-close"
                                                      onClick={() => setIsModalOpen(false)} // Close modal on button click
                                                    ></button>
                                                  </div>
                                                  <div className="modal-body">
                                                    <textarea
                                                      className="form-control"
                                                      rows="4"
                                                      placeholder="Enter your comments here..."
                                                      value={comments}
                                                      onChange={(e) => setComments(e.target.value)} // Update comments state
                                                    ></textarea>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button
                                                      type="button"
                                                      className="btn btn-secondary"
                                                      onClick={() => setIsModalOpen(false)} // Close modal without saving
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                  try {
                                                    


                                                    const updatedFormData = {
                                                      ...formData,
                                                      status: 'approved',
                                                      Pid_data: kuklid, // Ensure kuklid is available
                                                      Kukl_data: d.id, // Ensure d.id holds the data for Kukl_data
                                                      comments: comments || 'No comments',
                                                    };
                                                    setFormData(updatedFormData); // Update form data state
                                                    datastatus(updatedFormData); // Submit data to backend
                                                    setIsModalOpen(false); // Close modal on success
                                                    setErrorMessage(''); // Clear any error messages
                                                    window.location.reload(); // Reload the page
                                                  } catch (error) {
                                                    console.error(error.message); // Log error
                                                    setErrorMessage(error.message); // Display error message
                                                  }
                                                }}
                                              >
                                                Submit
                                              </button>

                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}    

                                      <span
                                                  className="btn btn-info"
                                                  onClick={() => {
                                                    setModalType('has_issues'); // Set modal type to 'has_issues'
                                                    setIsModalOpen(true);
                                                  }}
                                                >
                                                  Has Issues
                                                </span>
                                          {isModalOpen && ModalType==='has_issues' && (
                                            <div className="modal d-block" tabIndex="-1">
                                              <div className="modal-dialog">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h5 className="modal-title">Add Comments</h5>
                                                    <button
                                                      type="button"
                                                      className="btn-close"
                                                      onClick={() => setIsModalOpen(false)} // Close modal on button click
                                                    ></button>
                                                  </div>
                                                  <div className="modal-body">
                                                    <textarea
                                                      className="form-control"
                                                      rows="4"
                                                      placeholder="Enter your comments here..."
                                                      value={comments}
                                                      onChange={(e) => setComments(e.target.value)} // Update comments state
                                                    ></textarea>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button
                                                      type="button"
                                                      className="btn btn-secondary"
                                                      onClick={() => setIsModalOpen(false)} // Close modal without saving
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn btn-primary"
                                                      onClick={() => {
                                                        try {
                                                          const updatedFormData = {
                                                            ...formData,
                                                            status: 'has_issues',
                                                            Pid_data: kuklid, // Ensure kuklid is available
                                                            Kukl_data: d.id, // Ensure d.id holds the data for Kukl_data
                                                            comments:comments || 'No comments', // Add comments from modal
                                                          
                                                          };
                                                          setFormData(updatedFormData); // Update form data state
                                                          datastatus(updatedFormData); // Submit data to backend
                                                          setIsModalOpen(false); // Close modal on success
                                                          setErrorMessage(''); // Clear any error messages
                                                          window.location.reload(); // Reload the page

                                                        } catch (error) {
                                                          console.error(error.message); // Log error
                                                          setErrorMessage(error.message); // Display error message
                                                        }
                                                      }}
                                                    >
                                                      Submit
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
    
                                        


                                        <span
                                          className="btn btn-info"
                                          color="white"
                                          onClick={() => {
                                            setModalType('decline'); // Set modal type to 'has_issues'
                                            setIsModalOpen(true);
                                                                                                      setSending(true)

                                          }}
                                        >
                                          Decline
                                          
                                        </span>

                                        {isModalOpen && ModalType==='decline' && (
                                            <div className="modal d-block" tabIndex="-1">
                                              <div className="modal-dialog">
                                                <div className="modal-content">
                                                  <div className="modal-header">
                                                    <h5 className="modal-title">Add Comments</h5>
                                                    <button
                                                      type="button"
                                                      className="btn-close"
                                                      onClick={() => setIsModalOpen(false)} // Close modal on button click
                                                    ></button>
                                                  </div>
                                                  <div className="modal-body">
                                                    <textarea
                                                      className="form-control"
                                                      rows="4"
                                                      placeholder="Enter your comments here..."
                                                      value={comments}
                                                      onChange={(e) => setComments(e.target.value)} // Update comments state
                                                    ></textarea>
                                                  </div>
                                                  <div className="modal-footer">
                                                    <button
                                                      type="button"
                                                      className="btn btn-secondary"
                                                      onClick={() => setIsModalOpen(false)} // Close modal without saving
                                                    >
                                                      Close
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn btn-primary"
                                                      onClick={() => {
                                                        try {
                                                          const updatedFormData = {
                                                            ...formData,
                                                            status: 'rejected',
                                                            Pid_data: kuklid, // Ensure kuklid is available
                                                            Kukl_data: d.id, // Ensure d.id holds the data for Kukl_data
                                                            comments:comments || 'No comments', // Add comments from modal
                                                          };
                                                          setFormData(updatedFormData); // Update form data state
                                                          datastatus(updatedFormData); // Submit data to backend
                                                          setIsModalOpen(false); // Close modal on success
                                                          setErrorMessage(''); // Clear any error messages
                                                          window.location.reload(); // Reload the page

                                                        } catch (error) {
                                                          console.error(error.message); // Log error
                                                          setErrorMessage(error.message); // Display error message
                                                        }
                                                      }}
                                                    >
                                                      Submit
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                  </>
                                )}
                                {errormessage && <p>{errormessage}</p>} {/* Display error message */}


                                  </div>
                                ))):(
                                  <>
                                  <div className="container-fluid" style={{ marginTop: '20px' }}>
                                    <div
                                      className="row"
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <div className="col-md-6 col-sm-12">
                                        <div
                                          className="row grid-item"
                                          style={{
                                            borderRadius: '10px',
                                            backgroundColor: '#f8f9fa',
                                            padding: '20px',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                          }}
                                        >
                                          <p
                                            style={{
                                              textAlign: 'center',
                                              fontSize: '16px',
                                              fontWeight: 'bold',
                                              color: '#2c3e50',
                                              marginBottom: '10px',
                                            }}
                                          >
                                            No data available or more than one record found
                                          </p>
                                          <textarea
                                            rows="2"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            style={{
                                              width: '100%',
                                              fontSize: '14px',
                                              fontWeight: 'normal',
                                              color: '#2c3e50',
                                              border: '1px solid #ccc',
                                              padding: '10px',
                                              borderRadius: '4px',
                                              resize: 'none',
                                              textAlign: 'center',
                                              backgroundColor: '#fff',
                                            }}
                                          />
                                          <button
                                            onClick={handleSendMessage}
                                            style={{
                                              height: '30px',
                                              width: '40%',
                                              marginTop: '10px',
                                              padding: '5px',
                                              backgroundColor: '#007bff',
                                              color: 'white',
                                              border: 'none',
                                              borderRadius: '4px',
                                              fontWeight: 'bold',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              fontSize: '14px',
                                            }}
                                          >
                                            Send Message
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid mt-2 mb-2">
                    <div className="row">
                        <div
                            className="d-flex justify-content-center align-items-center mt-3 gap-3"
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



                
              <div className="container-fluid mt-2 mb-2">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="row grid-item" style={{ borderRadius: '0px' }}>
                      <p style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                      }}>
                        KUKL Documents Record
                      </p>
                      <div className="col-md-12 col-sm-12">
                        <div className="card">
                          <img src={photo} className='image' />
                          <p className="card-text" style={{
                            fontSize: '12px',
                            backgroundColor: 'gray',
                            textAlign: 'center',
                            color: 'white',
                            height: '20px'
                          }}>
                            Lalpurja
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <div className="row grid-item" style={{ borderRadius: '0px' }}>
                      <p style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        margin: '10px'
                      }}>
                        PID Documents Record
                      </p>

            
                      <div className="col-md-12 col-sm-12">
                        <div className="card" style={{ borderRadius: '0px' }}>
                          {images.slice(0, 4).map((url, index) => (
                            <div key={index} className="image-container">
                              {url ? (
                                <div>
                                  <img
                                    src={url}
                                    alt={`Image ${index}`}
                                    className="image stylish-image"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => setSelectedImage(url)}
                                  />
                                  {/* Modal structure */}
                                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog">
                                      <div className="modal-content">
                                        <div className="modal-body">
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => { rotateImageClockWise(); }}
                                          ></button>
                                          <img
                                            src={selectImage}
                                            alt={`Image ${index}`}
                                            className="image" style={{ height: '300px',width:'450px' }}
                                            id='myImage'
                                          />
                                          <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: '5px'
                                          }}>
                                            <button onClick={() => rotateImageClockWise(url)} className='btn btn-info' style={{ borderRadius: '50%', border: 'rounded' }}>Rotate</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="image-placeholder">
                                  <input type='file' style={{ height: '150px' }} onChange={handleFileChange} />
                                </div>
                              )}
                              <p className="card-text"
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: 'gray',
                                  textAlign: 'center',
                                  color: 'white',
                                  height: '20px'
                                }}>
                                {index}
                              </p>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '10px',
                                gap: '5px'
                              }}>
                                <button
                                  onClick={() => uploadImages(index)}
                                  className="btn btn-info btn-sm"
                                >
                                  Update
                                </button>

                                <button onClick={() => deleteImages(index)}
                                  className="btn btn-info btn-sm">
                                  Delete
                                </button>
                              </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-12 col-sm-12">
                <div className="card">
                  {images.slice(4, 8).map((url, index) => (
                    <div key={index} className="image-container">
                      {url ? (
                        <div>
                          <img
                            src={url}
                            alt={`Image ${index + 4}`}
                            className="image stylish-image"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => setSelectedImage(url)}
                          />
                          {/* Modal structure */}
                          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <button
                                    type="button"
                                    className="btn-close btn btn-info btn-sm"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { rotateImageClockWise(); }}
                                  ></button>
                                  <img
                                    src={selectImage}
                                    alt={`Image ${index + 1}`}
                                    className="image" style={{ height: '300px',width:'450px' }}
                                    id='myImage'
                                  />
                                  <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '10px'
                                  }}>
                                    <button onClick={() => rotateImageClockWise(url)} className="btn btn-info btn-sm" style={{ color: 'white' }}>Rotate image clockwise</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="image-placeholder">
                          <input type='file' style={{ height: '150px' }} onChange={handleFileChange} />
                        </div>
                      )}
                      <p className="card-text" style={{ fontSize: '12px', backgroundColor: 'gray', textAlign: 'center', color: 'white', height: '20px' }}>
                        {index + 4}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '10px',
                        gap: '5px'
                      }}>
                        <button onClick={() => uploadImages(index + 4)}
                          className="btn btn-info btn-sm">
                          Update
                        </button>
                        <button onClick={() => deleteImages(index + 4)}
                          className="btn btn-info btn-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
