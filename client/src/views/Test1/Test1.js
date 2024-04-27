import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

function Test1() {
  const [testDataList, setTestDataList] = useState([]);

  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = () => {
    Axios.get("http://localhost:3001/testTable").then((response) => {
      setTestDataList(response.data);
    });
  };

  return (
    <div>
      <h1>Test1</h1>
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
      ))}
    </div>
  );
}

export default Test1;
