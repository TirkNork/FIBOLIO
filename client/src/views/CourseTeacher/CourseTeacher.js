import * as React from 'react';
import { useState, useEffect } from "react";
import './CourseTeacher.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Search from "../../components/Search.js";


let studentData = [
    {
        name: 'aaa bbb',
        id: 1,
        score: 90
    },
    {
        name: 'eee fff',
        id: 2,
        score: 55
    },
    {
        name: 'ccc ddd',
        id: 3,
        score: 80
    },
    {
        name: 'ggg hhh',
        id: 4,
        score: 40
    },
    {
        name: 'iii jjj',
        id: 5,
        score: 45
    },
    {
        name: 'kkk lll',
        id: 6,
        score: 60
    }
]

let grade = []

let a = 0
let bPlus = 0
let b = 0
let cPlus = 0
let c = 0
let dPlus = 0
let d = 0
let f = 0

function GradeCalculation() {
    a = 0
    bPlus = 0
    b = 0
    cPlus = 0
    c = 0
    dPlus = 0
    d = 0
    f = 0
    let studentScore = []
    studentData.map((score) => (
        studentScore.push(score.score)
    ))
    studentScore.forEach((score) => {
        if (score > 0 && score <= 54) {
            grade.push('F');
            f += 1;
        }
        else if (score >= 55 && score <= 59) {
            grade.push('D');
            d += 1;
        }
        else if (score >= 60 && score <= 64) {
            grade.push('D+');
            dPlus += 1
        }
        else if (score >= 65 && score <= 69) {
            grade.push('C');
            c += 1;
        }
        else if (score >= 70 && score <= 74) {
            grade.push('c+');
            cPlus += 1
        }
        else if (score >= 75 && score <= 79) {
            grade.push('B');
            b += 1;
        }
        else if (score >= 80 && score <= 84) {
            grade.push('B+');
            bPlus += 1
        }
        else if (score >= 85 && score <= 100) {
            grade.push('A');
            a += 1;
        }
    });

    for (let i = 0; i < studentData.length; i++) {
        studentData[i].grade = grade[i];
    }
}

function CourseTeacher() {
    const subject = 'FRA000'
    GradeCalculation();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");

    const navigate = useNavigate();

    const goToCourseEdit = () => {
        navigate("/CourseEdit");
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
        let sortedList = [...studentData];
        switch (sortBy) {
            case "studentNameAZ":
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "studentNameZA":
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "idDescending":
                sortedList.sort((a, b) => b.id - a.id);
                break;
            case "idAscending":
                sortedList.sort((a, b) => a.id - b.id);
                break;
            default:
                break;
        }
        return sortedList;
    };

    return (
        <div>
            <div className="header">
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/'>My class</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>{subject}</b> </p>
                    </li>
                </ul>
                <p className='subject'>{subject}</p>
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
                            },
                        ]}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: { vertical: 'bottom', horizontal: 'left' },
                                padding: 0,
                            },
                        }}
                    />
                </div>
                <table className='student-table'>
                    <tr>
                        <th className='tr'>Name</th>
                        <th className='tr'>ID</th>
                        <th className='tr'>Score</th>
                        <th className='tr'>Grade</th>
                    </tr>
                    {sortProjectList().filter((project) =>
                        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.id.toString().includes(searchTerm)
                    ).map((val) => (
                        <tr>
                            <td className='td' >{val.name}</td>
                            <td className='td'>{val.id}</td>
                            <td className='td'>{val.score}</td>
                            <td className='td'>{val.grade}</td>
                        </tr>
                        
                    ))}
                </table>
                <button className='edit-score' onClick={goToCourseEdit}>
                    Edit
                </button>

            </div>
        </div>
    )
}

export default CourseTeacher

