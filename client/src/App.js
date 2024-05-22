import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
// import Topbar from "./components/Topbar/Topbar.js";
import HomePageTeacher from "./components/HomePageTeacher/HomePageTeacher.js";
import TopbarComponent from "./components/Topbar/TopbarComponent.js";

import './components/css/app.css'


function App() {

  

  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <TopbarComponent />
        <Routes>
          <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          <Route path="/Test1" element={<div className="body"><Test1/></div>}></Route>
          {/* <Route path="/Topbar" element={<div className="body"><Topbar/></div>}></Route> */}
          <Route path="/HomePageTeacher" element={<div className="body"><HomePageTeacher/></div>}></Route>
          <Route path="/TopbarComponent" element={<div className="body"><TopbarComponent/></div>}></Route>
          
        </Routes>
       
      </div>      
    </BrowserRouter>
  );
}
export default App;
