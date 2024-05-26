import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './personal.css';
import exportResume from './exportResume.js';


function PersonalInformation() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList(63340500001);
  }, []);

  const getDataList = (studentId) => {
    const id = studentId;
    Axios.get(`http://localhost:3001/personal_Information/${id}`).then((response) => {
      setTestDataList(response.data);
    });
  };

  return (
    <div className="Profile">
      <Topbar/>
      <body>
        <div className="container">
          <div className="section">
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
          <div className="section2">
            <h3>Personal Information</h3>
            <div className="line"></div>
            <button type="button" className="btn-exportresume" onClick={() => exportResume(testDataList)}>Export Resume</button>
            <button className="btn-edit">
              <Link to="/Edit_PersonalInformation">Edit</Link>
            </button>
            <img src={NAMO} className="NAMO" alt="NAMO"/>
            <div className="text">
              <p>First Name: </p>
              <p>Nickname: </p>
              <p>Student ID: </p>
              <p>Email: </p>
              <p>Tel: </p>
              <p>Address: </p>
            </div>
            <div className="LastName">
              <p>Last Name: </p>
            </div>
            <div className="FRAB">
              <p>FRAB: </p>
            </div>
            {testDataList.map((item) => (
              <div key={item.student_id}>
                <div className="PIData">
                  {item.student_firstname}<br />              
                  {item.student_nickname}<br />
                  {item.student_id}<br />               
                  {item.student_email}<br />
                  {item.student_tel}<br />
                  {item.student_address}<br />
                </div> 
                <div className="PIData_Surname">
                  {item.student_surname}<br />
                </div>
                <div className="PIData_Frab">
                  {item.student_frab}
                </div>                  
              </div>  
            ))}
          </div>
        </div>
      </body>
      <main>
      </main>
    </div>
  );
}

export default PersonalInformation;