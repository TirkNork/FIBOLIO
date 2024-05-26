import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import CoursecardTeacher from "../../components/CoursecardTeacher/CoursecardTeacher";
import CoursedropdownTeacher from "../../components/CoursedropdownTeacher/CoursedropdownTeacher";
import Searchbar from "../../components/Searchbar/Searchbar";
import './HomePageTeacher.css';

const mockData = [
    { id: 1, courseid: "FRA502", coursename: "Special Topic III : Web Programming", academicYear: '2/2566', professorname: 'Dr. Smith', classType: "Progrmming" },
    { id: 2, courseid: "FRA442", coursename: "Game Development and Simulation", academicYear: '2/2566', professorname: 'Dr. Smith', classType: "Progrmming" },
    { id: 3, courseid: "FRA321", coursename: "Basic Image Processing and Artificial Inelligence", academicYear: '1/2566', professorname: 'Dr. Smith', classType: "Progrmming" },
    { id: 4, courseid: "FRA442", coursename: "Game Development and Simulation", academicYear: '2/2565', professorname: 'Dr. Smith', classType: "Progrmming" }
];

const academicYears = ['1/2563', '2/2563', '1/2564', '2/2564', '1/2565', '2/2565', '1/2566', '2/2566'];
const classType = ['Mechanical','Programming','Mechanical']
const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];


function HomePageTeacher() {
    const navigate = useNavigate();
    const [teacher_id, setteacher_id] = useState(['121212']);
    const [DataCourse, setDataCourse] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortType, setSortType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [courseList, setCourseList] = useState(mockData);


    const handleSortToggle = (value) => {
        const [type, order] = value.split('-');
        setSortType(type);
        setSortOrder(order);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        getDataList();
      }, []);

    const getDataList = () => {
        // const id = '1212'
        Axios.get(`http://localhost:3001/teacher/${teacher_id}`).then((response) => {
            // console.log(response.data)
            setDataCourse(response.data);
        });
      };

    const sortData = (data) => {
        return data.sort((a, b) => {
            if (sortType === 'course_year') {
                const yearComparison = academicYears.indexOf(a.academicYear) - academicYears.indexOf(b.academicYear);
                return sortOrder === 'asc' ? yearComparison : -yearComparison;
            } else if (sortType === 'course_class') {
                const classComparison = a.classType.localeCompare(b.classType);
                return sortOrder === 'asc' ? classComparison : -classComparison;
            }
            return 0;
        });
    };

    const filteredData = DataCourse.filter(course => 
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = sortData(filteredData);



  return (
    <div>
            <div className="header">
                <h1>Home Page</h1>
                <br />
                <ul className='breadcrumb'>
                    <li className='breadcrumb-list'>
                        <a className='home' href='/HomePageTeacher'>Home Page/</a>
                    </li>
                </ul>
                <CoursedropdownTeacher handleSortToggle={handleSortToggle} sortType={sortType} sortOrder={sortOrder} />
                <Searchbar searchTerm={searchTerm} handleSearch={handleSearch} />
            </div>
            <div className="other-page">
                <div className="grid-container">
                    {sortedData.map((val, key) => (
                        <CoursecardTeacher
                            key={key}
                            id={val.course_key}
                            coursekey={val.course_key}
                            courseid={val.course_id}
                            coursename={val.course_name}
                            academicYear={val.course_semester + '/' + val.course_year}
                        />
                    ))}
                </div>
            </div>
        </div>
  )
}

export default HomePageTeacher


