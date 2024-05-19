import './app.css';
import { Link } from "react-router-dom";
import Grid from '../../components/Competency_Page/grid';
import CircleAndBox from '../../components/Competency_Page/CircleAndBox';
import Topbar from "../../components/Topbar/Topbar";

function App() {
  return (
<div className="subject-page">
    <section className="app-section">
      <Topbar></Topbar>
      
      <div className="mid-bar">
                <h1 className="header-text">Competency</h1>
            </div>
          <Grid className="app-container" rows={4}>
          <Link to="/score" className="link">
            <CircleAndBox title="Mechanical" detail="test" points="100" color="#A60202"></CircleAndBox>
          </Link>
          <CircleAndBox title="Programming" detail="test" points="100" color="#F23004"></CircleAndBox>
          <CircleAndBox title="Electrical" detail="test" points="100" color="#F27404"></CircleAndBox>
          <CircleAndBox title="Robotics" detail="test" points="100" color="#F29F04"></CircleAndBox>
        </Grid>
        
    </section>
    </div>
    
  );
}

export default App;