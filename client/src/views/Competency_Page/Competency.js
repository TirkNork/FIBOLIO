import './app.css';
import { Link } from "react-router-dom";
import CircleAndBox from '../../components/Competency_Page/CircleAndBox';
import Topbar from "../../components/Topbar/Topbar";
import Axios from "axios";
import { useState, useEffect } from "react";


function App() {
  const [CourseStudent, setCourseStudent] = useState([]);
  const [CompetencyDescription, setCompetencyDescription] = useState([]);


  useEffect(() => {
    const getCourseStudent = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/CourseStudent");
        setCourseStudent(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching course student data:", error);
      }
    };
    getCourseStudent();
  }, []);

  useEffect(() => {
    const getCompetencyDescription = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/CompetencyDescription");
        setCompetencyDescription(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching competency description data:", error);
      }
    };
    getCompetencyDescription();
  }, []);

  const criteria = {
    "A": 100, "B+": 90, "B": 80, "C+": 70, "C": 60, "D+": 50, "D": 40, "F": 20
  };
  const credit = { "Mechanical": 0, "Programming": 0, "Robotic": 0, "Electrical": 0 };
  const score = { "Mechanical": 0, "Programming": 0, "Robotic": 0, "Electrical": 0 };

  for (let i = 0; i < CourseStudent.length; i++) {
    const courseClass = CourseStudent[i].course_class
    const courseGrade = CourseStudent[i].course_student_grade
    let courseCredit = CourseStudent[i].course_credit

    score[courseClass] += criteria[courseGrade] * courseCredit
    credit[courseClass] += courseCredit
  };
  console.log(score);
  console.log(credit);

  const result = {};
  // Define grade boundaries
  const gradeBoundaries = {
    "A": 90,
    "B": 80,
    "C": 70,
    "D": 60,
  };

  // Function to calculate grade
  function calculateGrade(score) {
    for (let grade in gradeBoundaries) {
      if (score >= gradeBoundaries[grade]) {
        return grade;
      }
    }
    return "F"; // Default grade if score is below all boundaries
  }

  const descriptions = { "Mechanical": "", "Programming": "", "Robotic": "", "Electrical": "" };
  for (let key in score) {
    if (credit[key] !== 0) {
      score[key] = (score[key] / credit[key]).toFixed(1);
      result[key] = calculateGrade(score[key])

    } else {
      score[key] = 0 // or some other value indicating division by zero
      result[key] = "F";
    }
    const matchResult = CompetencyDescription.find(item => item.course_class === key && item.grade === result[key])
    if (matchResult) {
      descriptions[key] = matchResult.description
    }
    // description[key] = CompetencyDescription.find(item => item.course_class === key && item.grade === result[key]).description;

  }

  console.log(score);
  console.log(result);
  console.log(CompetencyDescription);
  console.log(descriptions);


  return (
    <div className="subject-page">
      <Topbar></Topbar>
      <div className="header">
        <h1 className="header-text">Competency</h1>
      </div>
      <div className="app-grid">
        <Link to="/score" className="link">
          <CircleAndBox title="Mechanical" detail={descriptions["Mechanical"]} points={score["Mechanical"]} color="#A60202"></CircleAndBox>
        </Link>
        <Link to="/score" className="link">
          <CircleAndBox title="Programming" detail={descriptions["Programming"]} points={score["Programming"]} color="#F23004"></CircleAndBox>
        </Link>
        <Link to="/score" className="link"><CircleAndBox title="Electrical" detail={descriptions["Electrical"]} points={score["Electrical"]} color="#F27404"></CircleAndBox>
        </Link>
        <Link to="/score" className="link"><CircleAndBox title="Robotic" detail={descriptions["Robotic"]} points={score["Robotic"]} color="#F29F04"></CircleAndBox>
        </Link>
      </div>

    </div >

  );
}

export default App;