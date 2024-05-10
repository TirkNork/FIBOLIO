import React from "react";


function WidecardProject(props) {


  return (
    <div className="widecard">
          <p className="secondtext"><b>Year : </b>{props.year}</p>
          <p className="secondtext"><b>Project : </b>{props.project}</p>
          <p className="secondtext"><b>Course : </b>{props.course}</p>
          <p className="secondtext"><b>Description : </b>{props.des}</p>
        
      </div>
  );
}

export default WidecardProject;
