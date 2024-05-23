import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePageStudent from "./views/HomePageStudent.js"
import HomeTest from './views/HomeTest/HomeTest.js';
import Project from "./views/Project/Project.js";
import ProjectInsert from "./views/Project/ProjectInsert.js";
import ProjectDetails from "./views/Project/ProjectDetails.js";
import ProjectEdit from "./views/Project/ProjectEdit.js";
import Topbar from "./components/Topbar/Topbar.js";

import PersonalInformation from "./views/PersonalInformation.js";
import StudyBackground from "./views/StudyBackground.js";
import Skills from "./views/Skills.js";
import ProjectsExperiences from "./views/Projects&Experiences.js";


function App() {
  return (
    <BrowserRouter>
    <Topbar/>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/Test1" element={<div className="body"><Test1/></div>}></Route>  
                                        
          <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          <Route path="/HomePageStudent" element={<div className="body"><HomePageStudent/></div>}></Route>
          <Route path="/PersonalInformation" element={<div className="body"><PersonalInformation/></div>}></Route>
          <Route path="/StudyBackground" element={<div className="body"><StudyBackground/></div>}></Route>
          <Route path="/Skills" element={<div className="body"><Skills/></div>}></Route>
          <Route path="/ProjectsExperiences" element={<div className="body"><ProjectsExperiences/></div>}></Route>
                                        
          <Route path="/Project" element={<div className="body"><Project/></div>}></Route>   
          <Route path="/ProjectInsert" element={<div className="body"><ProjectInsert/></div>}></Route>
          <Route path="/Project/:id" element={<ProjectDetails/>} />  
          <Route path="/Project/Edit/:id" element={<ProjectEdit/>} />    
            
        </Routes>     
      </div>      
    </BrowserRouter>
  );
}
export default App;