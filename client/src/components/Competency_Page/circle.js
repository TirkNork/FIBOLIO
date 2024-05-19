import "./circle.css"

function Cirlce(props) {
    return (
      <div className="circle" style={{borderColor: props.color}}>
        <p>{props.points}</p>
      </div>
    );
  }
  
  export default Cirlce;