import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css'; 

function Layout({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavToggle = () => {
    setIsNavOpen(NavOpen); 
  };
  const renderNavItems = () => {
    if (!isAuthenticated) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link btn btn-primary text-white mx-1" to="/">Sign In</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-secondary text-white mx-1" to="/signup">Sign Up</Link>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <button className="btn btn-danger text-white mx-1" onClick={handleLogout}>Logout</button>
        </li>
      );
    }
  };

  return (
    <div className="d-flex">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">HR Admin Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" onClick={()=>handleNavToggle}></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {renderNavItems()}
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-column flex-grow-1">
        <div className="container-fluid mt-5 pt-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
