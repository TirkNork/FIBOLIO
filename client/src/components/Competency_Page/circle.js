import "./circle.css"

function Cirlce(props) {
    return (
      <div className="circle" style={{borderColor: props.color}}>
        {props.points}
      </div>
    );
  }
  
  export default Cirlce;