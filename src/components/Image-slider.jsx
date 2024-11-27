import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import SimpleImageSlider from 'react-simple-image-slider';
import image1 from '../images/inner-bnr.jpg';
import image2 from '../images/home-data.jpg';
import './image-slider.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS
import React, { useEffect } from 'react';
import { height } from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { Link } from 'react-router-dom';


export default function ImageSlider() {
  
  const sliderImages = [
    { url: image1 },
    { url: image2 }
  ]; 


  const survey_url = async () => {
    const url_name = 'https://survey.kuklpid.gov.np/-/single/Ey77hEYgjdvSXuY5ktfSvVexojVPH1w?st=Ywe6iRer5Q3pJzAxtTDOpKAncsQbV6Um6TByCsuihSPhLZwLznwIxAsFecLdZfA!';
    window.open(url_name, '_blank'); // Opens the URL in a new tab
  };
  

  // useEffect(()=>{


  // },[])

  return (
    <>

<div className='container-fluid' style={{ backgroundColor:'#e8ebee'}}>
    <div className='row'>
        {/* Card 1 */}
        <div className='col-md-3 col-sm-12'>
            <div className="card-container">
                <div className='d-flex flex-column align-items-start'>
                    <div className="card1">
                        <div className="card-body">
                            <p style={{ fontSize: '15px', padding: '0', margin: '0' }}>Ready for Survey</p>
                            <hr />
                            <p style={{ fontSize: '15px', padding: '0', margin: '0' }}>Required Documents</p>

                            <p style={{ textAlign: 'justify' }}>
                              <span style={{ display: 'block', margin: '2px' }}>1. Citizenship</span>
                              <span style={{ display: 'block', margin: '2px' }}>2.Lalpurja/Landownership</span>
                              <span style={{ display: 'block', margin: '2px' }}>3. KUKL card or bill</span>
                              <span style={{ display: 'block', margin: '2px' }}>4. House Photo</span>
                              <span style={{ display: 'block', margin: '2px' }}>5. Meter Photo</span>
                          </p>

                            <button className="button1" onClick={survey_url}> {/* Using custom button class */}
                                Click Here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Card 2 */}
        <div className='col-md-3'>
            <div className='d-flex flex-column align-items-start'>
                <div className="card-container">
                    <div className="card1">
                        <div className="card-body">
                            <p style={{ fontSize: '15px', padding: '0', margin: '0' }}>Update the Existing data ?</p>
                            <hr />
                            {/* <p style={{ fontSize: '15px', padding: '0', margin: '0' }}>Update data</p> */}

                            <p style={{ textAlign: 'justify' }}>
                              <span style={{ display: 'block', margin: '2px' }}>1. Citizenship</span>
                              <span style={{ display: 'block', margin: '2px' }}>2.Lalpurja/Landownership</span>
                              <span style={{ display: 'block', margin: '2px' }}>3. KUKL card or bill</span>
                              <span style={{ display: 'block', margin: '2px' }}>4. House Photo</span>
                              <span style={{ display: 'block', margin: '2px' }}>5. Meter Photo</span>
                          </p>
                            
                            <Link to="/Data">
                            <button className="button1" > {/* Using custom button class */}
                                Click Here
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Image Container */}
        <div className='col-md-6'>
            <div className='d-flex flex-column align-items-end'>
                <div className='images' style={{height:'300px'}}></div>
            </div>
        </div>
    </div>
</div>






      <div className='container-fluid'>
        <div className='row'>
          
          <div className='col-md-4 col-sm-6 p-2 d-flex flex-column justify-content-center align-items-center'>
            <div className="element">                   
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="50" height="50" style={{ padding:'2px',margin:'8px'}}><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>            </div>  
            <p style={{ fontSize: '12px', textAlign: 'center', textTransform: 'capitalize'}}>Apply for online Customer survey data</p>
          </div>  

          <div className='col-md-4 col-sm-6 p-2 d-flex flex-column justify-content-center align-items-center'>
            <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="50" height="50" style={{ padding:'2px',margin:'8px'}}><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>
            </div>  
            <p style={{ fontSize: '12px', textAlign: 'center', textTransform: 'capitalize' }}>Document Verification</p>
          </div>
          
          <div className='col-md-4 col-sm-6 p-2 d-flex flex-column justify-content-center align-items-center'>
            <div className="element">   
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="50" height="50" style={{ padding:'2px',margin:'8px'}}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
            </div>  
            <p style={{ fontSize: '12px', textAlign: 'center', textTransform: 'capitalize' }}>KUKL User</p>
          </div>
        </div>
      </div>

    </>
  );
}
