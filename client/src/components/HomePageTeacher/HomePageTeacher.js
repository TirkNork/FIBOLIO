import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './HomePageTeacher.css'

const mockData = [
  { id: 1, courseid: "FRA000", coursename: "webdev",  academicYear: '1/2563' },
  { id: 2, courseid: "FRA000", coursename: "webdev",  academicYear: '1/2563' },
  { id: 3, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2563' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2563' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2563' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2563' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '1/2564' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2564' },
  { id: 4, courseid: "FRA000", coursename: "webdev",  academicYear: '2/2563' },
];

const academicYears = ['1/2563', '2/2563', '1/2564', '2/2564', '1/2565', '2/2565', '1/2566', '2/2566']; 

function HomePageTeacher() {

  const navigate = useNavigate();
  const [CheckDropdown, setCheckDropdown] = useState(false);
  const [Selectyear, SetSelectyear] = useState('');

  const handleYearChange = (event) => {
    SetSelectyear(event.target.value);
  };
  
  return (
    <div class = "grid">
      <div class = 'selectSemester'>
      <select class = 'SemesterDropdown' value={Selectyear} onChange={handleYearChange}>
      <option value="">Select Semester</option>
      {academicYears.map((year, index) => (
        <option key={index} value={year} >
          {year}
        </option>
      ))}
    </select>

      </div>
      {mockData.filter(data => data.academicYear === Selectyear)
      .map((Course, index) => (
        <div class = 'courseName' key={index} CourseId={Course.courseid} CourseName = {Course.coursename} Id = {Course.id}>
          <div>
            {Course.courseid}
            {Course.coursename}
            </div>
        </div>
      ))}

      
      {/* <div class = 'courseName'>Test3</div>
      <div class = 'courseName'>Test4</div>
      <div class = 'courseName'>Test5</div>
      <div class = 'courseName'>Test6</div>
      <div class = 'courseName'>Test7</div> */}
    </div>
  )
}

export default HomePageTeacher
