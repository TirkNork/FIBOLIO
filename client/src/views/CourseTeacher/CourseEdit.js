import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search.js";
import { useLocation } from 'react-router-dom';
import './CourseEdit.css';

function CourseEdit() {
    const subject = 'FRA000'
    const navigate = useNavigate();
    const location = useLocation();
    let new_score_array = [];

    const [new_score, setNew_score] = useState({index : null, score : null});
    const [studentsData, setStudentsData] = useState([]);
    
    const handleScoreChange = (event, index) => {
      
        setNew_score({ ...new_score, index : index,score: event.target.value });
        // new_score.splice(index, 0, { ...new_score[index], score: event.target.value });

        console.log('length : ',new_score.length)
        console.log('score update : ',new_score);

    };

  


    const create_null_new_score = () => {
        let newObjects = [];
        for (let i = 0; i < studentsData.length; i++) {
            new_score_array.push({ index : i, score : null });
            newObjects.push({ index : i, score : null });
        }
        setNew_score(newObjects);
        console.log('new_score_array : ', new_score_array)
    };

    const getStudentsData = () => {
        Axios.get("http://localhost:3001/students").then((response) => {
        // console.log(response.data)
        setStudentsData(response.data)});
    };

    useEffect(() => {
        getStudentsData();
        create_null_new_score();
        console.log(studentsData);
    }, []);

    const updateStudentsScore = () => {
        // const update_student_score = [...setStudentsData];
        // update_student_score[new_score.index] = {...update_student_score[new_score.index], 
        //     score : new_score.score
        // }
        // console.log(update_student_score[new_score.index])
        // setStudentsData(update_student_score);

        // setStudentsData({ ...studentsData, score: new_score.score });

        // Update New Score to Database
        // Axios.post(`http://localhost:3001/updateScore`, {
        //     first_name: studentsData.first_name,
        //     last_name: studentsData.last_name,
        //     student_id: studentsData.student_id,
        //     score: studentsData.score
        // })
        console.log('New score : ',new_score)
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
                    {studentsData.map((student, index) => (
                        <tr>
                            <td className='td' >{student.first_name} {student.last_name}</td>
                            <td className='td'>{student.student_id}</td>
                            <td className='td'>{student.course_student_score}</td>
                            <td className='td'>
                                <input className="input-new-score" type="number" onChange={(event) => handleScoreChange(event, index)} />
                            </td>
                        </tr>
                    ))}
                </table>
                <button className='cancel' onClick={backClick}>
                    cancel
                </button>
                <button className='save' onClick={updateStudentsScore}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CourseEdit;