import React from "react";
import { useNavigate } from "react-router-dom";
import WidecardProject from "../../components/WidecardProfect";
import "./Project.css";

function Project() {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/project/${id}`);
    };

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

    const handleInsertClick = () => {
        navigate("/ProjectInsert");
    };

    return (
        <div>
            <div className="header">
                <h1>Project</h1>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="row">
                        {mockData.map((val, key) => (
                            <div key={key} onClick={() => handleClick(val.id)}>
                                <WidecardProject
                                    year={val.year}
                                    project={val.project}
                                    course={val.course}
                                    des={val.des}
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
