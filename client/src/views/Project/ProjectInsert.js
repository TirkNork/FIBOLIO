import React, { useState } from "react";
import { Link } from "react-router-dom";
import WidecardProject from "../../components/WidecardProfect";
import "./Project.css";

function ProjectInsert() {
  // สร้าง state เพื่อเก็บค่าของแต่ละช่อง input
  const [year, setYear] = useState("");
  const [project, setProject] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // สร้างฟังก์ชันเพื่ออัปเดตค่า state เมื่อมีการเปลี่ยนแปลงใน input แต่ละช่อง
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
        <h3>Year</h3>
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter year of project"/>

        <h3>Project</h3>
        <input
          type="text"
          value={project}
          onChange={handleProjectChange}
          placeholder="Enter project name"/>

        <h3>Subject</h3>
        <input
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter subject"/>

        <h3>Description</h3>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter project description"/>
    </div>
  );
}

export default ProjectInsert;
