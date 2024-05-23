import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import HomePageStudent from "./views/HomePageStudent.js"
import HomeTest from './views/HomeTest/HomeTest.js';

import PersonalInformation from "./views/PersonalInformation.js";
import StudyBackground from "./views/StudyBackground.js";
import Skills from "./views/Skills.js";
import ProjectsExperiences from "./views/Projects&Experiences.js";


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
        </Routes>
       
      </div>      
    </BrowserRouter>
  );
}
export default App;
