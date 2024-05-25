import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './Edit_Personal.css';

function Edit_PersonalInformation() {
  const [testDataList, setTestDataList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    nickname: '',
    studentId: '',
    email: '',
    tel: '',
    address: '',
    lastName: '',
    frab: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDataList(63340500001);
  }, []);

  const getDataList = (studentId) => {
    const id = studentId;
    Axios.get(`http://localhost:3001/personal_Information/${id}`).then((response) => {
      setTestDataList(response.data);
      if (response.data.length > 0) {
        const data = response.data[0];
        setFormData({
          firstName: data.student_firstname,
          nickname: data.student_nickname,
          studentId: data.student_id,
          email: data.student_email,
          tel: data.student_tel,
          address: data.student_address,
          lastName: data.student_surname,
          frab: data.student_frab
        });
      }
    });
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

        const response = await Axios.put(`http://localhost:3001/personal_Information/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/PersonalInformation`);
    } catch (error) {
        console.error("There was an error updating the data!", error);
    }
  };

  return (
    <div className="Profile">
      <Topbar />
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
          <h3>Personal Information</h3>
          <div className="line"></div>
          <button className='btn-Save' onClick={updateStudentsScore}>
            Save
          </button>

          <img src={NAMO} className="NAMO" alt="NAMO" />
          <div class="text">
            <p>First Name: </p>
            <p>Nickname: </p>
            <p>Student ID: </p>
            <p>Email: </p>
            <p>Tel: </p>
            <p>Address: </p>
          </div>

          <div class="LastName">
            <p>Last Name: </p>
          </div>

          <div class="FRAB">
            <p>FRAB: </p>
          </div>

          <div class='textbox_info'>
          <div class='box_firstname'><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
            <div class='box_nickname'><input type="text" name="nickname" value={formData.nickname} onChange={handleChange} /></div>
            <div class='box_studentID'><input type="text" name="studentId" value={formData.studentId} onChange={handleChange} /></div>
            <div class='box_email'><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
            <div class='box_tel'><input type="tel" name="tel" value={formData.tel} onChange={handleChange} /></div>
          </div>
          
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="textbox_address"/>
            
          <div className="textbox_surname">
          <div class='box_surname'><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
          </div>

          <div className="textbox_frab">
          <div class='box_frab'><input type="text" name="frab" value={formData.frab} onChange={handleChange} /></div>
          </div>
        </div>
      </div>
      <main>
      </main>
    </div>
  );
}

export default Edit_PersonalInformation;
