import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const mockData = [
  {
    id: 1,
    year: 2020,
    project: "NUDA",
    course: "FRA000",
    des:
      "An adjustable automatic massage pillow that is portable and works with all body types.",
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png",
  },
  {
    id: 2,
    year: 2021,
    project: "NUDA",
    course: "FRA000",
    des:
      "An adjustable automatic massage pillow that is portable and works with all body types.",
    image:
      "https://www.care.com/c/wp-content/uploads/sites/2/2023/09/liz.alterman-202114020614247215.jpg",
  },
];

function ProjectEdit() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const foundProject = mockData.find((item) => item.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
      setImage(foundProject.image);
    }
  }, [id]);

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleYearChange = (event) => {
    setProject({ ...project, year: event.target.value });
  };

  const handleProjectChange = (event) => {
    setProject({ ...project, project: event.target.value });
  };

  const handleCourseChange = (event) => {
    setProject({ ...project, course: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setProject({ ...project, des: event.target.value });
  };

  return (
    <div>
        <div className="header">
        <h1>Edit Project</h1>
        </div>
    <div className="project-edit-box">
      {project && (
        <form>
          <label>Year:</label>
          <input type="text" value={project.year} onChange={handleYearChange} />
          <br />

          <label>Project:</label>
          <input type="text" value={project.project} onChange={handleProjectChange} />
          <br />

          <label>Course:</label>
          <input type="text" value={project.course} onChange={handleCourseChange} />
          <br />

          <label>Description:</label>
          <textarea value={project.des} onChange={handleDescriptionChange}></textarea>
          <br />

          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <br />
          <img src={image} alt="Project" />
          <br />

          <button type="submit">Save</button>
        </form>
      )}
    </div>
    </div>
  );
}

export default ProjectEdit;
