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
  <nav className='Navbar'>
    <div className='Left-Element'>
    <img src={Fibolo_2} className="Fibolio_logo" alt="Fiboliologo" />
    <ul className='Navbar-Menu' >
      
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
    
    <i  className='User-Button' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
    </i>

    <div className='Dropdown-Menu'>
        <i ><FontAwesomeIcon icon={faCircleUser} /></i>
        <i onClick={toggleDropdown}><FontAwesomeIcon icon={faCaretDown} /></i>
        
        {dropdownOpen && (
        <div className="dropdown-content">
          <Link to="#" onClick={() => setDropdownOpen(false)}>Nuttida</Link>
          <Link to="/Signin" onClick={() => setDropdownOpen(false)}>Logout</Link>
        </div>
      )}
      
    </div>


    {/* Menu for responsive Nav Bar*/}
    {isMenuOpen ?(

      <ul className='responNavbar'>
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

        <i  className='User-Close-Button' onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </i>
      </ul>
    ) : null}
    
    
  </nav>

);
  
}

export default TopbarComponent

