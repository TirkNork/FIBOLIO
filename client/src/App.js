import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import './index.css';
import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
import Login from './views//Login/Login';
import Forgot from './views//Login/Forgot';
import Changepass from './views//Login/Changepass';
import Changepass_Teacher from './views//Login/Changepass_Teacher';
import Home from './views//Login/Home';
import Check from './views//Login/Check';
import Check_teacher from './views//Login/Check_teacher';
import TeacherPage from './views//Login/TeacherPage';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}

        <Routes>
          <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          <Route path="/Test1" element={<div className="body"><Test1/></div>}></Route>
          <Route path="/Login"element={<Login/>}/>
          <Route path="/Forgot"element={<Forgot/>}/>
          <Route path="/Changepass"element={<Changepass/>}/>
          <Route path="/Changepass_Teacher"element={<Changepass_Teacher/>}/>
          <Route path="/Check"element={<Check/>}/>
          <Route path="/Check_teacher"element={<Check_teacher/>}/>
          <Route path="/Home"element={<Home/>}/>
          <Route path="/TeacherPage"element={<TeacherPage/>}/>
        </Routes>

      </div>      
    </BrowserRouter>
  );
}
export default App;
