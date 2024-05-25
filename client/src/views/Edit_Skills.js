import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './Edit_Skills.css';


function Edit_Skills() {
  const [formData, setFormData] = useState({
    interests: '',
    hardSkills: '',
    softSkills: '',
    studentId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const studentId = "01"; // ตั้งค่า studentId ตามที่ต้องการ
    getDataList(studentId);
  }, []);

  const getDataList = async (studentId) => {
    try {
      const [interestsResponse, hardSkillsResponse, softSkillsResponse] = await Promise.all([
        Axios.get(`http://localhost:3001/interests/${studentId}`),
        Axios.get(`http://localhost:3001/hardSkills/${studentId}`),
        Axios.get(`http://localhost:3001/softSkills/${studentId}`)
      ]);

      const interestsData = interestsResponse.data;
      const hardSkillsData = hardSkillsResponse.data;
      const softSkillsData = softSkillsResponse.data;

      if (interestsData.length > 0 && hardSkillsData.length > 0 && softSkillsData.length > 0) {
        const data = {
          interests: interestsData[0].Interest_name,
          hardSkills: hardSkillsData[0].hard_skill_name,
          softSkills: softSkillsData[0].soft_skill_name,
          studentId: interestsData[0].student_id
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

  const updateStudentsScore = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/interests/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/Skills`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  const updateStudentsScore2 = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/hardSkills/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/Skills`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  const updateStudentsScore3 = async () => {
    try {
        const id = formData.studentId;
        console.log("FormData before update:", formData);

        const response = await Axios.put(`http://localhost:3001/softSkills/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/Skills`);
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
            <h3>Skills</h3>
            <div className="line"></div>
            <button className='btn-Save' onClick={() => {
                updateStudentsScore();
                updateStudentsScore2();
                updateStudentsScore3();
            }}>Save</button>

            <img src={NAMO} className="NAMO" alt="NAMO" />

            <div class="text_Skills2">
              <p>Interests:</p>
              <p>Hard Skills:</p>
              <p>Soft Skills:</p>
            </div>

            <div class='textbox_interests'><input type="text" name="interests" value={formData.interests} onChange={handleChange} /></div>
            <div class='textbox_hardSkills'><input type="text" name="hardSkills" value={formData.hardSkills} onChange={handleChange} /></div>
            <div class='textbox_softSkills'><input type="text" name="softSkills" value={formData.softSkills} onChange={handleChange} /></div>        
            
          </div>
        </div>
      </body>
      <main>
      </main>
    </div>
  );
}

export default Edit_Skills;