import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function HomeTest() {
  const subject = 'FRA100'
  const navigate = useNavigate();

  const goToCourseTeacher = (id) => {
    navigate(`/CourseTeacher/${id}`);
    // navigate("/CourseTeacher");
  };

  return (
    <div>
      <h1>HomeTest</h1>
      <button>
        <Link to="/Test1">Go to Test1</Link>
      </button>
      <button onClick = {() => goToCourseTeacher(subject)}> Go to CourseTeacher </button>
    </div>
  );
}
export default HomeTest;
