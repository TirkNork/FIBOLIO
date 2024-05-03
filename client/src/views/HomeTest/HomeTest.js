import { Link } from "react-router-dom";
function HomeTest() {
  return (
    <div>
      <h1>HomeTest</h1>
      <div>
      <button>
        <Link to="/Test1">Go to Test1</Link>
      </button>
      <button>
        <Link to="/Course">Go to Course</Link>
      </button>
      </div>
    </div>
  );
}
export default HomeTest;
