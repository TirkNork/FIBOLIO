import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Test1 from "./views/Test1/Test1.js";
import HomeTest from "./views/HomeTest/HomeTest.js";
import RegisterTest from "./views/RegisterTest/RegisterTest.js";
import Register from "./views/RegisterTest/Register01.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Route for all pages */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="body">
                <Register />
              </div>
            }
          ></Route>
          <Route
            path="/Test1"
            element={
              <div className="body">
                <Test1 />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
