import { Link } from "react-router-dom";
import SubjectCard from "../../components/Competency_Page/SubjectCard"
import "./app.css"

const card1 = {
    subject: "FRA123:Introduction to Machine learning",
    description: "Short description : Lorem ipsum dolor sit amet, conincididunt ut labore et dolore magna aliqua.",
    grade: "Grade : A",
    teacher: "Teacher : Aj. Bank"
};

const realCard = [card1, card1, card1, card1, card1, card1, card1, card1, card1, card1]

function SubjectScore() {
    const cardElement = realCard.map((card, index) => {
        return <SubjectCard key={index} card={card} />
    })

    return (
        <div className="subject-page">

            <div className="top-bar"></div>

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
