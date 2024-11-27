import './UpdateRequest.css'


export default  function UpdateRequest(){

    return(
        
        <div className="container-fluid">
         <div className="row">
                <div className="col-md-3">
                <div className="col-md-12">
                    <p className='h5-design'>Enter the details for updating your data</p>
                </div>
                    <div className="col-md-12">
                            <label className='design'>Full Name</label>
                            <input type="text" className='input-design'></input>
                    </div>
                        <div className="col-md-12">
                        <label className='design'>Connection/Customer no.</label>
                        <input type="text" className='input-design'></input>
                        </div>
                        <div className="col-md-12">
                            <label className='design'>Phone number</label>
                            <input type="number" className='input-design'></input>
                        </div>
                        <div className="col-md-12">
                        <label className='design'>Address</label>
                        <input type="text" className='input-design'></input>
                        </div>
                        <div className="col-md-12">
                        <label className='design'>Email</label>
                        <input type="email" className='input-design'></input>
                        </div>

                        <div className="col-md-12 m-1" style={{display:'flex',justifyContent:'center'}}>
                        <button className='btn btn-primary btn-block btn-sm'>Submit</button>
                        </div>

                    </div>
                </div>
            </div>

    )
}