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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); 

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
    setImage(file);
    setPreview(URL.createObjectURL(file)); 
  };

  const handleBackClick = () => {
    navigate("/Project");
  };

  const insertProject = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("student_id", student_id);
    formData.append("project_name", projectName);
    formData.append("project_year", year);
    formData.append("course_id", course);
    formData.append("description", description);
    formData.append("file", image);

    try {
      const response = await Axios.post("http://localhost:3001/insertProjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/Project");
    } catch (error) {
      console.error("Error uploading project:", error);
    }
  };

  return (
    <div>
      <div className="header">
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <h1>Insert Project</h1>
      </div>
      <div className="project-edit-box">
        <img src={Cross} className="cross2" onClick={handleBackClick} alt="Back" />
        <div>
          <div className="container">
            <br />
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
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter project description"
            />
            <br />

            <label>Image :</label>
            <form onSubmit={insertProject}>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              {preview && (
                <div className="preview">
                  <img src={preview} alt="Project" />
                </div>
              )}
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInsert;
