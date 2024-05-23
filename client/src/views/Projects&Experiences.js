import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';

function ProjectsExperiences() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = () => {
    Axios.get("http://localhost:3001/testTable").then((response) => {
      setTestDataList(response.data);
    });
  };

  return (
    <div className="Profile">
      <Topbar/>
      <body>
        <div class="container">
          <div class="section">
            <button type="button" class="btn-editimage">Edit Image</button>
            <img src={USER} className="user_picture" alt="USER"/>
            <div className="user-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <h2>My Account</h2>
            <button className="button-a">
             <Link to="/PersonalInformation">Personal Information</Link>
            </button>
            <button className="button-b">
                <Link to="/StudyBackground">Study Background</Link>
            </button>
            <button className="button-b">
                  <Link to="/Skills">Skills</Link>
            </button>
            <button className="button-b">
                <Link to="/ProjectsExperiences">Projects & Experiences</Link>
            </button>
          </div>
          <div class="section">
            <h3>Projects & Experiences</h3>
            <svg width="800" height="500">
              <line x1="60" y1="0" x2="772" y2="0" stroke="black" strokeWidth="2" />
            </svg>
            {testDataList.map((item) => (
              <div key={item.id}>
                <strong>ID:</strong> {item.id}, ;
                <strong>First Name:</strong> {item.first_name}, ;
                <strong>Last Name:</strong> {item.last_name}, ;
                <strong>Age:</strong> {item.age}
              </div>
            ))}
            <button type="button" class="btn-exportresume">Export Resume</button>
            <button type="button" class="btn-edit">Edit</button>
            <img src={NAMO} className="NAMO" alt="NAMO"/>
          </div>
        </div>
      </body>
      <main>
        
      </main>
    </div>
  );
}

export default ProjectsExperiences;