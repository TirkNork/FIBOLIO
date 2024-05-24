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
    </div>
  );
}
export default HomeTest;