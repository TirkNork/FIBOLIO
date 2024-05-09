import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import WidecardProject from "../../components/WidecardProject";
import "./Project.css";
import Dot from "../../image/icons8-more-50.png"

const mockData = [
    {
        id: 1,
        year: 2020,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
    },
    {
        id: 2,
        year: 2021,
        project: "NUDA",
        course: "FRA000",
        des: "An adjustable automatic massage pillow that is portable and works with all body types.",
    }
];

function Project() {
    const navigate = useNavigate();

    const goToProjectDetail = (id) => {
        navigate(`/Project/${id}`);
    };

    const handleInsertClick = () => {
        navigate("/ProjectInsert");
    };

    const goToProjectEdit = (id) => {
        navigate(`/Project/Edit/${id}`);
    };

    const [projectList, setProjectList] = useState([]);

    // useEffect(() => {
    //   getProjectList();
    // }, []);

    // const getProjectList = () => {
    //   Axios.get("http://localhost:3001/projects").then((response) => {
    //     setProjectList(response.data);
    //   });
    // };

    return (
        <div>
            <div className="header">
                <h1>Project</h1>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="row">
                        {mockData.map((val, key) => (
                            <div className="project-container">
    <div className="project-details" onClick={() => goToProjectDetail(val.id)}>
        <WidecardProject
            year={val.year}
            project={val.project}
            course={val.course}
            des={val.des}
        />
    </div>
    <div className="dot-icon-container">
        <img src={Dot} alt="More Options" className="dot-icon" />
        <div className="more-options">
            <div className="dropdown">
                <button onClick={() => goToProjectEdit(val.id)}>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </div>
</div>
                        ))}
                        {/* {projectList.map((val, key) => (
                            <div key={key} onClick={() => goToProjectDetail(val.project_id)}>
                                <WidecardProject
                                    year={val.project_year}
                                    project={val.project_name}
                                    course={val.course_id}
                                    des={val.description}
                                />
                            </div>
                        ))} */}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px" }}>
                    <button className="button-orange" onClick={handleInsertClick}>Insert</button>
                </div>
            </div>
            
        </div>
    );
}

export default Project;