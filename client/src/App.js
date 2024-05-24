import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Competency_Page from './views/Competency_Page/Competency.js';
// import SubjectScore from './views/Competency_Page/SubjectScore.js';
// import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
import CourseTeacher from './views/CourseTeacher/CourseTeacher.js';
import CourseEdit from './views/CourseTeacher/CourseEdit.js';
import Project from "./views/Project/Project.js";
import ProjectInsert from "./views/Project/ProjectInsert.js";
import ProjectDetails from "./views/Project/ProjectDetails.js";
import ProjectEdit from "./views/Project/ProjectEdit.js";
import Topbar from "./components/Topbar/Topbar.js";

function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          {/* <Route path="/Test1" element={<div className="body"><Test1/></div>}></Route>   */}
          <Route path="/Project" element={<div className="body"><Project/></div>}></Route>   
          <Route path="/ProjectInsert" element={<div className="body"><ProjectInsert/></div>}></Route>
          <Route path="/Project/:id" element={<ProjectDetails/>} />  
          <Route path="/Project/Edit/:id" element={<ProjectEdit/>} />     
          <Route path="/Competency" element={<div className="body"><Competency_Page /></div>}></Route>
          <Route path="/CourseTeacher/:id" element={<div className="body"><CourseTeacher /></div>}></Route>
          <Route path="/CourseEdit/:id" element={<div className="body"><CourseEdit /></div>}></Route>
          {/* <Route path="/score" element={<div className="body"><SubjectScore /></div>}></Route> */}
        </Routes>     
      </div>      
    </BrowserRouter>
  );
}
export default App;