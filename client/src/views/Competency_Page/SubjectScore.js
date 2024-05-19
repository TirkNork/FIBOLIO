import { Link } from "react-router-dom";
import SubjectCard from "../../components/Competency_Page/SubjectCard"
import "./app.css"
import data from '../Competency_Page/data.json';
import Search from "../../components/Search/Search";
import Topbar from "../../components/Topbar/Topbar";

const card3 = data
const card1 = {
    subject: "FRA123:Introduction to Machine learning",
    description: "Short description : Lorem ipsum dolor sit amet, conincididunt ut labore et dolore magna aliqua.",
    grade: "Grade : A",
    teacher: "Teacher : Aj. Bank"
};

const realCard = [card1, card1, card1, card1, card1, card1, card1, card1, card1, card1]

function SubjectScore() {
    const cardElement = card3.map((card, index) => {
        return <SubjectCard key={index} card={card} />
    })

    return (
        <div className="subject-page">

            <Topbar></Topbar>
            <Search></Search>
            <div className="mid-bar">
                <h1 className="header-text">Mechanical Courses</h1>
            </div>

            <div className="app-grid">
                {cardElement}
            </div>
        </div>

    );
}
export default SubjectScore;
