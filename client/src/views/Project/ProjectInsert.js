import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Project.css";

function ProjectInsert() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [project, setProject] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleProjectChange = (event) => {
    setProject(event.target.value);
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

  const insertProject = () => {
    const formData = new FormData();
    formData.append("year", year);
    formData.append("project", project);
    formData.append("course", course);
    formData.append("description", description);
    formData.append("image", image);

    Axios.post("http://localhost:3001/insertProjects", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        navigate("/Project");
      })
      .catch((error) => {
        console.error("Error inserting project:", error);
      });
  };

  return (
    <div>
      <div className="header">
        <h1>Insert Project</h1>
      </div>
      <div className="project-edit-box">
        <div >
          <div className="container">
            <label>Year:</label>
            <input
              type="text"
              value={year}
              onChange={handleYearChange}
              placeholder="Enter year of project"
            />
            <br />

            <label>Project:</label>
            <input
              type="text"
              value={project}
              onChange={handleProjectChange}
              placeholder="Enter project name"
            />
            <br />

            <label>Course:</label>
            <input
              type="text"
              value={course}
              onChange={handleCourseChange}
              placeholder="Enter course"
            />
            <br />

            <label>Description:</label>
            <textarea
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter project description"
            />
            <br />
            
            <label>Image:</label>
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
