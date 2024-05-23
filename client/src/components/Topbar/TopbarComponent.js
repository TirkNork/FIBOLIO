import React, { useState, useEffect, useRef } from 'react';
 import { Link } from "react-router-dom";
 import './TopbarComponent.css'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCaretDown , faBars} from '@fortawesome/free-solid-svg-icons';
import KMUTTlogo from '../images/KMUTT.png'
import FIBOlogo from '../images/FIBO.png'
import Fibolio from '../images/Fibolio.png'
import Fibolo_2 from '../images/Fibolo_2.png'


function TopbarComponent() {
const logo = {
  Kmuttlogo: "../images/KMUTT.png",
  Fibologo: "../images/FIBO.png"
}

const [dropdownOpen, setDropdownOpen] = useState(false);
const [isMenuOpen , setMenuOpen] = useState(false);
const dropdownRef = useRef(null);

  const toggleMenu = () =>{
    setMenuOpen(!isMenuOpen);
    
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleResize = () =>{
    if (isMenuOpen && window.innerWidth > 580){
      setMenuOpen(!isMenuOpen);
    }
    if (dropdownOpen && window.innerWidth < 580){
      setDropdownOpen(!dropdownOpen)
    }
  }
  

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };


  useEffect(() => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize' , handleResize)
  });

  useEffect(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  },[]);

  return (
  <nav className='navbar'>
    <div className='left-element'>
    <img src={Fibolio} className="fibolio_logo" alt="Fiboliologo" />
    <ul className='navbar-menu' >
      
      <li className='btn-course'>
      <Link to="/PersonalInformation">Profile</Link>
      </li>

      <li className='btn-course'>
      <Link to="/Course">Course</Link>
      </li>

      <li className='btn-course'>
      <Link to="/Project">Project</Link>
      </li>

      <li className='btn-course'>
      <Link to="/Competency">Competency</Link>
      </li>
    </ul>
    </div>
    
    <i  className='user-button' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
    </i>

    <div className='dropdown-menu'>
        <i ><FontAwesomeIcon icon={faCircleUser} /></i>
        <i onClick={toggleDropdown}><FontAwesomeIcon icon={faCaretDown} /></i>
        
        {dropdownOpen && (
        <div className="dropdown-content">
          <Link to="#" onClick={() => setDropdownOpen(false)}>User Name</Link>
          <Link to="/Signin" onClick={() => setDropdownOpen(false)}>Logout</Link>
        </div>
      )}
      
    </div>


    {/* Menu for responsive Nav Bar*/}
    {isMenuOpen ?(

      <ul className='responsive-navbar'>
        <li>
        <Link to="/PersonalInformation" onClick={toggleMenu} >Profile</Link>
          </li>
    
        <li>
        <Link to="/Course" onClick={toggleMenu} >Course</Link>
        </li>
  
        <li>
        <Link to="/Project" onClick={toggleMenu} >Project</Link>
        </li>
  
        <li>
        <Link to="/Competency" onClick={toggleMenu} >Competency</Link>
        </li>

        <li>
        <Link to="/Signin" onClick={toggleMenu}>Logout</Link>
        </li>

        <i  className='user-close-button' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </i>
      </ul>
    ) : null}
    

    
  </nav>

);
  
}

export default TopbarComponent

