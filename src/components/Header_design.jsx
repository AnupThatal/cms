import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import header_image from '../images/header-bg.png';
import national from '../images/Emblem_of_nepal.svg.png';
import kukl_logo from '../images/kukl_logo-removebg.png';
import nepal from '../images/Flag_of_Nepal.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header_design.css'
import Login from './Login';
import { AuthContext } from './Context';

export default function Header() {
  const [profilename, setProfilename] = useState('');
  const [username, setUsername] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (user) {
      setProfilename(user);
      setUsername(true);
    } 
    else if(storedUser){
      setProfilename(storedUser);
      setUsername(true);
    }
  }, [user]);
  
  return (
    <>
      <div className="head-images">
        <div className="head-image">
          <img src={national} className="responsive-img" alt="National Emblem" />
          <p className="responsive-img">
            नेपाल सरकार<br />
            खानेपानी मन्त्रालय<br />
            Ministry of Water Supply
          </p>
        </div>
        <div>
          <img src={nepal} className="responsive-img" alt="Flag of Nepal" />
        </div>
        <div>
          <img src={kukl_logo} className="responsive-img" alt="KUKL Logo" />
        </div>
      </div>
    <div>
      <nav className='navbar'>
  <ul className='navbar-left'>
    <li>
      <Link to="/">Home</Link>
    </li>
  </ul>

  <ul className='navbar-right'>
    {!username && ( // Hide if user is logged in
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      </>
    )}

    {username && ( // Show if user is logged in
      <>
        <li style={{ color: 'rgb(49, 49, 49)'}}>
          <Link to='/profile'>{profilename}</Link></li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </>
    )}
  </ul>
</nav>
</div>

    </>
  );
}
