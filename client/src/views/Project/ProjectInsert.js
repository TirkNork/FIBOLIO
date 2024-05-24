import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Project.css";
import Cross from "../../assets/images/cancel.png";

const serverIP = 'http://localhost:3001'

function ProjectInsert() {
  const navigate = useNavigate();

  const [student_id, setStudent_id] = useState("63340500001");
  const [year, setYear] = useState("");
  const [projectName, setProjectName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); 
  const [errors, setErrors] = useState({}); 


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

  const validateInputs = () => {
    let errors = {};

    if (!projectName.trim()) {
      errors.projectName = "Project name is required.";
    }
    if (!year.trim()) {
      errors.year = "Year is required.";
    }
    if (!course.trim()) {
      errors.course = "Course is required.";
    }
    if (!description.trim()) {
      errors.description = "Description is required.";
    }
    if (!image) {
      errors.image = "Image is required.";
    }

    return errors;
  };

  const insertProject = async (event) => {
    event.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const formData = new FormData();
    formData.append("student_id", student_id);
    formData.append("project_name", projectName);
    formData.append("project_year", year);
    formData.append("course_id", course);
    formData.append("description", description);
    formData.append("file", image);

    try {
      const response = await Axios.post(`${serverIP}/insertProjects`, formData, {
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
        <h1>Insert</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/Project'>Project</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>Insert Project</b> </p>
                    </li>
                </ul>
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
            {errors.projectName && <p className="error">{errors.projectName}</p>}
            <br />

            <label>Year :</label>
            <input
              type="text"
              value={year}
              onChange={handleYearChange}
              placeholder="Enter year of project"
            />
            {errors.year && <p className="error">{errors.year}</p>}
            <br />

            <label>Course :</label>
            <input
              type="text"
              value={course}
              onChange={handleCourseChange}
              placeholder="Enter course"
            />
            {errors.course && <p className="error">{errors.course}</p>}
            <br />

            <label>Description :</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter project description"
            />
            {errors.description && <p className="error">{errors.description}</p>}
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
              {errors.image && <p className="error">{errors.image}</p>}
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInsert;
