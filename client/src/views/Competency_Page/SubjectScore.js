import { Link } from "react-router-dom";
import SubjectCard from "../../components/Competency_Page/SubjectCard"
import "./app.css"
import data from '../Competency_Page/data.json';
import Search from "../../components/Search/Search";
import Topbar from "../../components/Topbar/Topbar";

const card3 = data


function SubjectScore() {
    const cardElement = card3.map((card, index) => {
        return <SubjectCard key={index} card={card} />
    })

    return (
        <div className="subject-page">

            <Topbar></Topbar>

            <div className="header">

                <h1 className="header-text">Mechanical Courses</h1>

            </div>

            <div className="app-grid">
                {cardElement}
            </div>
        </div>

    );
}
export default SubjectScore;
