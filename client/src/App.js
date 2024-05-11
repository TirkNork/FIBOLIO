import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Competency_Page from './views/Competency_Page/Competency.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/Competency" element={<div className="body"><Competency_Page/></div>}></Route>
        </Routes>     
      </div>      
    </BrowserRouter>
  );
}
export default App;