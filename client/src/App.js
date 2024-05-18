import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import './index.css';
import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
import CoursePageTeacher from "./views/CoursePageTeacher/CoursePageTeacher.js";
import React from 'react'


function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);



  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          {/* <Route path="/" element={<div className="body"><HomeTest/></div>}></Route>
          <Route path="/Test1" element={<div className="body"><Test1/></div>}></Route> */}
          <Route path="/" element={<div className="body"><CoursePageTeacher/></div>}></Route>
        </Routes>

      </div>      
    </BrowserRouter>
  );
}
export default App;
