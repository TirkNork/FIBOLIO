import './app.css';
import { Link } from "react-router-dom";
import Grid from '../../components/Competency_Page/grid';
import CircleAndBox from '../../components/Competency_Page/CircleAndBox';
import Topbar from "../../components/Topbar/Topbar";

function App() {
  return (

    <section className="app-section">
      <Topbar></Topbar>
      <div className="app-container" >

        <h2>Competency</h2>
        <Grid rows={4}>
          <Link to="/score" className="link">
            <CircleAndBox title="Mechanical" detail="test" points="100" color="#A60202"></CircleAndBox>
          </Link>
          <CircleAndBox title="Programming" detail="test" points="100" color="#F23004"></CircleAndBox>
          <CircleAndBox title="Electrical" detail="test" points="100" color="#F27404"></CircleAndBox>
          <CircleAndBox title="Robotics" detail="test" points="100" color="#F29F04"></CircleAndBox>
        </Grid>
      </div>
    </section>
    
  );
}

export default App;