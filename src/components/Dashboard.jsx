import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Dashboard() {
    return (
    <>
    <div className='container-fluid' style={{basckground: "linear-gradient(to right,#D3CCE3,#E9E4F0)"}}>
    <div className="row">
        <div className='col-md-12 col-sm-12' style={{ backgroundColor:'#dadfed'}}>
        <p style={{ textAlign:'center',marginBottom:'5px',color:'#007FFF'}}>
        <i class="fa fa-tint" aria-hidden="true"></i> Melamchi Drinking Water</p>
              
        </div>
        
    </div>
    </div>
  
    <div className="container-fluid" style={{ margin:'10px'}}>
            <div className="row">
                <div className="col-sm-8">
                    <h3>KUKL CUSTOMER DATABASE</h3>
                    <p style={{ textAlign:'justify'}}>ADB is helping Kathmandu Upatyaka Khanepani Limited (KUKL) improve its water distribution system for about 250,000 connections. Right now, different contractors use various paper forms and Excel sheets to collect data, which leads to inconsistent information. This makes it hard to combine the data with KUKL's billing system. To fix this, we need a standard format for collecting data. The data should be collected digitally to ensure it's accurate and reliable, and stored securely on KUKL's servers. This will make it easier to merge the data with KUKL's billing system and future IT systems. So far, 80,000 surveys have been completed, showing good progress towards this goal.</p>
                </div>
                <div className="col-sm-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>KUKL CUSTOMER SURVEY DATA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Customer: 240000</td>
                        </tr>
                        <tr>
                            <td>Total Survyed data: 80000</td>
                        </tr>
                        <tr>
                            <td>Remaining data: 160000</td>
                        </tr>
                    </tbody>
                    </table>

                        </div>
                    </div>
                </div>    
</>         
        )
};