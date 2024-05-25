import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './project&experiences.css';

function ProjectsExperiences() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList("63340500001");
  }, []);

  const getDataList = async (studentId) => {
    const id = studentId;
    try {
      const [projectsResponse, experiencesResponse, awardsResponse, internshipsResponse] = await Promise.all([
        Axios.get(`http://localhost:3001/projects/${id}`),
        Axios.get(`http://localhost:3001/experiences/${id}`),
        Axios.get(`http://localhost:3001/awards/${id}`),
        Axios.get(`http://localhost:3001/internships/${id}`)
      ]);

      const combinedData = {
        projects: projectsResponse.data,
        experiences: experiencesResponse.data,
        awards: awardsResponse.data,
        internships: internshipsResponse.data
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
            {/* <button type="button" class="btn-editimage">Edit Image</button> */}
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
          <div class="section2">
            <h3>Projects & Experiences</h3>
            <div className="line"></div>
            
              <div class="text_Project">
                <p>Projects:</p>
              </div>

              <div class="text_Experiences">
                <p>Experiences:</p>
              </div>

              <div class="text_Awards">
                <p>Awards:</p>
              </div>

              <div class="text_Internships">
                <p>Internships:</p>
              </div>

              <button type="button" class="btn-exportresume">Export Resume</button>
              <button className="btn-edit">
              <Link to="/Edit_ProjectsExperiences">Edit</Link>
              </button>
              <img src={NAMO} className="NAMO" alt="NAMO"/>

              {testDataList.projects && testDataList.projects.map((item) => (
                <div key={item.project_id} className="Projects_PE">
                  {item.project_name}
                </div>
              ))}
              {testDataList.experiences && testDataList.experiences.map((item) => (
                <div key={item.Experiences_id} className="Experiences_PE">
                  {item.description}
                </div>
              ))}
              {testDataList.awards && testDataList.awards.map((item) => (
                <div key={item.award_id} className="awards_PE">
                  {item.description}
                </div>
              ))}
                {testDataList.internships && testDataList.internships.map((item) => (
                  <div key={item.internship_id}  className="internship_PE">
                    {item.description}
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

export default ProjectsExperiences;