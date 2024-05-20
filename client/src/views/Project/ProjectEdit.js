import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cross from "../../assets/images/cancel.png";

function ProjectEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({
    project_id: '',
    project_name: '',
    project_year: '',
    course_id: '',
    description: '',
    img_path: ''
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProject();
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setProject({ ...project, img_path: URL.createObjectURL(event.target.files[0]) });
  };

  const handleProjectNameChange = (event) => {
    setProject({ ...project, project_name: event.target.value });
  };

  const handleYearChange = (event) => {
    setProject({ ...project, project_year: event.target.value });
  };

  const handleCourseChange = (event) => {
    setProject({ ...project, course_id: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setProject({ ...project, description: event.target.value });
  };

  const getProject = () => {
    Axios.get(`http://localhost:3001/projects/${id}`).then((response) => {
      setProject({
        ...project,
        project_id: response.data[0].project_id,
        project_name: response.data[0].project_name,
        project_year: response.data[0].project_year,
        course_id: response.data[0].course_id,
        description: response.data[0].description,
        img_path: response.data[0].img_path
      });
      console.log(response.data);
    });
  };

  const validateInputs = () => {
    let errors = {};
  
    if (!String(project.project_name).trim()) {
      errors.projectName = "Project name is required.";
    }
    if (!String(project.project_year).trim()) {
      errors.projectYear = "Year is required.";
    }
    if (!String(project.course_id).trim()) {
      errors.courseId = "Course is required.";
    }
    if (!String(project.description).trim()) {
      errors.description = "Description is required.";
    }
  
    return errors;
  };

  const updateProject = (event) => {
    event.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("project_name", project.project_name);
    formData.append("project_year", project.project_year);
    formData.append("course_id", project.course_id);
    formData.append("description", project.description);
    formData.append("file", image);

    Axios.put(`http://localhost:3001/updateProject/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate("/Project");
      })
      .catch((error) => {
        console.error("There was an error updating the project!", error);
      });
  };

  const handleBackClick = () => {
    navigate("/Project");
  };

  return (
    <div>
      <div className="header">
        <h1>Edit</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/Project'>Project</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>Edit Project</b> </p>
                    </li>
                </ul>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        ></link>
      </div>
      <div className="project-edit-box">
        <img src={Cross} className="cross2" onClick={handleBackClick} />
        {project && (
          <form onSubmit={updateProject}>
            <label>Project :</label>
            <input
              type="text"
              value={project.project_name || ""}
              onChange={handleProjectNameChange}
            />
            {errors.projectName && <p className="error">{errors.projectName}</p>}
            <br />

            <label>Year :</label>
            <input
              type="text"
              value={project.project_year || ""}
              onChange={handleYearChange}
            />
            {errors.projectYear && <p className="error">{errors.projectYear}</p>}
            <br />

            <label>Course :</label>
            <input
              type="text"
              value={project.course_id || ""}
              onChange={handleCourseChange}
            />
            {errors.courseId && <p className="error">{errors.courseId}</p>}
            <br />

            <label>Description :</label>
            <textarea
              value={project.description || ""}
              onChange={handleDescriptionChange}
            ></textarea>
            {errors.description && <p className="error">{errors.description}</p>}
            <br />

            <label>Image :</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br />
            <div className="preview">
              <img src={project.img_path || ""} alt="Project Preview" />
            </div>
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProjectEdit;
