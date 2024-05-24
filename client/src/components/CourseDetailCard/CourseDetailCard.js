import React from "react";
import "./CourseDetailCard.css";

function CourseDetailCard({ courseid, coursename, grade, academicYear, professorname, classType, credits, fullDescription }) {
    return (
        <div className="course-detail-card">
            <div className="course-detail-left">
                <h2 className="course-detail-course-id">{courseid}</h2>
                <p className="course-detail-course-name">{coursename}</p>
                <p className="course-detail-class-type"><strong>Class Type:</strong> {classType}</p>
                <p className="course-detail-professor"><strong>Professor:</strong> {professorname}</p>
                <p className="course-detail-credits"><strong>Credits:</strong> {credits}</p>
                <p className="course-detail-academic-year"><strong>Academic Year:</strong> {academicYear}</p>
            </div>
            <div className="course-detail-right">
                <p className="course-detail-grade"><strong>Grade:</strong> {grade}</p>
                <p className="course-detail-description"><strong>Description:</strong> {fullDescription}</p>
            </div>
        </div>
    );
}

export default CourseDetailCard;
