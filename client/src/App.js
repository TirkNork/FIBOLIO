import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import './index.css';
import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
import Login from './views//Login/Login';
import Forgot from './views//Login/Forgot';
import Verification from './views//Login/Verification';
import Changepass from './views//Login/Changepass';
import Home from './views//Login/Home';


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
          <Route path="/Verification"element={<Verification/>}/>
          <Route path="/Changepass"element={<Changepass/>}/>
          <Route path="/Home"element={<Home/>}/>
        </Routes>

      </div>      
    </BrowserRouter>
  );
}
export default App;
