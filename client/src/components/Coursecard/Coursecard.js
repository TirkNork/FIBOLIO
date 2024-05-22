import React from "react";
import "./Coursecard.css";

function Coursecard({ courseid, coursename, grade, academicYear, professorname }) {
    return (
        <div className="coursecard">
            <div className="coursecard-left">
                <h2 className="coursecard-course-id">{courseid}</h2>
                <p className="coursecard-course-name">{coursename}</p>
                <p className="coursecard-professor">{professorname}</p>
            </div>
            <div className="coursecard-right">
                <p className="coursecard-grade">{grade}</p>
                <p className="coursecard-academic-year">{academicYear}</p>
            </div>
        </div>
    );
}

export default Coursecard;
