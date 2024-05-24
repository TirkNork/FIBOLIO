import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Search from "../../components/Search.js";
import './CourseEdit.css';

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

function CourseEdit() {
    const subject = 'FRA000'
    const navigate = useNavigate();
    const [score, setScore] = useState({ Score: '' });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");

    const handleScoreChange = (event) => {
        setScore({ ...score, Score: event.target.value });
    };

    const updateScore = () => {
        navigate("/CourseTeacher");
    }

    const backClick = () => {
        navigate("/CourseTeacher");
    }

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
                <table className='student-table student-table-edit'>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Score</th>
                        <th>New score</th>
                    </tr>
                    {sortProjectList().filter((project) =>
                        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.id.toString().includes(searchTerm)
                    ).map((val) => (
                        <tr>
                            <td className='td' >{val.name}</td>
                            <td className='td'>{val.id}</td>
                            <td className='td'>{val.score}</td>
                            <td className='td'><input className="input-new-score" type="number" onChange={handleScoreChange} /></td>
                        </tr>
                    ))}
                </table>
                <button className='cancel' onClick={backClick}>
                    cancel
                </button>
                <button className='save' onClick={updateScore}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CourseEdit;