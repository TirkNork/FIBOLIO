 import React from 'react'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faEnvelope , faUser} from '@fortawesome/free-solid-svg-icons'


function TopbarComponent() {
const logo = {
  Kmuttlogo: "../components/images/KMUTT.png",
  Fibologo: "../components/images/FIBO.png"
}


  return (
  //<header className='Navbar'> Web</header>
  <nav className='Navbar'>
    <a href="/" className='site-title'> ProjectName </a>
    <ul>
      <li>
      <a href="/Profile">Profile</a>
      </li>

      <li>
      <a href="/Course">Course</a>
      </li>

      <li>
      <a href="/Project">Project</a>
      </li>

      <li>
      <a href="/Competency">Competency</a>
      </li>
    </ul>

    <ul className='User-Menu'>
      <i><FontAwesomeIcon icon={faUser} /></i>
    </ul>
  </nav>

);
  
}

export default TopbarComponent

