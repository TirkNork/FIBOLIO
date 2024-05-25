import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePageStudent from "./views/HomePageStudent.js"
import HomeTest from './views/HomeTest/HomeTest.js';

import PersonalInformation from "./views/PersonalInformation.js";
import StudyBackground from "./views/StudyBackground.js";
import Skills from "./views/Skills.js";
import ProjectsExperiences from "./views/Projects&Experiences.js";
import Edit_PersonalInformation from "./views/Edit_PersonalInformation.js";
import Edit_StudyBackground from "./views/Edit_StudyBackground.js";
import Edit_Skills from "./views/Edit_Skills.js";
import Edit_ProjectsExperiences from "./views/Edit_ProjectsExperiences.js";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          <Route path="/HomePageStudent" element={<div className="body"><HomePageStudent/></div>}></Route>
          
          <Route path="/PersonalInformation" element={<div className="body"><PersonalInformation/></div>}></Route>
          <Route path="/StudyBackground" element={<div className="body"><StudyBackground/></div>}></Route>
          <Route path="/Skills" element={<div className="body"><Skills/></div>}></Route>
          <Route path="/ProjectsExperiences" element={<div className="body"><ProjectsExperiences/></div>}></Route>

          <Route path="/Edit_PersonalInformation" element={<div className="body"><Edit_PersonalInformation/></div>}></Route>
          <Route path="/Edit_StudyBackground" element={<div className="body"><Edit_StudyBackground/></div>}></Route>
          <Route path="/Edit_Skills" element={<div className="body"><Edit_Skills/></div>}></Route>
          <Route path="/Edit_ProjectsExperiences" element={<div className="body"><Edit_ProjectsExperiences/></div>}></Route>
        </Routes>
       
      </div>      
    </BrowserRouter>
  );
}
export default App;