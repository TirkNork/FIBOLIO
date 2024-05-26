import React from "react";
import "./CoursecardTeacher.css";
import { useNavigate } from "react-router-dom";

function Coursecard({id, courseid, coursename, grade, academicYear, professorname, coursekey }) {
    const navigate = useNavigate();

    const goToProjectDetail = (coursekey) => {
        navigate(`/CourseTeacher/${coursekey}`);
    };


    return (
        <div className="coursecard" onClick={() => goToProjectDetail(coursekey)}>
            <div className="coursecard-element" >
                <h2 className="coursecard-course-id">{courseid}</h2>
                <p className="coursecard-course-name">{coursename}</p>
                <p className="coursecard-academic-year">{academicYear}</p>
            </div>
        </div>
    );
}

export default Coursecard;
