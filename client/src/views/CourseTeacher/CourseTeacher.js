import './CourseTeacher.css';
import Search from "../../components/Search.js";
import * as React from 'react';
import Axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react"



let grade = []

let a = 0
let bPlus = 0
let b = 0
let cPlus = 0
let c = 0
let dPlus = 0
let d = 0
let f = 0

function GradeCalculation(studentsData) {
    a = 0
    bPlus = 0
    b = 0
    cPlus = 0
    c = 0
    dPlus = 0
    d = 0
    f = 0
    let studentScore = []
    studentsData.map((score) => (
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

    for (let i = 0; i < studentsData.length; i++) {
        studentsData[i].grade = grade[i];
    }

    return studentsData
}

function CourseTeacher() {
    const {id} = useParams();

    const navigate = useNavigate();

    const goToCourseEdit = () => {
        console.log('navigate used')
        navigate(`/CourseEdit/${id}`);
    };

    const [studentsData, setStudentsData] = useState([]);


    useEffect(() => {

        getStudentsData();
        console.log('Get Data');
    }, []);

    const getStudentsData = () => {
        Axios.get(`http://localhost:3001/students/${id}`).then((response) => {
        console.log(response.data)
        setStudentsData(response.data)});
    };

    // const addGradeUsersData = () => {
    //     setGradestudentsData(GradeCalculation(studentsData));
    // };

    GradeCalculation(studentsData);

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
                <Search/>
            </div>
            <div className='student-list'>
                <div className="pie-chart">
                    <PieChart
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
                        width={470}
                        height={200}
                    />
                </div>
                <table className='student-table'>
                    <tr>
                        <th className='tr'>Name</th>
                        <th className='tr'>ID</th>
                        <th className='tr'>Score</th>
                        <th className='tr'>Grade</th>
                    </tr>
                    {studentsData.map((student) => (
                        <tr>
                            <td className='td' >{student.student_firstname} {student.student_lastname}</td>
                            <td className='td'>{student.student_id}</td>
                            <td className='td'>{student.course_student_score}</td>
                            <td className='td'>{student.course_student_grade}</td>
                        </tr>
                    ))}
                </table>
                <button className='edit-score' onClick={() => goToCourseEdit()}>
                    Edit
                </button>
            </div>
        </div>
    )
}


export default CourseTeacher