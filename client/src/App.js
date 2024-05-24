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
import { BiHomeAlt } from "react-icons/bi";
import Login from "./views//Login/Login";
import Forgot from "./views//Login/Forgot";
import Changepass from "./views//Login/Changepass";
import Changepass_Teacher from "./views//Login/Changepass_Teacher";
import Home from "./views//Login/Home";
import Check from "./views//Login/Check";
import Check_teacher from "./views//Login/Check_teacher";
import TeacherPage from "./views//Login/TeacherPage";
import RegisterTest from "./views/RegisterTest/RegisterTest.js";
import Register from "./views/RegisterTest/Register01.jsx";


function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <div className="App">
        {/* Route for all pages */}

        <Routes>
          <Route path="/" element={<div className="body"><Login /></div>}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Changepass" element={<Changepass />} />
          <Route path="/Changepass_Teacher" element={<Changepass_Teacher />} />
          <Route path="/Check" element={<Check />} />
          <Route path="/Check_teacher" element={<Check_teacher />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/TeacherPage" element={<TeacherPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/HomeTest" element={<div className="body"><HomeTest/></div>}></Route>
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