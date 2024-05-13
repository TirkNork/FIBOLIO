import React from "react";

function Coursecard(props) {
    return (
        <div className="coursecard">
            <div className="left-content">
                <p className="secondtext"><b>Course ID:</b> {props.courseid}</p>
                <p className="secondtext"><b>Course Name:</b> {props.coursename}</p>
            </div>
            <div className="right-content">
                <p className="gradetext"><b>Grade:</b> {props.grade}</p>
            </div>
        </div>
    );
}

export default Coursecard;
