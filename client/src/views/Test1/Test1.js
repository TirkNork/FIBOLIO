import { Link } from "react-router-dom";

function Test1(){
  return(
    <div>
      <h1>Test1</h1>
      <button>
        <Link to="/">Go to HomeTest</Link>
      </button>
    </div>
  );
}
export default Test1;