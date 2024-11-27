import { useEffect, useState } from "react";
import './Customer_survey.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import citizen from '../images/citizenship1.jpg'
import house1 from '../images/house1.jpg'
import landowner from '../images/Lalpurja.jpg'
import kukl_card from '../images/kukl.png'
import meter from '../images/meter.jpg'
import survey from '../images/survey.jpeg'


export default function CustomerSurvey() {
  const [qr, setQr] = useState("");

  // Function to set the survey URL
  const handleQr = async () => {
    try {
      const url ="https://survey.kuklpid.gov.np/-/single/Ey77hEYgjdvSXuY5ktfSvVexojVPH1w?st=Ywe6iRer5Q3pJzAxtTDOpKAncsQbV6Um6TByCsuihSPhLZwLznwIxAsFecLdZfA!"
      setQr(url);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    handleQr();
  }, []);

  const startSurvey = () => {
    if (qr) {
      window.open(qr, "_blank");
    } else {
      console.log("Survey URL not set");
    }
  };

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
                <img src={survey} style={{ height:'300px',width:'100%'}}/>

            </div>

                    
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="row">
                <p style={{ textAlign:'center',fontSize:'25px',color:'#17a2b8'}}>Are you ready for the Customer Survey?</p>
            </div>
            <div className="row mt-3">
                <button className="btn btn-primary" onClick={startSurvey}>
                    <span>Click to Start Survey</span>
                </button>
            </div>
        </div>

            </div>
        <div className="row justify-content-center" style={{ margin:'20px'}}>
        <p style={{textAlign:'center',fontSize:'15px'}}>REQUIRED DOCUMENTS ?</p>

            <div className="col-md-2 mb-3">
            <div className="card">
                <h5 className="card-title" style={{ marginBottom: '0' }}>House Photo</h5>
                <img src={house1} />
            </div>

            </div>
            <div className="col-md-2 mb-3">
            <div className="card">
            <h5 className="card-title" style={{ marginBottom: '0' }}>Citizenship</h5>
            <img src={citizen} style={{ height:'100%'}}/>
            </div>
            </div>        

            <div className="col-md-2 mb-3">
            <div className="card">
                <h5 className="card-title" style={{ marginBottom: '0' }}>Landowner certificate</h5>
                <img src={landowner} style={{ height:'100%'}}/>
            </div>

            </div>
            <div className="col-md-2 mb-3">
            <div className="card">
            <h5 className="card-title">KUKL CARD</h5>
            <img src={kukl_card} style={{ height:'100%'}}/>
            </div>
            </div>

            <div className="col-md-2 mb-3">
            <div className="card">
            <h5 className="card-title">Meter Photo</h5>
            <img src={meter} style={{ height:'100%'}}/>
            </div>
            </div>
          
          

            </div>
            
       
            
        </div>

  );
}
