import React from "react";
import { useNavigate } from "react-router-dom";
import "./Coursecard.css";

function Coursecard({ id, courseid, coursename, grade, academicYear, professorname }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${id}`);
    };

    return (
        <div className="coursecard" onClick={handleClick}>
            <div className="coursecard-left">
                <h2 className="coursecard-course-id">{courseid}</h2>
                <p className="coursecard-course-name">{coursename}</p>
                <p className="coursecard-credits">{professorname}</p>
            </div>
            <div className="coursecard-right">
                <p className="coursecard-grade">{grade}</p>
                <p className="coursecard-academic-year">{academicYear}</p>
            </div>
        </div>
    );
}

export default Coursecard;
