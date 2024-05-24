import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Test1() {
  const { id } = useParams(121212);
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = () => {
    Axios.get("http://localhost:3001/teacher/${id}").then((response) => {
      setTestDataList(response.data);
    });
  };

  return (
    <div>
      {/* <h1>Test1</h1>
      <button>
        <Link to="/">Go to HomeTest</Link>
      </button>
      <h2>Test Data:</h2>
      {testDataList.map((item) => (
        <div key={item.id}>
          <strong>ID:</strong> {item.id}, ;
          <strong>First Name:</strong> {item.first_name}, ;
          <strong>Last Name:</strong> {item.last_name}, ;
          <strong>Age:</strong> {item.age}
        </div>
        cs.teacher_id, cs.course_id, cs.course_year, cs.course_semester, c.course_id , c.course_name
      ))} */}
  
      <h1>Test2</h1>
      <button>
        <Link to="/">Go to HomeTest</Link>
      </button>
      <h2>Test Data:</h2>
      {testDataList.map((item) => (
        <div key={item.course_key}>
          <strong>teacher ID:</strong> {item.teacher_id}, ;
          <strong>Course name:</strong> {item.course_id}, ;
          <strong>Course year:</strong> {item.course_year}, ;
          <strong>Course semester:</strong> {item.course_semester}
        </div>
      ))}
    </div>

    
  );
}

export default Test1;
