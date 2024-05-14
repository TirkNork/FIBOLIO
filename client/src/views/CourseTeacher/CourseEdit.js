import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Search from "../../components/Search.js";
import './CourseEdit.css';

let studentData = [
    {
        name: 'aaa bbb',
        id: 1,
        score: 90
    },
    {
        name: 'ccc ddd',
        id: 2,
        score: 55
    },
    {
        name: 'eee fff',
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

    const handleScoreChange = (event) => {
        setScore({ ...score, Score: event.target.value });
    };

    const updateScore = () => {
        navigate("/CourseTeacher");
    }

    const backClick = () => {
        navigate("/CourseTeacher");
    }

    return (
        <div>
            <div className="header">
                <p className='subject' style={{ marginTop: "20px" }} >{subject}</p>
                <Search />
            </div>
            <div className='student-list'>
                <table className='student-table'>
                    <tr>
                        <th className='tr'>Name</th>
                        <th className='tr'>ID</th>
                        <th className='tr'>Score</th>
                        <th className='tr'>New score</th>
                    </tr>
                    {studentData.map((val) => (
                        <tr>
                            <td className='td' >{val.name}</td>
                            <td className='td'>{val.id}</td>
                            <td className='td'>{val.score}</td>
                            <td className='td'>
                                <input className="input-new-score" type="number" onChange={handleScoreChange} />
                            </td>
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