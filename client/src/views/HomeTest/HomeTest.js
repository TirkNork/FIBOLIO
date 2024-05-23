import { Link } from "react-router-dom";
function HomeTest() {
  return (
    <div>
      <h1>HomeTest</h1>
      <button>
          <Link to="/HomePageStudent">Home Page Student</Link>
      </button>
    </div>
  );
}
export default HomeTest;
