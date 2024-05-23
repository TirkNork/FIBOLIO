import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';

function Skills() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList(63340500001);
  }, []);

  const getDataList = async (studentId) => {
    const id = studentId;
    try {
      const [interestsResponse, hardSkillsResponse, softSkillsResponse] = await Promise.all([
        Axios.get(`http://localhost:3001/interests/${id}`),
        Axios.get(`http://localhost:3001/hardSkills/${id}`),
        Axios.get(`http://localhost:3001/softSkills/${id}`)
      ]);

      const combinedData = {
        interests: interestsResponse.data,
        hardSkills: hardSkillsResponse.data,
        softSkills: softSkillsResponse.data
      };

      setTestDataList(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
            <h3>Skills</h3>
            <svg width="800" height="500">
              <line x1="60" y1="0" x2="772" y2="0" stroke="black" strokeWidth="2" />
            </svg>
            <div>
            {testDataList.interests && testDataList.interests.map((item) => (
              <div key={item.student_id}>
                Interests: {item.Interest_name}
              </div>
            ))}
            </div>
            <div>
              {testDataList.hardSkills && testDataList.hardSkills.map((item) => (
                <div key={item.student_id}>
                  Hard Skills: {item.hard_skill_name}
                </div>
              ))}
            </div>
            <div>
              {testDataList.softSkills && testDataList.softSkills.map((item) => (
                <div key={item.student_id}>
                  Soft Skills: {item.soft_skill_name}
                </div>
              ))}
            </div>
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

export default Skills;