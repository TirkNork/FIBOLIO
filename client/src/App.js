import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Competency_Page from './views/Competency_Page/Competency.js';
import SubjectScore from './views/Competency_Page/SubjectScore.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/Competency" element={<div className="body"><Competency_Page /></div>}></Route>
          <Route path="/score" element={<div className="body"><SubjectScore /></div>}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;