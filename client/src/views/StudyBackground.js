import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './StudyBackground.css';
import exportResume from './exportResume.js';

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
          <div className="section">
              <img src={USER} className="user_picture" alt="USER" />
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
          <div class="section2">
            <h3>Study Background</h3>
            <div className="line_SB"></div>
            <div className="line2_SB"></div>
            <div class="HighSchool">
              <p>High School</p>
            </div>
            <div class="University">
              <p>University</p>
            </div>
            {testDataList.map((item) => (
              <div key={item.student_id}>
                <div class="Data_SB">
                  {item.high_school_name}<br />
                  {item.high_school_start} to {item.high_school_stop}<br />
                  {item.high_school_program}<br />
                  {item.high_school_gpx}<br />
                </div>
                <div class="Data2_SB">
                  {item.university_name}<br />
                  {item.university_major}<br />
                  {item.university_start} to {item.university_stop}<br />
                  {item.university_gpax}
                </div>
              </div>
            ))}
            <button type="button" className="btn-exportresume" onClick={() => exportResume(testDataList)}>Export Resume</button>
            <button className="btn-edit">
             <Link to="/Edit_StudyBackground">Edit</Link>
            </button>
            <img src={NAMO} className="NAMO" alt="NAMO"/>
            <div class="text_SB">
              <p>High School Name:</p>
              <p>Year of Study:</p>
              <p>Program:</p>
              <p>GPAX:</p>
            </div>
            <div class="text2_SB">
              <p>Unversity Name:</p>
              <p>Major:</p>
              <p>Year of Study:</p>
              <p>Program:</p>
            </div>
          </div>
        </div>
      </body>
      <main>
        
      </main>
    </div>
  );
}

export default StudyBackground;