import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';

function StudyBackground() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList(63340500001);
  }, []);

  const getDataList = (studentId) => {
    const id = studentId
    Axios.get(`http://localhost:3001/studyBackground/${id}`).then((response) => {
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
            <h3>Study Background</h3>
            <svg width="800" height="500">
              <line x1="60" y1="0" x2="772" y2="0" stroke="black" strokeWidth="2" />
            </svg>
            <svg width="800" height="500">
              <line x1="60" y1="50" x2="772" y2="50" stroke="black" strokeWidth="1" />
            </svg>
            {testDataList.map((item) => (
              <div key={item.student_id}>
                High School Name: {item.high_school_name}<br />
                Year of Study: {item.high_school_start} to {item.high_school_stop}<br />
                Program: {item.high_school_program}<br />
                GPAX: {item.high_school_gpx}<br />
                Unversity Name: {item.university_name}<br />
                Major: {item.university_major}<br />
                Year of Study: {item.university_start} to {item.university_stop}<br />
                Program: {item.university_gpax}
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

export default StudyBackground;