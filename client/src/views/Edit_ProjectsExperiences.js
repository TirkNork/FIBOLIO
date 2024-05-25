import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './Edit_ProjectsExperiences.css';

function Edit_ProjectsExperiences() {
  const [formData, setFormData] = useState({
    projects: '',
    experiences: '',
    awards: '',
    internships: '',
    studentId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const studentId = "63340500001"; // ตั้งค่า studentId ตามที่ต้องการ
    getDataList(studentId);
  }, []);

  const getDataList = async (studentId) => {
    try {
      const [projectsResponse, experiencesResponse, awardsResponse, internshipsResponse] = await Promise.all([
        Axios.get(`http://localhost:3001/projects/${studentId}`),
        Axios.get(`http://localhost:3001/experiences/${studentId}`),
        Axios.get(`http://localhost:3001/awards/${studentId}`),
        Axios.get(`http://localhost:3001/internships/${studentId}`)
      ]);

      const projectsData = projectsResponse.data;
      const experiencesData = experiencesResponse.data;
      const awardsData = awardsResponse.data;
      const internshipsData = internshipsResponse.data;

      if (projectsData.length > 0 && experiencesData.length > 0 && awardsData.length > 0 && internshipsData.length > 0) {
        const data = {
          projects: projectsData[0].project_name,
          experiences: experiencesData[0].description,
          awards: awardsData[0].description,
          internships: internshipsData[0].description,
          studentId: projectsData[0].student_id
        };

        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const updateStudentsProject = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/projects/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/ProjectsExperiences`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  const updateStudentsProject2 = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/experiences/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/ProjectsExperiences`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  const updateStudentsProject3 = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/awards/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/ProjectsExperiences`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  const updateStudentsProject4 = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/internships/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/ProjectsExperiences`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };
  return (
    <div className="Profile">
      <Topbar />
      <body>
        <div className="container">
          <div className="section">
            {/* <button type="button" className="btn-editimage">Edit Image</button> */}
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
          <div className="section2">
            <h3>Projects & Experiences</h3>
            <div className="line"></div>
            <button className='btn-Save' onClick={() => {
                updateStudentsProject();
                updateStudentsProject2();
                updateStudentsProject3();
                updateStudentsProject4();
            }}>Save</button>

            <img src={NAMO} className="NAMO" alt="NAMO" />

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

            
              <input type="text" name="projects" value={formData.projects} onChange={handleChange} class='highschoolname'/><br/>
              <input type="text" name="experiences" value={formData.experiences} onChange={handleChange} class ='experiences'/><br/>
              <input type="text" name="awards" value={formData.awards} onChange={handleChange} class='awards'/><br/>
              <input type="text" name="internships" value={formData.internships} onChange={handleChange} class='internships'/>
            
          </div>
        </div>
      </body>
      <main>
      </main>
    </div>
  );
}

export default Edit_ProjectsExperiences;