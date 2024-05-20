import React, { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/buttons/buttons";

function TestInputField() {
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    // console.log("handleInputChange: ", values);
  };

  const buttonClick = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    console.log("button: ", values);
  };

  return (
    <Fragment>
      <label>Test Input</label>
      <input
        className="Name"
        type="text"
        name="testInput" // Add a name attribute to the input
        placeholder="Type something"
        onChange={handleInputChange}
      />
      <Button onClick={buttonClick}> Submit </Button>
    </Fragment>
  );
}

export default TestInputField;
