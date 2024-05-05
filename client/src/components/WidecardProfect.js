import React from "react";

function WidecardProject(props) {
  return (
    <div className="widecard">
      <div className="wide-con">
        <h3>Year : {props.year}</h3>
        <h4 className="secondtext">Project : {props.project}</h4>
        <h4 className="secondtext">Course : {props.course}</h4>
        <h4 className="secondtext">Description : {props.des}</h4>
      </div>
    </div>
  );
}

export default WidecardProject;