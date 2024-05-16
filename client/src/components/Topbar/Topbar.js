import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './Topbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KMUTTlogo from '../../assest/KMUTT_Logo.png';
import FIBOlogo from '../../assest/logo_FIBO_resized.png';

function Topbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <img src={KMUTTlogo} className="KMUTT_logo" alt="KMUTTlogo" />
      <img src={FIBOlogo} className="FIBO_logo" alt="FIBOlogo" />
      <div className="button-container">
        <button className="btn-course">
          <Link to="/PersonalInformation">Profile</Link>
        </button>
        <button className="btn-course">
          <Link to="/Course">Course</Link>
        </button>
        <button className="btn-course">
          <Link to="/Project">Project</Link>
        </button>
        <button className="btn-course">
          <Link to="/Competency">Competency</Link>
        </button>
      </div>
      <nav>
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="circleuser-icon">
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <div className="caretdown-icon" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="#" onClick={() => setDropdownOpen(false)}>Nuttida</Link>
              <Link to="/Signin" onClick={() => setDropdownOpen(false)}>Logout</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Topbar;
