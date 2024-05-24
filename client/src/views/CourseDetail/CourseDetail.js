import React from "react";
import { useParams } from "react-router-dom";
import CourseDetailCard from "../../components/CourseDetailCard/CourseDetailCard";
import "./CourseDetail.css";

const mockData = [
    { id: 1, courseid: "GEN 351", coursename: "Modern Management and Leadership", grade: "A", academicYear: '2/2022', professorname: 'Prof. Williams', classType: "management", credits: 3, fullDescription: "An in-depth look at modern management strategies." },
    { id: 2, courseid: "STA 302", coursename: "Statistics for Engineers", grade: "B", academicYear: '2/2022', professorname: 'Dr. Smith', classType: "statistics", credits: 3, fullDescription: "A comprehensive course on statistical methods." },
    { id: 3, courseid: "MTH 201", coursename: "Calculus II", grade: "C", academicYear: '1/2564', professorname: 'Dr. Jones', classType: "mechanics", credits: 4, fullDescription: "Advanced calculus topics and their applications." },
    { id: 4, courseid: "PHY 301", coursename: "Classical Mechanics", grade: "D", academicYear: '1/2566', professorname: 'Prof. Davis', classType: "mechanics", credits: 4, fullDescription: "Study of classical mechanics principles." }
];

function CourseDetail() {
    const { courseId } = useParams();
    console.log("Course ID from URL:", courseId); // Debug statement
    const course = mockData.find(c => c.id === parseInt(courseId));
    console.log("Course data:", course); // Debug statement

    return (
        <div>
            <div className="header">
                <h1>Course Details</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/Course'>Course</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>Course Details</b> </p>
                    </li>
                </ul>
            </div>
            <div className="course-detail-page">
                {course ? (
                    <CourseDetailCard
                        courseid={course.courseid}
                        coursename={course.coursename}
                        grade={course.grade}
                        academicYear={course.academicYear}
                        professorname={course.professorname}
                        classType={course.classType}
                        credits={course.credits}
                        fullDescription={course.fullDescription}
                    />
                ) : (
                    <p>Course not found</p>
                )}
            </div>
        </div>
    );
}

export default CourseDetail;
