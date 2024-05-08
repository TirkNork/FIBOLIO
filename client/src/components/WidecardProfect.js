import React from "react";

function WidecardProject(props) {

  return (
    <div className="widecard">
      <div className="wide-con">
        <div className="text-container">
          <p className="secondtext">Year : {props.year}</p>
          <p className="secondtext">Project : {props.project}</p>
          <p className="secondtext">Course : {props.course}</p>
          <p className="secondtext">Description : {props.des}</p>
        </div>
      </div>
    </div>
  );
}

export default WidecardProject;
