import "./circle.css"

function Circle(props) {
  return (
    <div className="circle" style={{ borderColor: props.color }}>
      <p>{props.points}</p>
    </div>
  );
}

export default Circle;