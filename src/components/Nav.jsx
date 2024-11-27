import './Nav.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav() {
    return (
    <div className='Navbar'>
    <div className="container-fluid" style={{ backgroundColor:'gray'}}>
        <div className="row">
        <div className="col-md-6 d-flex justify-content-start">
        <a style={{ color:'white' }}>नेपाल सरकार|NEPAL GOVERNMENT</a>    
        </div>
        <div className="col-md-6 d-flex justify-content-between">
        <a style={{ color:'white' }}>SKIP TO MAIN CONTENT</a>
        </div>
        </div>

    </div> 
    </div> 
    
    );
  }
  