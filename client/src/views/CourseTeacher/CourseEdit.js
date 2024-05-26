import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";
import Search from "../../components/Search/Search.js";
import './CourseEdit.css';

// const serverIP = 'http://localhost:3001'
const serverIP = 'http://34.142.188.255:3001'
function CourseEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [studentsData, setStudentsData] = useState([]);
    const [new_score, setNew_score] = useState([]);
    const [score, setScore] = useState({ Score: '' });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [courseName, setCourseName] = useState({ course_id: "", course_name: "" });



    const handleScoreChange = (event, index) => {
        const { name, value } = event.target;
        console.log('current index : ' + index);
        console.log('current value : ' + parseInt(value));
        // console.log('student score changed : ' + new_score[index].student_id);

        // setNew_score({...newscore, score : event.target.value});
        setNew_score((prevScore) => {
            const studentID_score_changed = new_score[index].student_id
            // const index_changed = prevScore.findIndex(new_score => new_score.course_student_score !== studentId);
            return prevScore.map((newscore) => {
                if (newscore.student_id !== studentID_score_changed) return newscore;
                return { ...newscore, course_student_score: parseInt(value) };
            })
        });

        // console.log('score update : ',new_score);

    };

    const calculateNewGrade = (scores) => {
        return scores.map((newscore) => {
            if (newscore.course_student_score >= 85 && newscore.course_student_score <= 100)
                return { ...newscore, course_student_grade: 'A' };
            else if (newscore.course_student_score >= 80 && newscore.course_student_score <= 84)
                return { ...newscore, course_student_grade: 'B+' };
            else if (newscore.course_student_score >= 75 && newscore.course_student_score <= 79)
                return { ...newscore, course_student_grade: 'B' };
            else if (newscore.course_student_score >= 70 && newscore.course_student_score <= 74)
                return { ...newscore, course_student_grade: 'C+' };
            else if (newscore.course_student_score >= 65 && newscore.course_student_score <= 69)
                return { ...newscore, course_student_grade: 'C' };
            else if (newscore.course_student_score >= 60 && newscore.course_student_score <= 64)
                return { ...newscore, course_student_grade: 'D+' };
            else if (newscore.course_student_score >= 55 && newscore.course_student_score <= 59)
                return { ...newscore, course_student_grade: 'D' };
            else if (newscore.course_student_score >= 0 && newscore.course_student_score <= 54)
                return { ...newscore, course_student_grade: 'F' };

            return { ...newscore, course_student_grade: 'No Grade' };
        });
    };


    useEffect(() => {
        getStudentsData();
        getCourseName();

    }, [id]);

    useEffect(() => {
        console.log('Score changed ', new_score);
    }, [new_score]);

    const getCourseName = () => {
        Axios.get(`${serverIP}/coursename/${id}`).then((response) => {

            setCourseName(response.data[0])
        });
        // console.log('ffff' + courseName.course_id);
    };

    const getStudentsData = () => {
        Axios.get(`${serverIP}/students/${id}`).then((response) => {
            // console.log(response.data)
            setStudentsData(response.data);
            setNew_score(response.data);
        });
    };


    const updateStudentsScore = async () => {
        try {
            // Calculate the new grades by awaiting the promise
            const updatedScores = await calculateNewGrade(new_score);
            console.log('New scores before sending:', updatedScores);

            // Now, updatedScores contains the actual updated scores
            const response = await Axios.post(`${serverIP}/updateScore/${id}`, updatedScores);
            console.log('Response:', response.data);
            navigate(`/CourseTeacher/${id}`);
        } catch (error) {
            console.error("There was an error updating the project!", error);
        }
    };



    // const handleScoreChange = (event) => {
    //     setScore({ ...score, Score: event.target.value });
    // };

    // const updateScore = () => {
    //     navigate("/CourseTeacher");
    // }

    const backClick = () => {
        navigate(`/CourseTeacher/${id}`);
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

    return (
        <div>
            <div className="header">
                <h1>{courseName.course_id}</h1>
                <h1 className='course-name'>{courseName.course_name}</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/'>My class</a>
                    </li>
                    <li className='breadcrumb-list'>
                        <p className='current-page'> <b>{courseName.course_id}</b> </p>
                    </li>
                </ul>
                <select className="sortby" onClick={(event) => handleSort(event.target.value)}>
                    <option value="">Sort By</option>
                    <option value="studentNameAZ">Student Name A-Z</option>
                    <option value="studentNameZA">Student Name Z-A</option>
                    <option value="idDescending">Student ID Descending</option>
                    <option value="idAscending">Student ID Ascending</option>
                </select>
                <Search searchTerm={searchTerm} handleSearch={handleSearch} />
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
                        project.student_firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.student_surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.student_id.toString().includes(searchTerm)
                    ).map((student, index) => (
                        <tr>
                            <td className='td' >{student.student_firstname} {student.student_surname}</td>
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