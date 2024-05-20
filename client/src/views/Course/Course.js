import React, { useState } from "react";
import Coursecard from "../../components/Coursecard";
import "./Course.css";

const mockData = [
    { id: 1, courseid: "FRA001", coursename: "Introduction to Programming", grade: "A", academicYear: '1/2565' },
    { id: 2, courseid: "FRA002", coursename: "Data Structures and Algorithms", grade: "B+", academicYear: '1/2563' },
    { id: 3, courseid: "FRA003", coursename: "Database Management Systems", grade: "C", academicYear: '2/2563' },
    { id: 4, courseid: "FRA004", coursename: "Web Development", grade: "D+", academicYear: '2/2563' },
    { id: 5, courseid: "FRA005", coursename: "Computer Networks", grade: "F", academicYear: '1/2564' },
    { id: 6, courseid: "FRA006", coursename: "Software Engineering", grade: "A", academicYear: '1/2564' },
    { id: 7, courseid: "FRA007", coursename: "Machine Learning", grade: "B", academicYear: '1/2564' },
    { id: 8, courseid: "FRA008", coursename: "Operating Systems", grade: "C+", academicYear: '1/2564' },
    { id: 9, courseid: "FRA009", coursename: "Cybersecurity", grade: "D", academicYear: '1/2564' },
    { id: 10, courseid: "FRA010", coursename: "Mobile App Development", grade: "F", academicYear: '1/2564' },
];

const academicYears = ['1/2563', '2/2563', '1/2564', '2/2564', '1/2565', '2/2565', '1/2566', '2/2566'];
const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];

function Course() {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [sortByYear, setSortByYear] = useState(true); // Default sort by academic year
    const [sortByGradeAsc, setSortByGradeAsc] = useState(true); // Default sort by grade ascending

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
    };

    const handleSortByYear = () => {
        setSortByYear(!sortByYear);
    };

    const handleSortByGrade = () => {
        setSortByGradeAsc(!sortByGradeAsc);
    };

    const sortedData = [...mockData].sort((a, b) => {
        if (sortByYear) {
            const compareYear = academicYears.indexOf(a.academicYear) - academicYears.indexOf(b.academicYear);
            if (compareYear !== 0) return sortByYear ? compareYear : -compareYear;
        } 
        if (sortByGradeAsc) {
            const compareGrade = grades.indexOf(a.grade) - grades.indexOf(b.grade);
            if (compareGrade !== 0) return sortByGradeAsc ? compareGrade : -compareGrade;
        }
        return 0;
    });

    const filteredData = sortedData.filter(data => {
        return (
            (selectedYear === '' || data.academicYear === selectedYear) &&
            (selectedGrade === '' || data.grade === selectedGrade)
        );
    });

    return (
        <div>
            <div className="header">
                <h1>Course Overview</h1>
            </div>
            <div className="header2">
                <div className="dropdown-label">Sort by:</div>
                <button className="sort-button" onClick={handleSortByYear}>
                    {sortByYear ? 'Newest to Oldest' : 'Oldest to Newest'} (Year)
                </button>
                <button className="sort-button" onClick={handleSortByGrade}>
                    {sortByGradeAsc ? 'Good to Bad' : 'Bad to Good'} (Grade)
                </button>
                <select className="dropdown-menu" value={selectedYear} onChange={handleYearChange}>
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year, index) => (
                        <option value={year} key={index}>{year}</option>
                    ))}
                </select>
                <select className="dropdown-menu" value={selectedGrade} onChange={handleGradeChange}>
                    <option value="">Select Grade</option>
                    {grades.map((grade, index) => (
                        <option value={grade} key={index}>{grade}</option>
                    ))}
                </select>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="grid-container">
                        {filteredData.map((val, key) => (
                            <Coursecard
                                key={key}
                                courseid={val.courseid}
                                coursename={val.coursename}
                                grade={val.grade}
                                academicYear={val.academicYear} // Pass academic year to Coursecard
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Course;
