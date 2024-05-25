import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NAMO from '../assest/NAMO.svg';
import USER from '../assest/user_picture.png';
import Topbar from '../components/Topbar/Topbar';
import './Edit_StudyBackground.css';

function Edit_StudyBackground() {
  const [testDataList, setTestDataList] = useState([]);
  const [formData, setFormData] = useState({
    highschoolname: '',
    highschoolstart: '',
    highschoolstop: '',
    highschoolprogram: '',
    highschoolgpx: '',
    universityname: '',
    universitymajor: '',
    universitystart: '',
    universitystop: '',
    universitygpax: '',
    studentId: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDataList(63340500001);
  }, []);

  const getDataList = (studentId) => {
    const id = studentId;
    Axios.get(`http://localhost:3001/studyBackground/${id}`).then((response) => {
      setTestDataList(response.data);
      if (response.data.length > 0) {
        const data = response.data[0];
        setFormData({
          highschoolname: data.high_school_name,
          highschoolstart: data.high_school_start,
          highschoolstop: data.high_school_stop,
          highschoolprogram: data.high_school_program,
          highschoolgpx: data.high_school_gpx,
          universityname: data.university_name,
          universitymajor: data.university_major,
          universitystart: data.university_start,
          universitystop: data.university_stop,
          universitygpax: data.university_gpax,
          studentId: data.student_id,
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
        console.log(id)
        const response = await Axios.put(`http://localhost:3001/studyBackground/${id}`, formData);
        console.log('Data updated successfully:', response.data);
        navigate(`/StudyBackground`);
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
          <h3>Study Background</h3>
          <div className="line"></div>
          <button className='btn-Save' onClick={updateStudentsScore}>
            Save
          </button>

          <img src={NAMO} className="NAMO" alt="NAMO" />
          
          <div className="line_SB"></div>
            <div className="line2_SB"></div>
            <div class="HighSchool">
              <p>High School</p>
            </div>
            <div class="University">
              <p>University</p>
            </div>

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
              <p>GPAX:</p>
            </div>

            <div class='to_school'>
            <p>to</p>
            </div>

            <div class='to_university'>
            <p>to</p>
            </div>

          <div class='textbox_Study'>
          <div class='highschoolname'><input type="text" name="highschoolname" value={formData.highschoolname} onChange={handleChange} className='textbox_highschoolname'/></div>
            <div class='highschoolstart'><input type="text" name="highschoolstart" value={formData.highschoolstart} onChange={handleChange} /></div>
            <div class='highschoolprogram'><input type="text" name="highschoolprogram" value={formData.highschoolprogram} onChange={handleChange} /></div>
            <div class='highschoolgpx'><input type="text" name="highschoolgpx" value={formData.highschoolgpx} onChange={handleChange} /></div>
          </div>
          <div class='universityname'><input type="text" name="universityname" value={formData.universityname} onChange={handleChange} className='textbox_universityname'/></div>
          <div class='text_box_universitygpax'>
          <div class='universitygpax'><input type="text" name="universitygpax" value={formData.universitygpax} onChange={handleChange} /></div>
          </div>
          <div class='textbox_highschoolstop'>
          <div class='highschoolstop'><input type="text" name="highschoolstop" value={formData.highschoolstop} onChange={handleChange} /></div>
          </div>
          
          <input type="text" name="universitymajor" value={formData.universitymajor} onChange={handleChange} className="textbox_universitymajor"/>
            
          <div className="textbox_universitystart">
          <div class='universitystart'><input type="text" name="universitystart" value={formData.universitystart} onChange={handleChange} /></div>
          </div>

          <div className="textbox_universitystop">
          <div class='universitystop'><input type="text" name="universitystop" value={formData.universitystop} onChange={handleChange} /></div>
          </div>
        </div>
      </div>
      <main>
      </main>
    </div>
  );
}

export default Edit_StudyBackground;