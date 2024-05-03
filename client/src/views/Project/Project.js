import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WidecardProject from "../../components/WidecardProfect";
import "./Project.css";
import ProjectInsert from "./ProjectInsert";

function Project() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ProjectInsert");
  };

  return (
    <div className="other-page">
      <div className="header">
        <h1>Project</h1>
      </div>
      <div className="data-table">
        <div className="row">
          <WidecardProject
            year="2020"
            project="NUDA"
            subject="FRA000"
            des="An adjustable automatic massage pillow that is portable and works with all body types."
          />
          <WidecardProject
            year="2020"
            project="NUDA"
            subject="FRA000"
            des="An adjustable automatic massage pillow that is portable and works with all body types."
          />
          <WidecardProject
            year="2020"
            project="NUDA"
            subject="FRA000"
            des="An adjustable automatic massage pillow that is portable and works with all body types."
          />
          <WidecardProject
            year="2020"
            project="NUDA"
            subject="FRA000"
            des="An adjustable automatic massage pillow that is portable and works with all body types."
          />
          <WidecardProject
            year="2020"
            project="NUDA"
            subject="FRA000"
            des="An adjustable automatic massage pillow that is portable and works with all body types."
          />
        </div>
        
      </div>
      <button className="button" onClick={handleClick}>Insert</button>
    </div>
  );
}

export default Project;
