import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      localStorage.removeItem('user');
      window.location.reload();
    }
    navigate('/login'); 
  }, [navigate]);

  return (
    <>
    </>
  );
}

export default Logout;
