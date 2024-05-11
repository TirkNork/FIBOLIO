import "./SubjectCard.css";
import { Link } from "react-router-dom";

function SubjectCard(props) {
    const { card } = props;

    return (

        <div className="block">
            <Link to="/" className="link">
                <h2>{card.subject}</h2>
                <p>{card.description}</p>
                <p>{card.grade}</p>
                <p>{card.teacher}</p>
            </Link>
        </div>
    );
}


export default SubjectCard;