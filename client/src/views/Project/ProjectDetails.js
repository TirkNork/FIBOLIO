import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cross from "../../image/cancel.png";

const mockData = [
    {
        id: 1,
        year: 2020,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
        image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*GI-td9gs8D5OKZd19mAOqA.png"
    },
    {
        id: 2,
        year: 2021,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
        image: "https://www.care.com/c/wp-content/uploads/sites/2/2023/09/liz.alterman-202114020614247215.jpg"
    }
];

function ProjectDetails() {
    const { id } = useParams();
    const data = mockData.find(item => item.id === parseInt(id));
    const [project, setProject] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/Project");
    };

      useEffect(() => {
        getProject();
      }, []);

      const getProject = () => {
        Axios.get(`http://localhost:3001/projects/${id}`).then((response) => {
          setProject(response.data);
        });
      };

    return (
        <div className="backdetail">
            <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
            <div className="header">
                <h1>Project Details</h1>
            </div>
            <div className="project-edit-box-detail">
            {/* <button onClick={handleBackClick}>Back</button> */}
                <img src={Cross} className="cross" onClick={handleBackClick}/>
                {/* {data && (
                    <div>
                        <p className="detail"><b>Year : </b>{data.year}</p>
                        <p className="detail"><b>Project : </b>{data.project}</p>
                        <p className="detail"><b>Course : </b>{data.course}</p>
                        <p className="detail"><b>Description : </b>{data.des}</p>
                        <div className="preview">
                            <img src={data.image} />
                        </div>
                    </div>
                )} */}
                {project.map((val, key) => (
                <div key={key}>
                    <p className="detail"><b>Project : </b>{val.project_name}</p>
                    <p className="detail"><b>Year : </b>{val.project_year}</p>
                    <p className="detail"><b>Course : </b>{val.course_id}</p>
                    <p className="detail"><b>Description : </b>{val.description}</p>
                    <div className="preview">
                        <img src={val.img_path} />
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectDetails;
