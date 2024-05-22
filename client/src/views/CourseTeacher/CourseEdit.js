import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../../components/Search.js";
import './CourseEdit.css';

function CourseEdit() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [studentsData, setStudentsData] = useState([]);
    const [new_score, setNew_score] = useState([]);
    const [score, setScore] = useState([]);
    

    const handleScoreChange = (event, index) => {
        const {name, value} = event.target;
        console.log('current index : ' + index);
        console.log('current value : ' + parseInt(value));
        // console.log('student score changed : ' + new_score[index].student_id);

        // setNew_score({...newscore, score : event.target.value});
        const arrayy = [];
        setNew_score((prevScore) => { 
            const studentID_score_changed = new_score[index].student_id
            // const index_changed = prevScore.findIndex(new_score => new_score.course_student_score !== studentId);
            return prevScore.map((newscore) => {
                if (newscore.student_id !== studentID_score_changed) return newscore;
                return {...newscore, course_student_score : parseInt(value)};
            })
        });
        
        // console.log('score update : ',new_score);

    };

    useEffect(() => {
        getStudentsData();

    }, [id]); 

    useEffect(() => {
        console.log('last Score changed ' , new_score);
    }, [new_score]);


    const getStudentsData = () => {
        Axios.get(`http://localhost:3001/students/${id}`).then((response) => {
        // console.log(response.data)
        setStudentsData(response.data);
        setNew_score(response.data);
    });
        
    };

    
    const updateStudentsScore = () => {
        console.log('New scores before sending:', new_score);
    
        Axios.post(`http://localhost:3001/updateScore/${id}`, new_score)
            .then((response) => {
                console.log('Response:', response.data);
                navigate(`/CourseTeacher/${id}`);
            })
            .catch((error) => {
                console.error("There was an error updating the project!", error);
            });
    };
    
    const backClick = () => {
        navigate(`/CourseTeacher/${id}`);
    }
    
    return (
        <div>
            <div className="header">
                <p className='subject' style={{ marginTop: "20px" }} >{id}</p>
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
                            <td className='td' >{student.student_firstname} {student.student_lastname}</td>
                            <td className='td'>{student.student_id}</td>
                            <td className='td'>{student.course_student_score}</td>
                            <td className='td'>
                                <input 
                                    className="input-new-score" 
                                    type="number" 
                                    onChange={(event) => handleScoreChange(event, index)} 
                                />
                            </td>
                        </tr>
                    ))}
                </table>
                <button className='cancel' onClick={() => backClick(id)}>
                    cancel
                </button>
                <button className='save' onClick={() => updateStudentsScore()}>
                    save
                </button>
            </div>
        </div>
    )
}

export default CourseEdit;