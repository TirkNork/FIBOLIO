import React, { useState } from "react";
import Coursecard from "../../components/Coursecard/Coursecard";
import Dropdown from "../../components/Coursedropdown/Coursedropdown";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./Course.css";

const mockData = [
    { id: 1, courseid: "GEN 351", coursename: "Modern Management and Leadership", grade: "A", academicYear: '2/2022', professorname: 'Prof. Williams', classType: "management" },
    { id: 2, courseid: "STA 302", coursename: "Statistics for Engineers", grade: "B", academicYear: '2/2022', professorname: 'Dr. Smith', classType: "statistics" },
    { id: 3, courseid: "MTH 201", coursename: "Calculus II", grade: "C", academicYear: '1/2564', professorname: 'Dr. Jones', classType: "mechanics" },
    { id: 4, courseid: "PHY 301", coursename: "Classical Mechanics", grade: "D", academicYear: '1/2566', professorname: 'Prof. Davis', classType: "mechanics" }
];

const academicYears = ['1/2563', '2/2563', '1/2564', '2/2564', '1/2565', '2/2565', '1/2566', '2/2566'];
const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

function Course() {
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortType, setSortType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSortToggle = (value) => {
        const [type, order] = value.split('-');
        setSortType(type);
        setSortOrder(order);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const sortData = (data) => {
        return data.sort((a, b) => {
            if (sortType === 'year') {
                const yearComparison = academicYears.indexOf(a.academicYear) - academicYears.indexOf(b.academicYear);
                return sortOrder === 'asc' ? yearComparison : -yearComparison;
            } else if (sortType === 'grade') {
                const gradeComparison = grades.indexOf(a.grade) - grades.indexOf(b.grade);
                return sortOrder === 'asc' ? gradeComparison : -gradeComparison;
            } else if (sortType === 'classType') {
                const classComparison = a.classType.localeCompare(b.classType);
                return sortOrder === 'asc' ? classComparison : -classComparison;
            }
            return 0;
        });
    };

    const filteredData = mockData.filter(course => 
        course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = sortData(filteredData);

    return (
        <div>
            <div className="header">
                <h1>Course</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/Course'>Course/</a>
                    </li>
                </ul>
                <Dropdown handleSortToggle={handleSortToggle} sortType={sortType} sortOrder={sortOrder} />
                <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
            </div>
            <div className="other-page">
                <div className="grid-container">
                    {sortedData.map((val, key) => (
                        <Coursecard
                            key={key}
                            id={val.id}
                            courseid={val.courseid}
                            coursename={val.coursename}
                            grade={val.grade}
                            academicYear={val.academicYear}
                            professorname={val.professorname}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Course;
