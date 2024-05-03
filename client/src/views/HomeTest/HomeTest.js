import { Link } from "react-router-dom";
function HomeTest() {
  return (
    <div>
      <h1>HomeTest</h1>
      <button>
        <Link to="/Test1">Go to Test1</Link>
      </button>
      <button>
        <Link to="/Project">Project</Link>
      </button>
    </div>
  );
}
export default HomeTest;
