import 'bootstrap/dist/css/bootstrap.min.css';
import './Image-slider.css';

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <div className="container-fluid" style={{ backgroundColor:'#5f6266'}}>
                <div className='row'>
                    <div className='col-md-4'>
                        <hr style={{ color:'white'}}/>
                    </div>
                    <div className='col-md-4'>
                    <div style={{ display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',margin:'10px',gap:'20px',color:'white'}}>
                    <i class="fa-solid fa-water"></i><i class="fab fa-facebook-f"></i><i class="fa-solid fa-water"></i>
                    </div>
                    </div>
                    <div className='col-md-4'>
                    <hr style={{ color:'white'}}/>
                    </div>
                    <div className='col-md-12'>
                    <div style={{ display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',margin:'10px',gap:'20px',color:'white'}}>
                        <p style={{ fontSize:'12px'}}>Kathmandu Upatyaka Khanepani Limited (KUKL)
                        <br/>
                        <p style={{ textAlign:'center'}}>Copyright @ 2024 KUKL,Inc</p>

                        </p>

                    </div>
                    </div>


            </div>
        </div>

        </>
    );
}
