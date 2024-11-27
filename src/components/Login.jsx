import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context';
import { Link } from 'react-router-dom';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, error } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response=await loginUser(username, password);
            console.log(response)
            if (response===True){
                navigate('/');
            }
            else{
                navigate('/login')
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="container-fluid" style={{ backgroundColor:'#e8ebee'}}>
                <div className="row justify-content-center">
                    <div className="col-md-6" style={{ margin: '10px', fontFamily: 'Arial', fontSize: '12px'}}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputUsername1"
                                    aria-describedby="usernameHelp"
                                    style={{ height: '30px' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    style={{ height: '30px' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && (
                                <div className="alert alert-danger" role="alert" style={{ margin: '10px' }}>
                                    {error}
                                </div>
                            )}
                            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <button type="submit" className="btn btn-primary btn-sm">
                                    Submit
                                </button>
                            </div>
                            <div style={{ textAlign:'center',marginTop:'5px'}}>
                                <p>Are you a User ? &nbsp;  
                                    <Link to='/register'>
                                        Register 
                                    </Link>
                                </p>
                            </div>

                            <div style={{ textAlign:'center',marginTop:'5px'}}>
                                <p>Forgot your password ? &nbsp;  
                                    <Link to='/reset_password'>
                                        Click me !
                                    </Link>
                                </p>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
