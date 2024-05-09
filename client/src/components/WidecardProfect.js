import React from "react";


function WidecardProject(props) {


  return (
    <div className="widecard">
          <p className="secondtext">Year : {props.year}</p>
          <p className="secondtext">Project : {props.project}</p>
          <p className="secondtext">Course : {props.course}</p>
          <p className="secondtext">Description : {props.des}</p>
        
      </div>
  );
}

export default WidecardProject;
