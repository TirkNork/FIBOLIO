import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import WidecardProject from "../../components/WidecardProfect";
import "./Project.css";

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

    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
      getProjectList();
    }, []);
  
    const getProjectList = () => {
      Axios.get("http://localhost:3001/projects").then((response) => {
        setProjectList(response.data);
      });
    };
    
    return (
        <div>
            <div className="header">
                <h1>Project</h1>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="row">
                        {/* {mockData.map((val, key) => (
                            <div key={key} onClick={() => goToProjectDetail(val.id)}>
                                <WidecardProject
                                    year={val.year}
                                    project={val.project}
                                    course={val.course}
                                    des={val.des}
                                />
                            </div>
                        ))} */}
                        {projectList.map((val, key) => (
                            <div key={key} onClick={() => goToProjectDetail(val.project_id)}>
                                <WidecardProject
                                    year={val.project_year}
                                    project={val.project_name}
                                    course={val.course_id}
                                    des={val.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="button" onClick={handleInsertClick}>Insert Project</button>
            </div>
        </div>
    );
}

export default Project;
