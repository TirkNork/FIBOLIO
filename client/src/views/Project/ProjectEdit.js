import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cross from "../../image/cancel.png";

// const mockData = [
//   {
//     id: 1,
//     year: 2020,
//     project: "NUDA",
//     course: "FRA000",
//     des: "An adjustable automatic massage pillow that is portable and works with all body types.",
//     image:
//       "https://miro.medium.com/v2/resize:fit:720/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png",
//   },
//   {
//     id: 2,
//     year: 2021,
//     project: "NUDA",
//     course: "FRA000",
//     des: "An adjustable automatic massage pillow that is portable and works with all body types.",
//     image:
//       "https://www.care.com/c/wp-content/uploads/sites/2/2023/09/liz.alterman-202114020614247215.jpg",
//   },
// ];

function ProjectEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [image, setImage] = useState("");

  console.log(project)
  // useEffect(() => {
  //   const foundProject = mockData.find((item) => item.id === parseInt(id));
  //   if (foundProject) {
  //     setProject(foundProject);
  //     setImage(foundProject.image);
  //   }
  // }, [id]);

  useEffect(() => {
    getProject();
  }, []);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
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
      setProject(response.data);
    });
  };

  const updateProject = () => {
    Axios.put(`http://localhost:3001/updateProject/${id}`, {
      project_name: project.project_name,
      project_year: project.project_year,
      course_id: project.course_id,
      description: project.description,
      img_path: project.img_path
    })
    navigate("/Project")
    console.log(project)
  }
  
  const handleBackClick = () => {
    navigate("/Project");
  };
  
  return (
    <div>
      <div className="header">
        <h1>Edit Project</h1>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
          ></link>
      </div>
      <div className="project-edit-box">
        <img src={Cross} className="cross2" onClick={handleBackClick} />
        {/* {project && (
        <form>
          <label>Year :</label>
          <input type="text" value={project.year} onChange={handleYearChange} />
          <br />

          <label>Project :</label>
          <input type="text" value={project.project} onChange={handleProjectNameChange} />
          <br />

          <label>Course :</label>
          <input type="text" value={project.course} onChange={handleCourseChange} />
          <br />

          <label>Description :</label>
          <textarea value={project.des} onChange={handleDescriptionChange}></textarea>
          <br />

          <label>Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />
          <div className="preview">
          <img src={image} alt="Project" />
          </div>
          <br />

          <button type="submit">Save</button>
        </form>
      )} */}
      {project && (
       <form>
          <label>Project :</label>
          <input
            type="text"
            value={project.project_name || ""}
            onChange={handleProjectNameChange}
          />
          <br />

          <label>Year :</label>
          <input
            type="text"
            value={project.project_year || ""}
            onChange={handleYearChange}
          />
          <br />

          <label>Course :</label>
          <input
            type="text"
            value={project.course_id || ""}
            onChange={handleCourseChange}
          />
          <br />

          <label>Description :</label>
          <textarea
            value={project.description || ""}
            onChange={handleDescriptionChange}
          ></textarea>
          <br />

          <label>Image :</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          <div className="preview">
            <img src={project.img_path || ""}/>
          </div>
          <button onClick={updateProject}>Save</button>
        </form>
      )}
      </div>
    </div>
  );
}

export default ProjectEdit;
