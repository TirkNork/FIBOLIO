import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Project.css";
import Cross from "../../image/cancel.png";

function ProjectInsert() {
  const navigate = useNavigate();

  const [student_id, setStudent_id] = useState("1");
  const [year, setYear] = useState("");
  const [projectName, setProjectName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvcG1nsUDOWhx_UppNTrHoHTRtfEVmsnLJyi6MYJXbNw&s"
  );

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleBackClick = () => {
    navigate("/Project");
};

  const insertProject = () => {
    Axios.post("http://localhost:3001/insertProjects", {
      student_id: student_id,
      project_name: projectName,
      project_year: year,
      course_id: course,
      description: description,
      img_path: image,
    });
    navigate("/Project");
  };

  return (
    <div>
      <div className="header">
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <h1>Insert Project</h1>
      </div>
      <div className="project-edit-box">
      <img src={Cross} className="cross2" onClick={handleBackClick}/>
        <div >
          <div className="container">
            <label>Project :</label>
            <input
              type="text"
              value={projectName}
              onChange={handleProjectNameChange}
              placeholder="Enter project name"
            />
            <br />

            <label>Year :</label>
            <input
              type="text"
              value={year}
              onChange={handleYearChange}
              placeholder="Enter year of project"
            />
            <br />

            <label>Course :</label>
            <input
              type="text"
              value={course}
              onChange={handleCourseChange}
              placeholder="Enter course"
            />
            <br />

            <label>Description :</label>
            <textarea
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter project description"
            />
            <br />
            
            <label>Image :</label>
            <form>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              {image && (
                <div className="preview">
                  <img src={image} alt="Project" />
                </div>
              )}
              <button onClick={insertProject}>Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInsert;
