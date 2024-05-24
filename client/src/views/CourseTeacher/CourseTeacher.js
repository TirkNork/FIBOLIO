import * as React from 'react';
import { useState, useEffect } from "react";
import './CourseTeacher.css';
import Axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import Search from "../../components/Search.js";


let a = 0
let bPlus = 0
let b = 0
let cPlus = 0
let c = 0
let dPlus = 0
let d = 0
let f = 0

function CourseTeacher() {
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [studentsData, setStudentsData] = useState([]);


    const navigate = useNavigate();

    const goToCourseEdit = () => {
        navigate(`/CourseEdit/${id}`);
    };

    const delayedSearch = debounce((value) => {
        setSearchTerm(value);
    }, 30);

    const handleSearch = (event) => {
        delayedSearch(event.target.value);
    };

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };

    const sortProjectList = () => {
        let sortedList = [...studentsData];
        switch (sortBy) {
            case "studentNameAZ":
                sortedList.sort((a, b) => a.student_firstname.localeCompare(b.student_firstname));
                break;
            case "studentNameZA":
                sortedList.sort((a, b) => b.student_firstname.localeCompare(a.student_firstname));
                break;
            case "idDescending":
                sortedList.sort((a, b) => b.student_id - a.student_id);
                break;
            case "idAscending":
                sortedList.sort((a, b) => a.student_id - b.student_id);
                break;
            default:
                break;
        }
        return sortedList;
    };



    useEffect(() => {

        getStudentsData();
        console.log('Get Data');
    }, []);

    useEffect(() => {

        countStudentGrade();
        console.log('Count grade');
    }, [studentsData]);

    const getStudentsData = () => {
        Axios.get(`http://localhost:3001/students/${id}`).then((response) => {
            console.log(response.data)
            setStudentsData(response.data)
        });
    };

    const countStudentGrade = () => {
        a = 0;
        bPlus = 0;
        b = 0;
        cPlus = 0;
        c = 0;
        dPlus = 0;
        d = 0;
        f = 0;
        for (let i = 0; i < studentsData.length; i++) {
            let grade = studentsData[i].course_student_grade
            if (grade === 'A') { a += 1; }
            else if (grade === 'B+') { bPlus += 1; }
            else if (grade === 'B') { b += 1; }
            else if (grade === 'C+') { cPlus += 1; }
            else if (grade === 'C') { c += 1; }
            else if (grade === 'D+') { dPlus += 1; }
            else if (grade === 'D') { d += 1; }
            else if (grade === 'F') { f += 1; }
        }

    };

    // GradeCalculation(studentsData);

    const showDashboard = () => {
        const pieChart = document.querySelector('.pie-chart');
        if (pieChart.style.display === "none") {
            pieChart.style.display = "block";
        } else {
            pieChart.style.display = "none";
        }
    }

    return (
        <div>
            <div className="header">
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/'>My class</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>{id}</b> </p>
                    </li>
                </ul>
                <p className='subject'>{id}</p>
                <Search searchTerm={searchTerm} handleSearch={handleSearch} />
                <select className="sortby" onClick={(event) => handleSort(event.target.value)}>
                    <option value="">Sort By</option>
                    <option value="studentNameAZ">Student Name A-Z</option>
                    <option value="studentNameZA">Student Name Z-A</option>
                    <option value="idDescending">Student ID Descending</option>
                    <option value="idAscending">Student ID Ascending</option>
                </select>
            </div>
            <div className='student-list'>
                <div className="pie-chart">
                    <PieChart
                        margin={{ bottom: 50 }}
                        series={[
                            {
                                data: [
                                    { label: 'A', value: a, color: '#f28d85' },
                                    { label: 'B+', value: bPlus, color: '#f2bb85' },
                                    { label: 'B', value: b, color: '#dcf285' },
                                    { label: 'C+', value: cPlus, color: '#94f285' },
                                    { label: 'C', value: c, color: '#85f2c1' },
                                    { label: 'D+', value: dPlus, color: '#85def2' },
                                    { label: 'D', value: d, color: '#8595f2' },
                                    { label: 'F', value: f, color: '#ed85f2' }
                                ],
                                cx: 130,
                            },
                        ]}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'bottom', horizontal: 'center' },
                                padding: 0,
                            },
                        }}
                    />
                </div>

                <table className='student-table'>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Score</th>
                        <th>Grade</th>
                    </tr>
                    {sortProjectList().filter((project) =>
                        project.student_firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.student_surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.student_id.toString().includes(searchTerm)
                    ).map((student) => (
                        <tr>
                            <td className='td' >{student.student_firstname} {student.student_surname}</td>
                            <td className='td'>{student.student_id}</td>
                            <td className='td'>{student.course_student_score}</td>
                            <td className='td'>{student.course_student_grade}</td>
                        </tr>

                    ))}
                </table>
            </div>
            <div className="button-container">
                <button className='edit-score' onClick={() => goToCourseEdit()}>Edit</button>
                <button className="show-dashboard" onClick={showDashboard}>dashboard</button>
            </div>
        </div>
    )
}

export default CourseTeacher

