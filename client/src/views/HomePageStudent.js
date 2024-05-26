import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import './HomePageStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Fibolio from "../assest/Fibolio.png";

function HomePageStudent() {
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
        <div className="HomePageStudent">
            <nav>
            <img src={Fibolio} className="Fibolio" alt="Fibolio"/>
                <div className="dropdown-container" ref={dropdownRef}>
                        <div className="circleuser-icon">
                            <FontAwesomeIcon icon={faCircleUser} />
                        </div>
                        <div className="dropdown-home">
                            <div className="caretdown-icon" onClick={toggleDropdown}>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </div>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                        <Link to="#" onClick={() => setDropdownOpen(false)}>User Name</Link>
                        <Link to="/Signin" onClick={() => setDropdownOpen(false)}>Logout</Link>
                        </div>
                    )}
                </div>
            </nav>
            <main>
                <div class="button-container-Home">
                    <button className="home-course">
                        <Link to="/PersonalInformation">Profile</Link>
                    </button>
                    <button className="home-course">
                        <Link to="/Course">Course</Link>
                    </button>
                    <button className="home-course">
                        <Link to="/Project">Project</Link>
                    </button>
                    <button className="home-course">
                        <Link to="/Competency">Competency</Link>
                    </button>
                </div>
            </main>
        </div>
    );
}
export default HomePageStudent;

