import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Coursecard from "../../components/Coursecard";
import "./Course.css";

const mockData = [
    { id: 1, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '1/2563' },
    { id: 2, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '1/2563' },
    { id: 3, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2563' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2563' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2563' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2563' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '1/2564' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2564' },
    { id: 4, courseid: "FRA000", coursename: "webdev", grade: "F", academicYear: '2/2563' },
    // Add mock data for other academic years
];

const academicYears = ['1/2563', '2/2563', '1/2564', '2/2564', '1/2565', '2/2565', '1/2566', '2/2566']; 

function Course() {
    const navigate = useNavigate();
    const [selectedYear, setSelectedYear] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const goToProjectDetail = (id) => {
        navigate(`/Project/${id}`);
    };

    const handleInsertClick = () => {
        navigate("/ProjectInsert");
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        // Additional logic for handling selected year
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dot-icon-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="header">
                <h1>Course</h1>
                <select className="dropdown-menu" value={selectedYear} onChange={handleYearChange}>
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year, index) => (
                        <option value={year} key={index}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="other-page">
                <div className="data-table">
                    <div className="row">
                        <div className="grid-container">
                            {selectedYear !== '' && mockData
                                .filter(data => data.academicYear === selectedYear)
                                .map((val, key) => (
                                    <Coursecard key={key} courseid={val.courseid} coursename={val.coursename} grade={val.grade} goToProjectDetail={goToProjectDetail} />
                                ))}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right", marginBottom: "20px", marginRight: "20px" }}>
                    <button className="button-orange" onClick={handleInsertClick}>Insert</button>
                </div>
            </div>
        </div>
    );
}

export default Course;
