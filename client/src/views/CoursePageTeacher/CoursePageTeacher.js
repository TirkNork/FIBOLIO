import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

function CoursePageTeacher() {
    const [data, setData] = useState([]);

//     React.useEffect(() => {
//     fetch("http://localhost:3001/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.message));   
//   }, []);
    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = () => {
        Axios.get("http://localhost:3001/api").then((response) => {
        // console.log(response.data)
        setData(response.data)
    });

    };
    const userElement = data.map(user => {
        return <h3>{user.firstname}</h3>
    })

    return (
        <div>
        <h1>Test data</h1>
        <p>Message : {userElement}</p>
        </div>
    );
}
export default CoursePageTeacher;