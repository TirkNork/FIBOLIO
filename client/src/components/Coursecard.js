import React from "react";

function Coursecard(props) {
    return (
        <div className="coursecard">
            <div className="left-content">
                <p className="course-info">
                    <span className="course-id">{props.courseid}</span>
                    <span className="academic-year">{props.academicYear}</span>
                </p>
                <p className="course-name">{props.coursename}</p>
            </div>
            <div className="right-content">
                <p className="gradetext">{props.grade}</p>
            </div>
        </div>
    );
}

export default Coursecard;
