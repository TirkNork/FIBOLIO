import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
// const mockData = [
//     {
//         id: 1,
//         year: 2020,
//         project: "NUDA",
//         course: "FRA000",
//         des: "An adjustable automatic massage pillow that is portable and works with all body types.",
//         image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png"
//     },
//     {
//         id: 2,
//         year: 2021,
//         project: "NUDA",
//         course: "FRA000",
//         des: "An adjustable automatic massage pillow that is portable and works with all body types.",
//         image: "https://www.care.com/c/wp-content/uploads/sites/2/2023/09/liz.alterman-202114020614247215.jpg"
//     }
// ];

function ProjectDetails() {
  const { id } = useParams();
  // const data = mockData.find(item => item.id === parseInt(id));

  const [project, setProject] = useState([]);

  useEffect(() => {
    getProject();
  }, []);

  const getProject = () => {
    Axios.get(`http://localhost:3001/projects/${id}`).then((response) => {
      setProject(response.data);
    });
  };

  return (
    <div>
      <div className="header">
        <h1>Project Details</h1>
      </div>
      {/* {data && (
        <div>
          <p>Year: {data.year}</p>
          <p>Project: {data.project}</p>
          <p>Course: {data.course}</p>
          <p>Description: {data.des}</p>
          <img src={data.image} />
        </div>
      )} */}
      {project.map((val, key) => (
        <div key={key}>
          <p>Year:{val.project_year} </p>
          <p>Project: {val.project_name}</p>
          <p>Course: {val.course_id}</p>
          <p>Description: {val.description}</p>
          <img src={val.img_path} />
        </div>
      ))}
    </div>
  );
}

export default ProjectDetails;
