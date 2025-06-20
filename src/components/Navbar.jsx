import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid justify-content-center">
        <a className="navbar-brand me-5 " href="#"><span className='bg-warning px-1'> J </span> <span className='bg-warning mx-1 px-1'> M</span> News</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/sports" className="nav-link">Sports</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Technology" className="nav-link">Technology</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Business" className="nav-link">Business</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Health" className="nav-link">Health</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
