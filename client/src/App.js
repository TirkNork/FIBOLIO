import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Test1 from './views/Test1/Test1.js';
import HomeTest from './views/HomeTest/HomeTest.js';
import CourseTeacher from './views/CourseTeacher/CourseTeacher.js';
import CourseEdit from './views/CourseTeacher/CourseEdit.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route path="/" element={<div className="body"><HomeTest /></div>}></Route>
          <Route path="/Test1" element={<div className="body"><Test1 /></div>}></Route>
          <Route path="/CourseTeacher" element={<div className="body"><CourseTeacher /></div>}></Route>
          <Route path="/CourseEdit" element={<div className="body"><CourseEdit /></div>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}
export default App;
